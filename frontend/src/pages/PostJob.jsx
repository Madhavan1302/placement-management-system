import { useState } from "react";
import api from "../api/axios";
import RecruiterNavbar from "../components/RecruiterNavbar";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    package: "",
    location: "",
    minCgpa: "",
    allowBacklogs: false,
    allowedBranches: [], 
    driveDate: "",
    college: ""
  });

  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "AI&DS"];

  const handleBranchChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm({ ...form, allowedBranches: [...form.allowedBranches, value] });
    } else {
      setForm({
        ...form,
        allowedBranches: form.allowedBranches.filter((b) => b !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.package || !form.driveDate) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      // Split skills by comma
      const payload = {
        ...form,
        skills: form.skills.split(",").map(s => s.trim())
      };
      
      await api.post("/jobs", payload);
      alert("Job Posted Successfully!");
      navigate("/recruiter");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <RecruiterNavbar />
      
      <div className="max-w-3xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6 text-purple-400">Post a Job Drive</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#111827] p-8 rounded-xl border border-gray-700">
          
          <div>
            <label className="block text-gray-400 mb-2">Job Title *</label>
            <input 
              type="text" 
              className="w-full bg-[#1F2937] border-none rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. Software Engineer"
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Description *</label>
            <textarea 
              rows="4"
              className="w-full bg-[#1F2937] border-none rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
              placeholder="Job details, roles, and responsibilities..."
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Package (LPA) *</label>
              <input 
                type="text" 
                className="w-full bg-[#1F2937] border-none rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. 12 LPA"
                value={form.package}
                onChange={(e) => setForm({...form, package: e.target.value})}
              />
            </div>
            <div>
               <label className="block text-gray-400 mb-2">Location</label>
               <input 
                type="text" 
                className="w-full bg-[#1F2937] border-none rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. Bangalore"
                value={form.location}
                onChange={(e) => setForm({...form, location: e.target.value})}
              />
            </div>
          </div>

          <div>
             <label className="block text-gray-400 mb-2">Target College Name (For Approvals)</label>
             <input 
              type="text" 
              className="w-full bg-[#1F2937] border-none rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. REC"
              value={form.college}
              onChange={(e) => setForm({...form, college: e.target.value})}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Minimum CGPA</label>
              <input 
                type="number" 
                step="0.1"
                className="w-full bg-[#1F2937] border-none rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. 7.5"
                value={form.minCgpa}
                onChange={(e) => setForm({...form, minCgpa: e.target.value})}
              />
            </div>
             <div>
              <label className="block text-gray-400 mb-2">Drive Date *</label>
              <input 
                type="date" 
                className="w-full bg-[#1F2937] border-none rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
                value={form.driveDate}
                onChange={(e) => setForm({...form, driveDate: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Skills (comma separated)</label>
            <input 
              type="text" 
              className="w-full bg-[#1F2937] border-none rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
              placeholder="React, Node.js, Java..."
              value={form.skills}
              onChange={(e) => setForm({...form, skills: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Allowed Branches</label>
            <div className="flex flex-wrap gap-4">
              {branches.map(branch => (
                <label key={branch} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    value={branch}
                    checked={form.allowedBranches.includes(branch)}
                    onChange={handleBranchChange}
                    className="accent-purple-500 w-5 h-5"
                  />
                  <span className="text-gray-300">{branch}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold transition disabled:opacity-50"
          >
            {loading ? "Posting Job..." : "Post Job Drive"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default PostJob;
