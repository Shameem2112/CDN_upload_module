import File from "../models/file.model.js";

class FileRepository {
  async create(data) {
    return await File.create(data);
  }

  async findAll() {
    return await File.find().sort({ createdAt: -1 });
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