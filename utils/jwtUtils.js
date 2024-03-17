const JWT = require("jsonwebtoken");

const secret = "WeAreInTheSkyFall";

const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
};

const validateToken = (token) => {
  try {
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid JWT Token");
  }
};

module.exports = {
  createTokenForUser,
  validateToken,
};
