const { createSession } = require("../service/session.service");
const { validateUserPassword } = require("../service/user.service");
const { signJwt, verifyJwt } = require("../utils/jwt.utlis");

async function createSessionHandler(req, res) {
  //TODO
  //1. Validate User's password and hashed password
  //2. Create a session
  //3. Generate Access and Refresh token containing information about user and session
  //4. Return access and refresh token as a response

  const { username, password } = req.body;

  const user = await validateUserPassword(username, password);

  if (!user) return res.status(401).send("Invalid username or password");

  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: process.env.REFRESH_TOKEN_TTL }
  );

  res.cookie("access-token", accessToken,{
    maxAge: 3.154e10, //setahun tapi expire 15m
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
    overwrite: true,
  })

  res.cookie("refresh-token", refreshToken, {
    maxAge: 3.154e10, //setahun
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
    overwrite: true
  });

  return res.sendStatus(200);
}

module.exports = {
  createSessionHandler,
};
