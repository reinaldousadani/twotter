const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this;

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_FACTOR));

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (password = "") {
  let user = this;

  return bcrypt.compare(password, user.password).catch((err) => false);
};

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel
