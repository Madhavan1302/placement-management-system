import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#0B0B14] text-white">
        <AdminNavbar />
        <p className="p-10">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <AdminNavbar />

      <div className="p-10 space-y-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400">
          Manage companies & monitor applications
        </p>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard title="Students" value={stats.totalStudents} />
          <StatCard title="Companies" value={stats.totalCompanies} />
          <StatCard title="Applications" value={stats.totalApplications} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <StatCard title="Shortlisted" value={stats.shortlisted} color="green" />
          <StatCard title="Rejected" value={stats.rejected} color="red" />
          <StatCard title="Selected" value={stats.selected} color="purple" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color = "purple" }) => (
  <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
    <p className="text-gray-400">{title}</p>
    <h3 className={`text-3xl font-bold text-${color}-400`}>
      {value}
    </h3>
  </div>
);

export default AdminDashboard;
