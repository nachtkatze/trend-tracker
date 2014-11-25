$(function() {
    console.log("Ready!");

    function AppViewModel() {
        var self = this;
        self.recent_tweets = ko.observable();

        var loadTweets = function() {
            tweets.push.apply(tweets, temp_tweets)

            self.recent_tweets(tweets);
        }

        // var proccessHashtags = function() {
        // 	console.log('Proccessing with a total of', totalCount, 'hashtags');
        // }


        loadTweets()
        console.log("tweets", self.recent_tweets())
        console.log('Number of tweets:', self.recent_tweets().length)

        var hashtagsJS = jQuery.parseJSON(hashtags);
        $("#hashtag-cloud").jQCloud(hashtagsJS);
    }
    ko.applyBindings(new AppViewModel());
});