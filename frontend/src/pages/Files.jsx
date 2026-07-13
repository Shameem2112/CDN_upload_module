import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fileService from "../services/file.service";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import FileCard from "../components/common/FileCard";

function Files() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchFiles = async () => {
    try {
      setLoading(true);

      const res = await fileService.getFiles(page);

      const data = res.data.data;

      // Supports both old and new API responses
      if (Array.isArray(data)) {
        setFiles(data);
      } else {
        setFiles(data.files || []);
        setPage(data.page);
      }
      setPages(data.pages);
      setTotal(data.total);

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load files."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fileService.deleteFile(id);

      fetchFiles();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [page]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-2xl font-semibold text-red-600">
          Failed to load files
        </h2>

        <p className="mt-3 text-gray-600">{error}</p>

        <button
          onClick={fetchFiles}
          className="mt-6 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <EmptyState
        title="No Files Found"
        description="Upload your first file."
      />
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Files
          </h1>

          <p className="text-gray-500">
            {total} Files Uploaded
          </p>
        </div>
      </div>

      {/* Grid */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {files.map((file) => (
          <FileCard
            key={file._id}
            file={file}
            onDelete={handleDelete}
            onEdit={() =>
              navigate(`/dashboard/files/${file._id}/edit`)
            }
          />
        ))}
      </div>

      {/* Pagination */}

      {pages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {page} of {pages}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === pages}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Files;