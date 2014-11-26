$(function() {
    console.log("Ready!");

    function AppViewModel() {
        var self = this;
        self.recent_tweets = ko.observableArray();
        self.order = ko.observable("retweet_count");

        self.classifyTweet = function(polarity){ 
        	if(polarity==4){return 'bg-success'}; 
        	if(polarity==2){return ''}; 
        	if(polarity==0){return 'bg-danger'} 
        } 

        self.loadTweets = function() {
            self.recent_tweets(tweets);
            console.log('ORDER:',self.order())

            self.recent_tweets.sort( function(left, right) {
                return left[self.order()] == right[self.order()] ? 0 : (left[self.order()] < right[self.order()] ? 1 : -1);
            });
            return true;
        }

        self.loadTweets()
        console.log("tweets", self.recent_tweets())
        console.log('Number of tweets:', self.recent_tweets().length)

        var hashtagsJS = jQuery.parseJSON(hashtags);
        $("#hashtag-cloud").jQCloud(hashtagsJS);
    }
    ko.applyBindings(new AppViewModel());
});