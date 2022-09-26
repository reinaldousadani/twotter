const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String, required: true },
    tweet: { type: String },
  },
  {
    timestamps: true,
  }
);

const TweetModel = mongoose.model("Tweet", tweetSchema);

module.exports = TweetModel;
