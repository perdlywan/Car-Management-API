const userRepository = require("../repository/user.repository.js");
const roleRepository = require("../repository/role.repository.js");
const bcrypt = require("bcrypt");
const jwtUtil = require("../util/jwt.util.js");

exports.createUser = async (payload) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(payload.fields.password, salt);

  const user = {
    email: payload.fields.email,
    password: encryptedPassword,
  };

  if (payload.fields.role == "superadmin") {
    user.id_role = 2;

    return await userRepository.save(user);
  }

  if (payload.fields.role == "member") {
    user.id_role = 3;

    return await userRepository.save(user);
  }
};

exports.loginUser = async (payload) => {
  const user = await userRepository.findByEmail(payload.fields.email);

  if (user != null) {
    const roleById = await roleRepository.findById(user.id_role);
    const checkPassword = await bcrypt.compare(
      payload.fields.password,
      user.password
    );

    user.role = roleById;

    if (checkPassword) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

exports.currentUser = async (request) => {
  const token = request.headers.authorization.substring(
    7,
    request.headers.authorization.length
  );
  const decodedToken = await jwtUtil.decodeToken(token);
  const user = await userRepository.findById(decodedToken.id);

  return user;
};
