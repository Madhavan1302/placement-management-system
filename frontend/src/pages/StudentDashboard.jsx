import { useEffect, useState } from "react";
import api from "../api/axios";
import StudentNavbar from "../components/StudentNavbar";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    applied: 0,
    shortlisted: 0,
    rejected: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/students/profile").then((res) => setProfile(res.data));

    api.get("/applications/my").then((res) => {
      const apps = res.data;
      setStats({
        applied: apps.length,
        shortlisted: apps.filter(a => a.status === "shortlisted").length,
        rejected: apps.filter(a => a.status === "rejected").length,
      });
    });
  }, []);

  return (
    <div className="bg-[#0B0B14] min-h-screen text-white">
      <StudentNavbar />

      <div className="px-10 py-8 space-y-8">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>

        {/* PROFILE SUMMARY */}
        {profile ? (
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 flex items-center gap-6">
            <img
              src={profile.profilePhoto || "/default-avatar.png"}
              className="w-20 h-20 rounded-full border-2 border-purple-500"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-semibold">
                {profile.user?.name}
              </h2>
              <p className="text-gray-400">
                {profile.regNo} • {profile.branch} • CGPA {profile.cgpa}
              </p>
              <p className="text-purple-400 text-sm">
                Skills: {profile.skills?.join(", ")}
              </p>
            </div>

            <button
              onClick={() => navigate("/student/profile")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="bg-purple-600/10 border border-purple-500/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-purple-400 mb-2">Complete Your Profile</h2>
            <p className="text-gray-400 mb-6">You need to set up your profile before you can apply for job drives.</p>
            <button
              onClick={() => navigate("/student/profile")}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-purple-500/20"
            >
              Set Up Profile Now
            </button>
          </div>
        )}

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard title="Applied" value={stats.applied} />
          <StatCard title="Shortlisted" value={stats.shortlisted} />
          <StatCard title="Rejected" value={stats.rejected} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
    <p className="text-gray-400">{title}</p>
    <h3 className="text-3xl font-bold text-purple-400">{value}</h3>
  </div>
);

export default StudentDashboard;
