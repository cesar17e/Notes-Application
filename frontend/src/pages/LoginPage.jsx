import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authApi from "../lib/authApi";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    toast.loading("Logging in...", { id: "login" });

    try {
      const res = await authApi.post("/login", { email, password });
      await login(res.data.token);

      toast.success("Welcome back!", { id: "login" });
      navigate("/");
    } catch (err) {
        toast.error(
            err?.response?.data?.error || "Login failed",
            { id: "login" }
          );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell justify-center lg:justify-between">
      <div className="hidden max-w-xl lg:block lg:pr-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
          ThinkBoard
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight text-white">
          Notes that stay usable on mobile and desktop.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-base-content/70">
          Sign in to review your latest ideas, update notes quickly, and keep the same workflow across small and large screens.
        </p>
      </div>

      <div className="auth-card">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">
            Welcome Back
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Login
          </h1>
          <p className="mt-2 text-sm leading-6 text-base-content/70">
            Access your notes from any device.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="label">
              <span className="label-text text-base-content/80">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="off"
              className="input input-bordered h-12 w-full rounded-2xl bg-base-200/70 px-4 focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content/80">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              autoComplete="off"
              className="input input-bordered h-12 w-full rounded-2xl bg-base-200/70 px-4 focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary h-12 w-full rounded-2xl text-white shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content/70">
          Don’t have an account?
          <Link to="/register" className="ml-1 font-medium text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
