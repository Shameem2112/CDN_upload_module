import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    fileName: {
      type: String,
      required: true,
      unique: true,
    },

    fileId: {
      type: String,
      required: true,
      unique: true,
    },

    url: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      default: null,
    },

    mimeType: {
      type: String,
      required: true,
    },

    extension: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    folder: {
      type: String,
      default: "/",
    },
    uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("File", fileSchema);