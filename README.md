# @BalanceTaProd bot

## Project structure

The environment project tree will look something like this:

```text
bot/
├─ node_modules/
├─ .env
├─ .gitignore
├─ bot.js
├─ config.js
├─ README.md
├─ package-lock.json
└─ package.json
```

## Node dependencies

Before configuring the bot we'll need to install the dependencies, from the terminal enter:

```shell
npm install
```

This will install all the dependencies listed in the `package.json` file.

Here is the `dependencies` list in the `package,json` file:

```json
  "dependencies": {
    "dotenv": "^7.0.0",
    "twit": "^2.2.11"
  }
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
  # twitter
  TWITTER_API_KEY="<TWITTER_API_KEY>"
  TWITTER_API_SECRET_KEY="<TWITTER_API_SECRET_KEY>"
  TWITTER_ACCESS_TOKEN="<TWITTER_ACCESS_TOKEN>"
  TWITTER_ACCESS_TOKEN_SECRET="<TWITTER_ACCESS_TOKEN_SECRET>"

  # options
  OPT_RETWEET_INTERVAL=1
```

The `OPT_RETWEET_INTERVAL` value is the interval (in minutes) between queries.
