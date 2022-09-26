require("dotenv/config");
const cookieParser = require("cookie-parser");
const express = require("express");
const deserializeUser = require("./middlewares/deserializeUser");
const routes = require("./routes");
const connect = require("./utils/connect");
const cors = require('cors')

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(deserializeUser);

const PORT = process.env.PORT || 1337;

app.listen(PORT, async () => {
  await connect();
  console.log("App running on port: ", PORT);
  routes(app);
});
