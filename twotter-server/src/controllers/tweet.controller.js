const {
  getTweets,
  createTweet,
  findTweet,
  updateTweet,
  deleteTweet,
} = require("../service/tweet.service");

async function getTweetsHandler(req, res) {
  const result = await getTweets();
  return res.send(result);
}

async function createTweetHandler(req, res) {
  const userId = res.locals.user._id;

  const body = req.body;

  const tweet = await createTweet({ ...body, user: userId });

  return res.send(tweet);
}

async function updateTweetHandler(req, res) {
  const userId = res.locals.user._id;

  const tweetId = req.params.tweetId;

  const update = req.body;

  const tweet = await findTweet(tweetId);

  if (!tweet) {
    return res.sendStatus(404);
  }

  if (String(tweet.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedTweet = await updateTweet({ _id: tweetId }, update, {
    new: true,
  });

  return res.send(updatedTweet);
}

async function deleteTweetHandler(req, res) {
  const userId = res.locals.user._id;
  const tweetId = req.params.tweetId;

  const tweet = await findTweet(tweetId);

  if (!tweet) {
    return res.sendStatus(404);
  }

  if (userId !== String(tweet.user)) {
    return res.sendStatus(403);
  }

  const deletedTweet = await deleteTweet(tweetId);

  return res.send(deletedTweet);
}

module.exports = {
  createTweetHandler,
  getTweetsHandler,
  updateTweetHandler,
  deleteTweetHandler,
};
