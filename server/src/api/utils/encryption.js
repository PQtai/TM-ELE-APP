const bycrypt = require("bcryptjs");
import bycrypt from "bcryptjs";

const encryptionPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);
  return hashedPassword;
};

export { encryptionPassword };
