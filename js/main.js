$(function() {
    console.log("Ready!");

    function AppViewModel() {
        var self = this;
        self.recent_tweets = ko.observableArray();
        self.order = ko.observable("retweet_count");
        self.sentiment_tweets = ko.observable({pos: 0, neu: 0, neg: 0})

        //var sentiment_tweets = {pos: 0, neu: 0, neg: 0};

        self.classifyTweet = function(polarity){ 
        	if(polarity==4){return 'bg-success'};
        	if(polarity==2){return ''};
        	if(polarity==0){return 'bg-danger'} ;
        } 

        self.loadTweets = function() {
            self.recent_tweets(tweets);
            console.log('ORDER:',self.order())

            self.recent_tweets.sort( function(left, right) {
                return left[self.order()] == right[self.order()] ? 0 : (left[self.order()] < right[self.order()] ? 1 : -1);
            });
            return true;
        }

        var count_sentiment = function() {
            for (tweet in self.recent_tweets()) {
                var pol =self.recent_tweets()[tweet]['polarity']
                switch (pol) {
                    case 4:
                        self.sentiment_tweets()['pos'] += 1;
                        break;
                    case 2:
                        self.sentiment_tweets()['neu'] += 1;
                        break;
                    case 0:
                        self.sentiment_tweets()['neg'] += 1;
                }
            }
        }

        self.loadTweets()
        console.log("tweets", self.recent_tweets())
        console.log('Number of tweets:', self.recent_tweets().length)

        var hashtagsJS = jQuery.parseJSON(hashtags);
        $("#hashtag-cloud").jQCloud(hashtagsJS);

        
        count_sentiment()
        console.log(self.sentiment_tweets())
        console.log(self.sentiment_tweets()['pos'])
        var data = [
            {
                value: self.sentiment_tweets()['neg'],
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Negative"
            },
            {
                value: self.sentiment_tweets()['pos'],
                color: "#7EDD1E",
                highlight: "#5AD3D1",
                label: "Positive"
            },
            {
                value: self.sentiment_tweets()['neu'],
                color: "#8AAAC7",
                highlight: "#2162A6",
                label: "Neutral"
            }
        ]
        var ctx = $("#myChart").get(0).getContext("2d");
        var myPieChart = new Chart(ctx).Pie(data);
        legend($("#legend"), data);
    }
    ko.applyBindings(new AppViewModel());
});