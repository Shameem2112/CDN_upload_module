import imagekit from "../../../config/imagekit.js";
import { randomUUID } from "crypto";

class ImageKitService {
  
  async upload(file) {
  
    const uniqueFileName = `${randomUUID()}-${file.originalname}`;
    

    const response = await imagekit.files.upload({
  file: file.buffer.toString("base64"),
  fileName: uniqueFileName,
  folder: "/cdn-upload-module",
});
    
    return response;
  }

  async delete(fileId) {
    return await imagekit.deleteFile(fileId);
  }
  
}

export default new ImageKitService();