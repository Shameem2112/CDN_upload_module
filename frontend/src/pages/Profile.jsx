import { useAuth } from "../context/AuthContext";
import { CalendarDays, Mail, Shield, User } from "lucide-react";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="mb-8 text-3xl font-bold">
        My Profile
      </h1>

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white">

          <div className="flex flex-col items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-5xl font-bold text-blue-600 shadow">

              {user?.firstName?.charAt(0)}

            </div>

            <h2 className="mt-5 text-3xl font-bold">

              {user?.firstName} {user?.lastName}

            </h2>

            <p className="mt-2 rounded-full bg-white/20 px-4 py-1 text-sm">

              {user?.role}

            </p>

          </div>

        </div>

        {/* Details */}

        <div className="grid gap-6 p-8 md:grid-cols-2">

          <div className="rounded-xl border p-5">

            <div className="mb-2 flex items-center gap-3">

              <User className="text-blue-600" />

              <h3 className="font-semibold">
                First Name
              </h3>

            </div>

            <p>{user?.firstName}</p>

          </div>

          <div className="rounded-xl border p-5">

            <div className="mb-2 flex items-center gap-3">

              <User className="text-blue-600" />

              <h3 className="font-semibold">
                Last Name
              </h3>

            </div>

            <p>{user?.lastName}</p>

          </div>

          <div className="rounded-xl border p-5">

            <div className="mb-2 flex items-center gap-3">

              <Mail className="text-blue-600" />

              <h3 className="font-semibold">
                Email
              </h3>

            </div>

            <p>{user?.email}</p>

          </div>

          <div className="rounded-xl border p-5">

            <div className="mb-2 flex items-center gap-3">

              <Shield className="text-blue-600" />

              <h3 className="font-semibold">
                Role
              </h3>

            </div>

            <p>{user?.role}</p>

          </div>

          <div className="rounded-xl border p-5">

            <div className="mb-2 flex items-center gap-3">

              <CalendarDays className="text-blue-600" />

              <h3 className="font-semibold">
                Joined
              </h3>

            </div>

            <p>
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>

          </div>

          <div className="rounded-xl border p-5">

            <div className="mb-2 flex items-center gap-3">

              <Shield className="text-green-600" />

              <h3 className="font-semibold">
                Status
              </h3>

            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">

              Active

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;