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
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 p-10 rounded-2xl shadow-2xl border border-base-300">
        <h1 className="text-3xl font-bold text-center mb-8 text-base-content">
          Login
        </h1>

        {/* Prevent Enter-auto submit */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text text-base-content/80">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="off"
              className="input input-bordered w-full bg-base-200 focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text text-base-content/80">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              autoComplete="off"
              className="input input-bordered w-full bg-base-200 focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-white shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-base-content/70">
          Don’t have an account?
          <Link to="/register" className="text-primary hover:underline ml-1">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
