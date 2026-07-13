import File from "../models/file.model.js";

class FileRepository {
  async create(data) {
    return await File.create(data);
  }

  
  async findByUser(userId, page = 1, limit = 9) {
  const skip = (page - 1) * limit;

  const [files, total] = await Promise.all([
    File.find({ uploadedBy: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    File.countDocuments({ uploadedBy: userId }),
  ]);

  return {
    files,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}
  async findById(id) {
    return await File.findById(id);
  }

  async update(id, data) {
    return await File.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await File.findByIdAndDelete(id);
  }
}

export default new FileRepository();