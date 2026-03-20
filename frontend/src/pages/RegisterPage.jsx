import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authApi from "../lib/authApi";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      return toast.error("Please fill all fields");
    }

    if (!email.includes("@")) {
      return toast.error("Please enter a valid email");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);
    toast.loading("Creating account...", { id: "register" });

    try {
      const res = await authApi.post("/register", {
        username,
        email,
        password,
      });

      // Set user + token globally
      await login(res.data.token);

      toast.success("Account created!", { id: "register" });
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed", {
        id: "register",
      });
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
          Create a notes workspace that fits every screen.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-base-content/70">
          Register once and your notes flow through the same fullstack app, whether you are on a phone, tablet, or desktop browser.
        </p>
      </div>

      <div className="auth-card">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">
            Get Started
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Create Account
          </h1>
          <p className="mt-2 text-sm leading-6 text-base-content/70">
            Set up your profile and start writing.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="label">
              <span className="label-text text-base-content/80">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered h-12 w-full rounded-2xl bg-base-200/70 px-4 focus:border-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content/80">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
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
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content/70">
          Already have an account?
          <Link to="/login" className="ml-1 font-medium text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
