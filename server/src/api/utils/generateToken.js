import jwt from "jsonwebtoken";

const generateToken = {
  // GENERATE ACCESS TOKEN
  accessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESSTOKEN_KEY,
      { expiresIn: "3d" }
    );
  },

  // GENERATE REFRESH TOKEN
  refreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_REFRESHTOKEN_KEY,
      { expiresIn: "30d" }
    );
  },
};

export default generateToken;
