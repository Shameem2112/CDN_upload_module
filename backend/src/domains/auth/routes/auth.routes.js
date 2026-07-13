import { Router } from "express";

import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

import validate from "../../../shared/middleware/validation.middleware.js";
import { authRateLimiter } from "../../../shared/middleware/rateLimiter.middleware.js";
import authenticate from "../../../shared/middleware/authenticate.middleware.js";


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
router.get("/me", authenticate, getCurrentUser);
router.post("/logout", authenticate, logout);

export default router;