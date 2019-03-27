const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

module.exports = {
	consumer_key: process.env.TWITTER_API_KEY,  
	consumer_secret: process.env.TWITTER_API_SECRET_KEY,
	access_token: process.env.TWITTER_ACCESS_TOKEN,  
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}