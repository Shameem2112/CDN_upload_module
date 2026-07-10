import { body, param } from "express-validator";

export const updateFileValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid file id"),

  body("originalName")
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Original name must be between 1 and 255 characters"),
];

export const fileIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid file id"),
];