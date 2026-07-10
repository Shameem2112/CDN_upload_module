import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  return ApiResponse.success(
    res,
    201,
    "User registered successfully",
    result
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return ApiResponse.success(
    res,
    200,
    "Login successful",
    result
  );

});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  console.log("getCurrentUser - user fetched:", user);
  return ApiResponse.success(
    res,
    200,
    "Current user fetched successfully",
    user
  );
});