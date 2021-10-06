var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var lastId = 0,
	lastRetweetedId = 0;
var lastTweetDate = new Date("2019-03-20"),
	lastRetweetedDate = new Date("2019-03-20");

var containsEmail = function (status) { 
	return /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(status.text);
};

var retweet = function() {

	console.log("\n\n=====================");
	console.log("=====================");
	console.log("running... retweet()");
	console.log("=====================");
	console.log("=====================");

	var params = {
		q: '(envoi OR envoie OR envoies OR envois OR envoit OR envoiez OR envoy OR envoyer OR envoyez OR envoyé OR envoyés OR cherche OR cherches OR cherché OR cherchés OR chercher OR cherchez OR cherchai OR cherchais OR cherchait OR cherchaient OR beatmaker OR beatmakers OR send) AND (beat OR beats OR prod OR prods OR typebeat OR typebeats) AND @',  // REQUIRED
		count: 50,
		result_type: 'recent'
	};
	
	// Initiate your search using the above paramaters
	Twitter.get('search/tweets', params, function(err, data, response) {


		//if (process.env.ENVIRONMENT === "dev") {
			console.log("\n\n\n=====================");
			console.log("GET search/tweets");
			console.log({params: params, response: response});
			console.log("=====================");
			console.log(new Date() + "\n");
			console.log("lastId:", lastId);
			console.log("lastRetweetedId:", lastRetweetedId);
			console.log("lastTweetDate:", lastTweetDate);
			console.log("lastRetweetedDate:", lastRetweetedDate);
			console.log("=====================");
		//}

		// If there is no error, proceed
		if (!err){

			var statuses = data.statuses;

			// Loop through the returned tweets
			for (let i = statuses.length - 1; i >= 0 ; i--) {

				// Get the tweet Id from the returned data
				let id = { id: statuses[i].id_str }
				let date = new Date(statuses[i].created_at);

				if (containsEmail(statuses[i]) && date > lastTweetDate) {

					lastId = statuses[i].id_str;
					lastTweetDate = new Date(statuses[i].created_at);

					if (date > lastRetweetedDate) {

						// Try to Favorite the selected Tweet
						Twitter.post('statuses/retweet', id, function(err, response) {
							console.log("POST statuses/retweet");
							console.log({params: {id: id}, response: response});
							if (!err) {
								let username = response.user.screen_name;
								let tweetId = response.id_str;

								if (process.env.ENVIRONMENT === "dev") {
									console.log('Retweeted:', "https://twitter.com/" + username + "/status/" + tweetId);
								}
							} else {
								if (process.env.ENVIRONMENT === "dev") {
									if (!err.code === 327) { // already retweeted
										console.log("[" + err.code + "]", err);
									} else {
										console.log("[" + err.code + "] Already retweeted: https://twitter.com/" + statuses[i].user.screen_name + "/status/" + statuses[i].id_str);
									}
								}
							}
							lastRetweetedId = lastId;
							lastRetweetedDate = lastTweetDate;
						});
					}
				} else {
					//console.log("email not found");
				}
			}
		} else {
			console.log(err);
		}
		console.log("=====================");
		console.log("=====================");
	});
}

retweet();
setInterval(retweet, process.env.OPT_RETWEET_INTERVAL * 60 * 1000);