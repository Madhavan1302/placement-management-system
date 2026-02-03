import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);

      const role = jwtDecode(res.data.token).role;

      if (role === "admin") navigate("/admin");
      else if (role === "recruiter") navigate("/recruiter");
      else navigate("/student");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] flex items-center justify-center relative overflow-hidden text-white">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl -top-40 -left-40"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-800/20 rounded-full blur-3xl bottom-0 right-0"></div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Login to continue to <span className="text-purple-400">PlacementPortal</span>
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg bg-[#1F2937] border border-[#1F2937] focus:border-purple-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-[#1F2937] border border-[#1F2937] focus:border-purple-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 transition rounded-lg py-3 font-semibold disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
