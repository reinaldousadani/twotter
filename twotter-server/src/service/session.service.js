const { get } = require("lodash");
const SessionModel = require("../models/session.model");
const { verifyJwt, signJwt } = require("../utils/jwt.utlis");
const { findUser } = require("./user.service");

async function createSession(userId = "", userAgent = "") {
  return SessionModel.create({
    user: userId,
    userAgent: userAgent,
  });
}

async function reIssueAccessToken(refreshToken = "") {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: process.env.ACCESS_TOKEN_TTL,
    }
  );
  console.log("Reissued accesstoken: ", accessToken);
  return accessToken;
}

module.exports = {
  createSession,
  reIssueAccessToken,
};
