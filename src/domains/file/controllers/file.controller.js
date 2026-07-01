import ApiResponse from "../../../shared/utils/ApiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import fileService from "../services/file.service.js";

export const uploadSingle = asyncHandler(async (req, res) => {
  const file = await fileService.uploadSingle(req.file, req.user.id);

  return ApiResponse.success(
    res,
    201,
    "File uploaded successfully",
    file
  );
});

export const uploadMultiple = asyncHandler(async (req, res) => {
  const files = await fileService.uploadMultiple(req.files, req.user.id);

  return ApiResponse.success(
    res,
    201,
    "Files uploaded successfully",
    files
  );
});

export const getAllFiles = asyncHandler(async (req, res) => {
  const files = await fileService.getAllFiles();

  return ApiResponse.success(
    res,
    200,
    "Files fetched successfully",
    files
  );
});

export const getFileById = asyncHandler(async (req, res) => {
  const file = await fileService.getFileById(req.params.id);

  return ApiResponse.success(
    res,
    200,
    "File fetched successfully",
    file
  );
});

export const updateFile = asyncHandler(async (req, res) => {
  const file = await fileService.updateFile(
    req.params.id,
    req.body,
    req.user.id
  );

  return ApiResponse.success(
    res,
    200,
    "File updated successfully",
    file
  );
});

export const deleteFile = asyncHandler(async (req, res) => {
  const file = await fileService.deleteFile(req.params.id);

  return ApiResponse.success(
    res,
    200,
    "File deleted successfully",
    file
  );
});