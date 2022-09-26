const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI_LOCAL);
    console.log("DB Connected");
  } catch (error) {
    console.error("Can't connect to DB");
    console.log("DB URI: ", process.env.DB_URI_LOCAL);
    process.exit(1);
  }
}

module.exports = connect;
