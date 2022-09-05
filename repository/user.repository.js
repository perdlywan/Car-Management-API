const db = require("../models/index.js");
const User = db.user;

exports.save = async (payload) => {
  const user = await User.create(payload);

  return user;
};

exports.findByEmail = async (email) => {
  const userByEmail = await User.findOne({ where: { email: email } });

  return userByEmail;
};

exports.findById = async (id) => {
  return await User.findByPk(id);
};
