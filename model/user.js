const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: Number, required: true },
  specialRequest: { type: String },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "1234");
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    specialRequest: Joi.string(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

exports.validateUser = validateUser;
exports.User = User;
exports.validate = validateUser;
