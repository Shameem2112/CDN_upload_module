import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import fileService from "../services/file.service";

function EditFile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [originalName, setOriginalName] = useState("");

  useEffect(() => {
    fetchFile();
  }, []);

  const fetchFile = async () => {
    try {
      const res = await fileService.getFile(id);

      setOriginalName(res.data.data.originalName);
    } catch (err) {
      toast.error("Unable to fetch file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await fileService.updateFile(id, {
        originalName,
      });

      toast.success("File updated successfully");

      navigate("/dashboard/files");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">

      <h1 className="mb-6 text-2xl font-bold">
        Edit File
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="File Name"
          value={originalName}
          onChange={(e) =>
            setOriginalName(e.target.value)
          }
        />

        <Button
          type="submit"
          loading={loading}
        >
          Save Changes
        </Button>

      </form>

    </div>
  );
}

export default EditFile;