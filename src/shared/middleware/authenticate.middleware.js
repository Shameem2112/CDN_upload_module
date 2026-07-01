import ApiError from "../utils/ApiError.js";

import jwtProvider from "../../infrastructure/security/jwt.provider.js";

import userRepository from "../../domains/user/repositories/user.repository.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return next(
        new ApiError(
          401,
          "Authentication required"
        )
      );
    }

    const token = authHeader.split(" ")[1];

    const payload =
      jwtProvider.verifyToken(token);

    const user =
      await userRepository.findById(
        payload.id
      );

    if (!user) {
      return next(
        new ApiError(
          401,
          "User not found"
        )
      );
    }

    if (!user.isActive) {
      return next(
        new ApiError(
          403,
          "Account is inactive"
        )
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(
      new ApiError(
        401,
        "Invalid or expired token"
      )
    );
  }
};

export default authenticate;