import bcrypt from "bcrypt";
import env from "../../config/env.js";

class PasswordProvider {
  async hash(password) {
    return await bcrypt.hash(
      password,
      Number(env.BCRYPT_SALT_ROUNDS)
    );
  }

  async compare(password, hashedPassword) {
    return await bcrypt.compare(
      password,
      hashedPassword
    );
  }
}

export default new PasswordProvider();