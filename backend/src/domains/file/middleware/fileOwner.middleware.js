import ApiError from "../../../shared/utils/ApiError.js";

import fileRepository from "../repositories/file.repository.js";

const fileOwner = async (
  req,
  res,
  next
) => {
  const file =
    await fileRepository.findById(
      req.params.id
    );

  if (!file) {
    return next(
      new ApiError(
        404,
        "File not found"
      )
    );
  }

  const isOwner =
    file.uploadedBy.toString() ===
    req.user._id.toString();

  const isAdmin =
    req.user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return next(
      new ApiError(
        403,
        "Access denied"
      )
    );
  }

  req.fileDoc = file;

  next();
};

export default fileOwner;