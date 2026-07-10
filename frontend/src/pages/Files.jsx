import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fileService from "../services/file.service";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import FileCard from "../components/common/FileCard";

function Files() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchFiles = async () => {
    try {
      const res = await fileService.getFiles();
      setFiles(res.data.data || []);
    } catch (err) {
      console.error(err);
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
  }, []);

  if (loading) {
    return <Loader />;
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Files
          </h1>

          <p className="text-gray-500">
            {files.length} Files Uploaded
          </p>
        </div>
      </div>

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
    </div>
  );
}

export default Files;