import path from "path";

import ApiError from "../../../shared/utils/ApiError.js";

import imagekitService from "./imagekit.service.js";

import fileRepository from "../repositories/file.repository.js";
class FileService {
    async uploadSingle(file,userId) {
  if (!file) {
    throw new ApiError(400, "File is required");
  }

  const uploadedFile = await imagekitService.upload(file);

  const extension = path.extname(file.originalname).replace(".", "");

  const savedFile = await fileRepository.create({
    originalName: file.originalname,

    fileName: uploadedFile.name,

    fileId: uploadedFile.fileId,

    url: uploadedFile.url,

    thumbnailUrl: uploadedFile.thumbnailUrl,

    mimeType: file.mimetype,

    extension,

    size: file.size,

    folder: "/cdn-upload-module",
    uploadedBy: userId, // Store the user ID who uploaded the file
  });

  return savedFile;
}
async uploadMultiple(files, userId) {
  if (!files || files.length === 0) {
    throw new ApiError(400, "Files are required");
  }

  const uploadedFiles = [];

  for (const file of files) {
    const savedFile = await this.uploadSingle(file, userId);
    uploadedFiles.push(savedFile);
  }

  return uploadedFiles;
}
async getAllFiles(userId, page = 1, limit = 9) {
  page = Number(page);
  limit = Number(limit);

  return await fileRepository.findByUser(userId, page, limit);
}
async getFileById(id) {
  const file = await fileRepository.findById(id);

  if (!file) {
    throw new ApiError(404, "File not found");
  }

  return file;
}
async updateFile(id, data) {
  const file = await fileRepository.update(id, data);

  if (!file) {
    throw new ApiError(404, "File not found");
  }

  return file;
}
async deleteFile(id) {
  const file = await this.getFileById(id);

  await imagekitService.delete(file.fileId);

  await fileRepository.delete(id);

  return file;
}
}


export default new FileService();