import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import authService from "../services/auth.service";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await authService.register(data);

      toast.success("Account created successfully");

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="First Name"
            {...register("firstName", {
              required: "First name is required",
            })}
            error={errors.firstName?.message}
          />

          <Input
            label="Last Name"
            {...register("lastName", {
              required: "Last name is required",
            })}
            error={errors.lastName?.message}
          />

          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            loading={loading}
          >
            Register
          </Button>
        </form>

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-blue-600"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
