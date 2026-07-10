import { Router } from "express";

import upload from "../middleware/upload.middleware.js";

import validate from "../../../shared/middleware/validation.middleware.js";
import authenticate from "../../../shared/middleware/authenticate.middleware.js";

import {
  fileIdValidator,
  updateFileValidator,
} from "../validators/file.validator.js";

import {
  uploadSingle,
  uploadMultiple,
  getAllFiles,
  getFileById,
  updateFile,
  deleteFile,
} from "../controllers/file.controller.js";
import fileOwner from "../middleware/fileOwner.middleware.js";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  uploadSingle
);

router.post(
  "/upload/multiple",
  authenticate,
  upload.array("files", 10),
  uploadMultiple
);

router.get("/", authenticate, getAllFiles);

router.get(
  "/:id",
  authenticate,
  fileIdValidator,
  validate,
  getFileById
);

router.put(
  "/:id",
  authenticate,
  updateFileValidator,
  validate,
  updateFile
);

router.delete(
  "/:id",
  authenticate,
  fileOwner,
  fileIdValidator,
  validate,
  deleteFile
);

export default router;