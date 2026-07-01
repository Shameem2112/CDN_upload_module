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