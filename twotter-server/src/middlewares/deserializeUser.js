//TODO:
//Kita akan decode informasi dari user melalui access/refresh token di file ini.
const { get } = require("lodash");
const { reIssueAccessToken } = require("../service/session.service");
const { verifyJwt } = require("../utils/jwt.utlis");

async function deserializeUser(req, res, next) {
  //TODO:
  //1. Ambil data Access Token
  //2. Ambil data Refresh Token
  //3. Kalau access token null, next()
  //4. Kalau access token decoded, tempel informasi ke res.locals.user, next()
  //5. Kalau access token expired dan refresh token expired, next
  //6. Kalau access token expired tapi refresh token decoded, panggil service reIssueAccessToken
  //7. Setelah new access token di generate, set header x-access-token dengan nilai newAccessToken
  //8. Decode newAccessToken
  //9. Tempel informasi ke res.locals.user

  const accessToken = get(req, "cookies.access-token");

  const refreshToken = get(req, "cookies.refresh-token");

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    console.log("Access Token expired, generating new access token...");

    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (!newAccessToken) return next();
    console.log("Setting new accessToken");
    if (newAccessToken) {
      res.cookie("access-token", newAccessToken, {
        maxAge: 3.154e10, //setahun tapi expire 15 menit
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
        overwriite: true,
      });
    }

    const result = verifyJwt(newAccessToken);

    res.locals.user = result.decoded;

    return next();
  }

  return next();
}

module.exports = deserializeUser;
