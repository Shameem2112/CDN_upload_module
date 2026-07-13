import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  UploadCloud,
  File,
  Trash2,
  CheckCircle,
} from "lucide-react";

import Button from "../components/common/Button";
import fileService from "../services/file.service";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
];

function Upload() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes < 1024)
      return `${bytes} B`;

    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(2)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length === 0) return;

    const validFiles = [];

    for (const file of selectedFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`${file.name} is not supported`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds 5 MB`);
        continue;
      }

      validFiles.push(file);
    }

    setFiles((prev) => [...prev, ...validFiles]);

    e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select files.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      await fileService.uploadMultiple(formData);

      toast.success("Files uploaded successfully");

      setFiles([]);

      navigate("/dashboard/files");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">

      <div className="rounded-2xl bg-white p-8 shadow-lg">

        {/* Header */}

        <div className="mb-8 flex items-center gap-4">

          <div className="rounded-full bg-blue-100 p-4">

            <UploadCloud
              size={32}
              className="text-blue-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              Upload Files
            </h1>

            <p className="text-gray-500">
              Upload images and PDF documents.
            </p>

          </div>

        </div>

        <form
          onSubmit={handleUpload}
          className="space-y-8"
        >

          {/* Upload Area */}

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-12 transition hover:border-blue-500 hover:bg-blue-100">

            <UploadCloud
              size={60}
              className="mb-4 text-blue-600"
            />

            <h2 className="text-xl font-semibold">
              Drag & Drop files here
            </h2>

            <p className="mt-2 text-gray-500">
              or click to browse
            </p>

            <p className="mt-4 text-sm text-gray-400">
              PNG • JPG • JPEG • PDF
            </p>

            <p className="text-sm text-gray-400">
              Maximum 5 MB per file
            </p>

            <input
              type="file"
              multiple
              className="hidden"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileChange}
            />

          </label>

          {/* Selected Files */}

          {files.length > 0 && (

            <div className="rounded-xl border border-gray-200">

              <div className="flex items-center justify-between border-b bg-gray-50 p-4">

                <h2 className="font-semibold">

                  Selected Files ({files.length})

                </h2>

                <span className="text-sm text-gray-500">

                  Ready to upload

                </span>

              </div>

              <div className="divide-y">

                {files.map((file, index) => (

                  <div
                    key={index}
                    className="flex items-center justify-between p-4"
                  >

                    <div className="flex items-center gap-4">

                      <div className="rounded-lg bg-blue-100 p-3">

                        <File className="text-blue-600" />

                      </div>

                      <div>

                        <p className="font-medium">
                          {file.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeFile(index)
                      }
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-100"
                    >

                      <Trash2 size={20} />

                    </button>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* Upload Button */}

          <Button
            type="submit"
            loading={loading}
            disabled={
              loading || files.length === 0
            }
          >
            {loading
              ? "Uploading..."
              : `Upload ${files.length} File${
                  files.length !== 1 ? "s" : ""
                }`}
          </Button>

          {/* Footer */}

          <div className="flex items-center gap-2 rounded-lg bg-green-50 p-4">

            <CheckCircle
              size={18}
              className="text-green-600"
            />

            <p className="text-sm text-green-700">

              Files are securely uploaded and
              stored in your CDN.

            </p>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Upload;