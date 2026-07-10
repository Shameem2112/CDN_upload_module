import {
  Eye,
  Pencil,
  Trash2,
  FileText,
} from "lucide-react";

function FileCard({
  file,
  onDelete,
  onEdit,
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow transition hover:shadow-lg">
      <img
        src={file.thumbnailUrl || file.url}
        alt={file.originalName}
        className="mb-4 h-48 w-full rounded-lg object-cover"
      />

      <h2 className="truncate text-lg font-semibold">
        {file.originalName}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {(file.size / 1024).toFixed(2)} KB
      </p>

      <div className="mt-5 flex gap-2">

        <a
          href={file.url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        >
          <Eye size={18} />
          View
        </a>

        <button
          onClick={onEdit}
          className="flex items-center justify-center rounded-lg bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(file._id)}
          className="flex items-center justify-center rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}

export default FileCard;