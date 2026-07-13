import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFileSchema } from "../validations/file.schema";


import Button from "../components/common/Button";
import Input from "../components/common/Input";
import fileService from "../services/file.service";

function EditFile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
} = useForm({
  resolver: zodResolver(editFileSchema),
});

  useEffect(() => {
    fetchFile();
  }, []);

  const fetchFile = async () => {
    try {
      const res = await fileService.getFile(id);

      setValue("originalName", res.data.data.originalName);
    } catch (err) {
      console.error(err);
      toast.error("Unable to fetch file");
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        originalName: data.originalName
          .trim()
          .replace(/\s+/g, " "),
      };

      await fileService.updateFile(id, payload);

      toast.success("File updated successfully");

      navigate("/dashboard/files");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Update failed"
      );
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
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="File Name"
          placeholder="Enter file name"
          error={errors.originalName?.message}
          {...register("originalName", {
            required: "Filename is required",

            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },

            maxLength: {
              value: 100,
              message: "Maximum 100 characters",
            },

            pattern: {
              value: /^[a-zA-Z0-9._ -]+$/,
              message:
                "Only letters, numbers, spaces, dots, hyphens and underscores are allowed",
            },
          })}
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