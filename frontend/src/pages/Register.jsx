import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    company: "", // for recruiters
    college: "" 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();

  // Fetch companies for Recruiter dropdown
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await api.get("/companies/list");
        setCompanies(data);
      } catch (err) {
        console.error("Failed to fetch companies", err);
      }
    };
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || form.password.length < 6) {
      setError("Please fill all fields (password ≥ 6 characters)");
      return;
    }

    if (form.role === "recruiter" && !form.company) {
      setError("Please select a company");
      return;
    }

    try {
      setLoading(true);
      const payload = { ...form };
      if (form.role !== "recruiter") {
        delete payload.company;
      }
      await api.post("/auth/register", payload);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#0B0B14] text-white">
      {/* LEFT SIDE – VALUE */}
      <div className="hidden md:flex flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl -top-40 -left-40"></div>

        <h1 className="text-4xl font-extrabold mb-6">
          Start Your Placement Journey
        </h1>

        <p className="text-gray-400 text-lg mb-10 max-w-md">
          Join a centralized platform where students track applications and
          colleges manage placements efficiently.
        </p>

        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <span className="text-purple-400">✔</span>
            <p className="text-gray-300">Smart eligibility checks</p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-purple-400">✔</span>
            <p className="text-gray-300">Real-time application status</p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-purple-400">✔</span>
            <p className="text-gray-300">Secure & role-based access</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – FORM */}
      <div className="flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-2 text-purple-400">
            Create Account
          </h2>
          <p className="text-gray-400 mb-6">Register to get started</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-[#1F2937] border border-[#1F2937] focus:border-purple-500 outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-[#1F2937] border border-[#1F2937] focus:border-purple-500 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-[#1F2937] border border-[#1F2937] focus:border-purple-500 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {/* ROLE SELECTION */}
            <select
              className="w-full px-4 py-3 rounded-lg bg-[#1F2937] border border-[#1F2937] focus:border-purple-500 outline-none text-gray-300"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="recruiter">Recruiter (Company HR)</option>
              <option value="admin">Placement Admin</option>
            </select>

            {/* COLLEGE NAME (For Admin & Student) */}
            {form.role !== "recruiter" && (
                <input
                type="text"
                placeholder="College Name (e.g. REC)"
                className="w-full px-4 py-3 rounded-lg bg-[#1F2937] border border-[#1F2937] focus:border-purple-500 outline-none"
                onChange={(e) => setForm({ ...form, college: e.target.value })}
              />
            )}

            {/* COMPANY SELECTION (Only for Recruiter) */}
            {form.role === "recruiter" && (
              <select
                className="w-full px-4 py-3 rounded-lg bg-[#1F2937] border border-[#1F2937] focus:border-purple-500 outline-none text-gray-300"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              >
                <option value="">Select Company</option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 transition rounded-lg py-3 font-semibold disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <span
              className="text-purple-400 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
