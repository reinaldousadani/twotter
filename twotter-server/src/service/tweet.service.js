const TweetModel = require("../models/tweet.model");

async function getTweets() {
  return TweetModel.find();
}

async function createTweet(input) {
  return TweetModel.create(input);
}

async function updateTweet(query, update, options) {
  return TweetModel.findOneAndUpdate(query, update, options);
}

async function findTweet(tweetId = "") {
  return TweetModel.findOne({ _id: tweetId });
}

async function deleteTweet(tweetId = "") {
  return TweetModel.deleteOne({ _id: tweetId });
}

module.exports = {
  getTweets,
  createTweet,
  updateTweet,
  findTweet,
  deleteTweet,
};
