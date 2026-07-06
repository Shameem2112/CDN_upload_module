import { Router } from "express";

import {
  register,
  login,
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

import validate from "../../../shared/middleware/validation.middleware.js";
import { authRateLimiter } from "../../../shared/middleware/rateLimiter.middleware.js";

const router = Router();

router.post(
  "/register",
  authRateLimiter,
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  authRateLimiter,
  loginValidator,
  validate,
  login
);

export default router;