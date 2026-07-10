import { FolderOpen } from "lucide-react";

function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16">
      <FolderOpen
        size={70}
        className="text-gray-400"
      />

      <h2 className="mt-5 text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;