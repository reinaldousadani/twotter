const yup = require("yup");

const tweetSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  tweet: yup
    .string()
    .max(140, "Maximum length is 140")
    .required("Tweet is required."),
});

module.exports = tweetSchema;
