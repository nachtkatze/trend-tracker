$(function() {
	console.log("Ready!");

	function AppViewModel() {
		var self = this; 
		self.recent_tweets = ko.observable();

		var loadTweets = function() {
			console.log(temp_tweets)
			tweets.push.apply(tweets, temp_tweets)

			self.recent_tweets(tweets);
		}
		loadTweets()
		console.log("tweets", self.recent_tweets())
		console.log(self.recent_tweets().length)

		var hashtags = [{text: "Hola", weigth:10}, {text: "Adios", weigth:8}, {text: "chato", weigth:5}, {text: "oly", weigth:1}]

		$("#hashtag-cloud").jQCloud(hashtags, {delayedMode: true});
	}
	ko.applyBindings(new AppViewModel());
});