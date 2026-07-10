import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">
      {/* Search */}
      <div className="flex w-96 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:bg-white">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search files..."
          className="w-full bg-transparent text-sm placeholder:text-gray-400 outline-none"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative rounded-full p-2 transition hover:bg-gray-100">
          <Bell size={22} className="text-gray-600" />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* User Info */}
        <div className="text-right">
          <h3 className="text-sm font-semibold text-gray-800">
            {user?.firstName}
          </h3>

          <p className="text-xs text-gray-500">
            {user?.email}
          </p>
        </div>

        {/* Avatar */}
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-md">
          {user?.firstName?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default Navbar;