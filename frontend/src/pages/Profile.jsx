import { useAuth } from "../context/AuthContext";
import { User, Mail, ShieldCheck } from "lucide-react";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
      <div className="mb-8 flex items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
          <User size={50} className="text-blue-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>

          <p className="mt-1 text-gray-500">
            CDN Module User
          </p>
        </div>
      </div>

      <div className="space-y-6">

        <div className="flex items-center gap-4 rounded-lg border p-4">
          <Mail className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg border p-4">
          <ShieldCheck className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">
              Role
            </p>

            <p className="font-semibold">
              {user?.role}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;