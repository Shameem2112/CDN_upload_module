import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UploadCloud, File } from "lucide-react";

import Button from "../components/common/Button";
import fileService from "../services/file.service";

function Upload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      await fileService.uploadMultiple(formData);

      toast.success("Files uploaded successfully!");

      setFiles([]);

      navigate("/dashboard/files");
    } catch (err) {
  console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  console.error(err);

  toast.error("Upload Failed");
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-8 flex items-center gap-3">
          <UploadCloud
            size={32}
            className="text-blue-600"
          />

          <div>
            <h1 className="text-3xl font-bold">
              Upload Files
            </h1>

            <p className="text-gray-500">
              Upload one or multiple files.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleUpload}
          className="space-y-6"
        >
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 p-10 transition hover:bg-blue-100">
            <UploadCloud
              size={50}
              className="mb-4 text-blue-600"
            />

            <p className="font-semibold text-gray-700">
              Click to choose files
            </p>

            <p className="mt-1 text-sm text-gray-500">
              You can upload multiple files
            </p>

            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) =>
                setFiles(Array.from(e.target.files))
              }
            />
          </label>

          {files.length > 0 && (
            <div className="rounded-xl border p-5">
              <h2 className="mb-4 text-lg font-semibold">
                Selected Files ({files.length})
              </h2>

              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-100 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <File className="text-blue-600" />

                      <div>
                        <p className="font-medium">
                          {file.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            disabled={files.length === 0}
          >
            Upload Files
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Upload;