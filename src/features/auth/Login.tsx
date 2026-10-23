import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { loginSchema, type LoginValues } from "./schema";
import { login } from "../../lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "", remember: true },
  });

  const onSubmit = (values: LoginValues) => {
    const session = login(values.identifier, values.password, values.remember);

    // Login gagal: tampilkan pesan error, form tetap di halaman ini
    if (!session) {
      setLoginError("Email/username atau password salah");
      return;
    }

    setLoginError(null);
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-6">
      <div className="font-metal text-5xl text-portal-dark md:text-6xl">
        Rick and Morty
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 rounded-3xl bg-paper/90 p-6 shadow-xl md:grid-cols-2 md:p-10">
        {/* Gambar karakter dari API, disembunyikan di layar kecil */}
        <div className="hidden items-center justify-center md:flex">
          <div className="flex items-end rounded-full bg-portal/30 p-8 ring-8 ring-portal/40">
            <img
              src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
              alt="Rick Sanchez"
              className="size-28 rounded-full border-4 border-paper object-cover"
            />
            <img
              src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
              alt="Morty Smith"
              className="-ml-4 size-28 rounded-full border-4 border-paper object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-title text-4xl font-bold leading-tight text-portal-dark">
            Welcome back to the Multiverse
          </div>
          <div className="text-sm text-ink/70">Enter your credentials to continue exploring</div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 rounded-xl border border-portal/30 bg-white px-4 py-3 focus-within:border-portal">
                <User size={18} className="text-ink/60" />
                <input
                  {...register("identifier")}
                  placeholder="Email / Username"
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {errors.identifier && (
                <div className="text-sm text-red-500">
                  {errors.identifier.message}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 rounded-xl border border-portal/30 bg-white px-4 py-3 focus-within:border-portal">
                <Lock size={18} className="text-ink/60" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Tampilkan atau sembunyikan password"
                  className="text-ink/60"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <div className="text-sm text-red-500">
                  {errors.password.message}
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                {...register("remember")}
                className="size-4 accent-portal"
              />
              Remember me
            </label>

            {loginError && (
              <div className="rounded-xl bg-red-100 px-4 py-2 text-sm text-red-600">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="rounded-xl bg-linear-to-b from-portal to-portal-dark py-3 font-title text-lg font-bold text-white shadow"
            >
              Login
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;