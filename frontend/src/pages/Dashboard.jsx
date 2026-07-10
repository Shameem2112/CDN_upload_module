import { useEffect, useState } from "react";
import fileService from "../services/file.service";

function Dashboard() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const res = await fileService.getFiles();
      setFiles(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalFiles = files.length;

  const totalImages = files.filter((file) =>
    file.mimeType.startsWith("image")
  ).length;

  const totalStorage = (
    files.reduce((sum, file) => sum + file.size, 0) /
    1024 /
    1024
  ).toFixed(2);

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back 👋
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">
            Total Files
          </h3>

          <p className="mt-3 text-4xl font-bold text-blue-600">
            {totalFiles}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">
            Images
          </h3>

          <p className="mt-3 text-4xl font-bold text-green-600">
            {totalImages}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">
            Storage Used
          </h3>

          <p className="mt-3 text-4xl font-bold text-purple-600">
            {totalStorage} MB
          </p>
        </div>

      </div>

      {/* Recent Uploads */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-5 text-xl font-bold">
          Recent Uploads
        </h2>

        {files.length === 0 ? (
          <p className="text-gray-500">
            No files uploaded yet.
          </p>
        ) : (
          <div className="space-y-4">
            {files.slice(0, 5).map((file) => (
              <div
                key={file._id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">
                    {file.originalName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;