import ApiError from "../utils/ApiError.js";
import jwtProvider from "../../infrastructure/security/jwt.provider.js";
import userRepository from "../../domains/user/repositories/user.repository.js";

const authenticate = async (req, res, next) => {
  try {
    // Read JWT from HttpOnly cookie
    const token = req.cookies.token;

    if (!token) {
      return next(
        new ApiError(401, "Authentication required")
      );
    }

    // Verify JWT
    const payload = jwtProvider.verifyToken(token);

    if (!payload || !payload.id || !payload.role) {
      return next(
        new ApiError(401, "Invalid token payload")
      );
    }

    // Find user
    const user = await userRepository.findById(
      payload.id
    );

    if (!user) {
      return next(
        new ApiError(401, "User not found")
      );
    }

    if (!user.isActive) {
      return next(
        new ApiError(403, "Account is inactive")
      );
    }

    // Attach user to request
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