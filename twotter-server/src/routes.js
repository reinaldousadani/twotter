const { createSessionHandler } = require("./controllers/session.controller");
const {
  createTweetHandler,
  getTweetsHandler,
  updateTweetHandler,
  deleteTweetHandler,
} = require("./controllers/tweet.controller");
const {
  createUserHandler,
  getCurrentUser,
} = require("./controllers/user.controller");
const requireUser = require("./middlewares/requireUser");
const validate = require("./middlewares/validateResource");
const sessionSchema = require("./schemas/session.schema");
const tweetSchema = require("./schemas/tweet.schema");
const userSchema = require("./schemas/user.schema");

function routes(app) {
  app.get("/ping", (req, res) => {
    return res.status(200).send("pong");
  });
  app.get("/me", requireUser, getCurrentUser);

  app.post("/api/users", validate(userSchema), createUserHandler);
  app.post("/api/sessions", validate(sessionSchema), createSessionHandler);
  app.post(
    "/api/tweets",
    [requireUser, validate(tweetSchema)],
    createTweetHandler
  );
  app.get("/api/tweets", getTweetsHandler);
  app.put(
    "/api/tweets/:tweetId",
    [requireUser, validate(tweetSchema)],
    updateTweetHandler
  );
  app.delete("/api/tweets/:tweetId", requireUser, deleteTweetHandler);
}

module.exports = routes;
