import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/auth.schema";
import { useAuth } from "../context/AuthContext";
function Login() {
const [loading, setLoading] = useState(false);

const navigate = useNavigate();
const { login } = useAuth();
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(loginSchema),
});

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await login(data);

navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter Email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            loading={loading}
          >
            Login
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Don't have an account?{" "}
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;