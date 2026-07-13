import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return ApiResponse.success(
    res,
    201,
    "User registered successfully",
    result
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

res.cookie("token", result.token, {
  httpOnly: true,
  secure: false,      // true in production with HTTPS
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  return ApiResponse.success(
    res,
    200,
    "Login successful",
    result
  );

});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  return ApiResponse.success(
    res,
    200,
    "Current user fetched successfully",
    user
  );
});
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  return ApiResponse.success(
    res,
    200,
    "Logged out successfully"
  );
});