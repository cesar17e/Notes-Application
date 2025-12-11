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
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 p-10 rounded-2xl shadow-2xl border border-base-300">
        <h1 className="text-3xl font-bold text-center mb-8 text-base-content">
          Create Account
        </h1>

        {/* FORM (Enter now works normally) */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Username */}
          <div>
            <label className="label">
              <span className="label-text text-base-content/80">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full bg-base-200 focus:border-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text text-base-content/80">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
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
              className="input input-bordered w-full bg-base-200 focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-white shadow-lg"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-base-content/70">
          Already have an account?
          <Link to="/login" className="text-primary hover:underline ml-1">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
