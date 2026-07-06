import multer from "multer";
import path from "path";
import ApiError from "../utils/ApiError.js";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".pdf",
];

const isValidFilename = (filename) => {
  return /^[a-zA-Z0-9._ -]+$/.test(filename);
};

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new ApiError(400, "Unsupported file type"));
  }

  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return cb(new ApiError(400, "Invalid file extension"));
  }

  if (!isValidFilename(file.originalname)) {
    return cb(new ApiError(400, "Invalid filename"));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 10,
  },
});