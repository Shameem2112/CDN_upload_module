import ApiError from "../../../shared/utils/ApiError.js";

import userRepository from "../../user/repositories/user.repository.js";

import passwordProvider from "../../../infrastructure/security/password.provider.js";

import jwtProvider from "../../../infrastructure/security/jwt.provider.js";
class AuthService {

  async register(data) {

    const {
      firstName,
      lastName,
      email,
      password,
    } = data;

    const existingUser =
      await userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(
        409,
        "Email already registered"
      );
    }

    const hashedPassword =
      await passwordProvider.hash(password);

    const user =
      await userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

    const token =
      jwtProvider.generateToken({
        id: user._id,
        role: user.role,
      });

    return {
      user,
      token,
    };
  }
    async login(data) {

    const { email, password } = data;

    const user =
      await userRepository.findByEmailWithPassword(
        email
      );

    if (!user) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    const isMatch =
      await passwordProvider.compare(
        password,
        user.password
      );

    if (!isMatch) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }
    await userRepository.update(user._id, {
  lastLogin: new Date(),
});


    const token =
      jwtProvider.generateToken({
        id: user._id,
        role: user.role,
      });

    user.password = undefined;

    return {
      user,
      token,
    };
  }

}

export default new AuthService();

