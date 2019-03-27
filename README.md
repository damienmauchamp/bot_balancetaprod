# @BalanceTaProd bot

## Installation
```shell
npm install
```

### Configuring the bot
**Make a `.env` file:** make a file named `.env` do it with the terminal with the following command:

```shell
touch .env
```
This should be at the root of your project directory.

Now you'll need to add your Twitter keys to the `.env` file. Just input the keys in their corresponding fields and save the file.

The file structure should look as follows:
```
  ## twitter
  TWITTER_API_KEY="<TWITTER_API_KEY>"
  TWITTER_API_SECRET_KEY="<TWITTER_API_SECRET_KEY>"
  TWITTER_ACCESS_TOKEN="<TWITTER_ACCESS_TOKEN>"
  TWITTER_ACCESS_TOKEN_SECRET="<TWITTER_ACCESS_TOKEN_SECRET>"

  ## options
  # intervalle entre les retweets en minutes
  OPT_RETWEET_INTERVAL=1
```
