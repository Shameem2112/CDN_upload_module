import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderCircle
        size={40}
        className="animate-spin text-blue-600"
      />
    </div>
  );
}

export default Loader;