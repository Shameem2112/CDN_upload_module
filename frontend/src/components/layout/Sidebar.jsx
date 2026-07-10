import {
  Folder,
  LayoutDashboard,
  LogOut,
  Upload,
  User,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg p-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-50"
    }`;

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          CDN
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/dashboard/upload" className={linkClass}>
          <Upload size={20} />
          <span>Upload</span>
        </NavLink>

        <NavLink to="/dashboard/files" className={linkClass}>
          <Folder size={20} />
          <span>Files</span>
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;