import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";
import StudentNavbar from "../components/StudentNavbar";

const CompanyList = () => {
  const [jobs, setJobs] = useState([]);
  const [student, setStudent] = useState(null);
  const [appliedIds, setAppliedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔎 FILTER STATES
  const [search, setSearch] = useState("");
  const [minCgpa, setMinCgpa] = useState(0);
  const [branch, setBranch] = useState("ALL");
  const [eligibleOnly, setEligibleOnly] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch jobs (should work regardless of profile)
        const jobsData = await api.get("/jobs").then(res => res.data).catch(err => {
          console.error("Failed to fetch jobs", err);
          return [];
        });
        setJobs(jobsData);

        // Fetch profile (may 404 if missing)
        try {
          const profileRes = await api.get("/students/profile");
          setStudent(profileRes.data);
        } catch (err) {
          console.log("No student profile found or failed to load");
          setStudent(null);
        }

        // Fetch applications (may 400 if profile missing)
        try {
          const appRes = await api.get("/applications/my");
          // Safety check for job reference
          setAppliedIds(appRes.data.filter(a => a.job).map(a => a.job._id));
        } catch (err) {
          console.log("Failed to fetch applications (likely no profile)");
          setAppliedIds([]);
        }
      } catch (err) {
        console.error("Unexpected error in loadData", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const apply = async (jobId) => {
    try {
      await api.post("/applications/apply", { jobId });
      setAppliedIds([...appliedIds, jobId]);
    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    }
  };

  // 🔹 GET UNIQUE BRANCHES FROM JOBS
  const allBranches = [
    "ALL",
    ...new Set(jobs.flatMap(j => j.allowedBranches || [])),
  ];

  // 🔹 FILTER LOGIC
  const filteredJobs = jobs.filter((job) => {
    const companyName = job.company?.name || "Unknown Company";
    const jobTitle = job.title || "Untitled Role";
    const allowedBranches = job.allowedBranches || [];

    const matchesSearch =
      companyName.toLowerCase().includes(search.toLowerCase()) ||
      jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesCgpa = (job.minCgpa || 0) >= minCgpa;

    const matchesBranch =
      branch === "ALL" || allowedBranches.includes(branch);

    const eligible =
      student &&
      (student.cgpa || 0) >= (job.minCgpa || 0) &&
      allowedBranches.includes(student.branch);

    if (eligibleOnly && !eligible) return false;

    return matchesSearch && matchesCgpa && matchesBranch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B14] text-white">
        <StudentNavbar />
        <p className="p-10">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <StudentNavbar />

      <div className="px-10 py-8">
        <h1 className="text-3xl font-bold mb-2">Available Drives</h1>
        <p className="text-gray-400 mb-6">
          Search and filter jobs based on eligibility
        </p>

        {/* ⚠️ MISSING PROFILE ALERT */}
        {!student && (
          <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 mb-8 flex justify-between items-center">
            <p className="text-yellow-400">
              <span className="font-bold">Notice:</span> You haven't completed your profile yet. We cannot determine your eligibility for these drives.
            </p>
            <button 
              onClick={() => navigate("/student/profile")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition"
            >
              Finish Profile
            </button>
          </div>
        )}

        {/* 🔎 FILTER BAR */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <input
            placeholder="Search company or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-[#1F2937] rounded outline-none"
          />

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="px-4 py-2 bg-[#1F2937] rounded outline-none"
          >
            {allBranches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={minCgpa}
            onChange={(e) => setMinCgpa(Number(e.target.value))}
            className="px-4 py-2 bg-[#1F2937] rounded outline-none"
            placeholder="Min CGPA"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={eligibleOnly}
              onChange={() => setEligibleOnly(!eligibleOnly)}
            />
            Eligible only
          </label>
        </div>

        {/* 🏢 JOB CARDS */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredJobs.map((job) => {
            const alreadyApplied = appliedIds.includes(job._id);

            const allowedBranches = job.allowedBranches || [];
            const eligible =
              student &&
              (student.cgpa || 0) >= (job.minCgpa || 0) &&
              allowedBranches.includes(student.branch);

            return (
              <div
                key={job._id}
                className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 shadow-lg hover:border-purple-500 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{job.company?.name || "Unknown Company"}</h2>
                    <p className="text-purple-400 font-medium">{job.title || "Untitled Role"}</p>
                    <p className="text-gray-500 text-sm">{job.location || "Location Not Specified"}</p>
                  </div>

                  {alreadyApplied && (
                    <span className="text-xs bg-green-900/40 text-green-400 px-3 py-1 rounded-full">
                      Applied
                    </span>
                  )}

                  {!eligible && !alreadyApplied && (
                    <span className="text-xs bg-red-900/40 text-red-400 px-3 py-1 rounded-full">
                      Not Eligible
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-sm text-gray-300">
                  <p>🎓 Min CGPA: {job.minCgpa ?? "N/A"}</p>
                  <p>🏫 Allowed: {job.allowedBranches?.join(", ") || "None specified"}</p>
                  <p>💰 Package: {job.package || "Not disclosed"}</p>
                  <p>📅 Date: {job.driveDate ? new Date(job.driveDate).toLocaleDateString() : "TBD"}</p>
                </div>
                
                <p className="text-gray-400 text-sm mt-3 line-clamp-2">{job.description}</p>

                {!eligible && (
                  <p className="text-red-400 text-sm mt-3">
                    ❌ Eligibility criteria not met (Need {job.minCgpa} CGPA in {job.allowedBranches.join("/")})
                  </p>
                )}

                <button
                  disabled={alreadyApplied || !eligible}
                  onClick={() => apply(job._id)}
                  className={`mt-5 w-full py-2 rounded-lg font-semibold
                    ${
                      alreadyApplied
                        ? "bg-gray-600 cursor-not-allowed"
                        : !eligible
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                    }
                  `}
                >
                  {alreadyApplied
                    ? "Applied ✓"
                    : !eligible
                    ? "Not Eligible"
                    : "Apply Now"}
                </button>
              </div>
            );
          })}
        </div>

        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No drives match your filters
          </p>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
