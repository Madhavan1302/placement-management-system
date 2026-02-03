import { useEffect, useState } from "react";
import api from "../api/axios";
import StudentNavbar from "../components/StudentNavbar";

const statusColors = {
  applied: "bg-blue-900/40 text-blue-400",
  shortlisted: "bg-yellow-900/40 text-yellow-400",
  selected: "bg-green-900/40 text-green-400",
  rejected: "bg-red-900/40 text-red-400",
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/applications/my")
      .then((res) => setApplications(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <StudentNavbar />

      <div className="px-10 py-8">
        <h1 className="text-3xl font-bold mb-2">My Applications</h1>
        <p className="text-gray-400 mb-8">
          Track the status of companies you have applied for
        </p>

        {loading && <p>Loading applications...</p>}

        {!loading && applications.length === 0 && (
          <p className="text-gray-400">
            You have not applied to any companies yet.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">
                    {app.job?.company?.name || "Company"}
                  </h2>
                  <p className="text-gray-400">
                    {app.job?.title || "Job Role"}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full capitalize ${
                    statusColors[app.status]
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <p>🎓 Min CGPA: {app.job?.minCgpa}</p>
                <p>
                  🏫 Branches:{" "}
                  {app.job?.allowedBranches?.join(", ")}
                </p>
                <p>💰 Package: ₹{app.job?.package}</p>
                
                {/* TIMELINE */}
                <div className="pt-3 border-t border-gray-700 mt-3">
                    <p className="text-xs text-gray-400">
                        📅 Applied on: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                    {app.updatedAt !== app.createdAt && (
                         <p className="text-xs text-gray-400">
                            🔄 Last Updated: {new Date(app.updatedAt).toLocaleDateString()}
                         </p>
                    )}
                </div>
              </div>

              {/* STATUS MESSAGE */}
              <div className="mt-4 text-sm">
                {app.status === "applied" && (
                  <p className="text-blue-400">
                    ⏳ Application under review
                  </p>
                )}
                {app.status === "shortlisted" && (
                  <p className="text-yellow-400">
                    ⭐ You are shortlisted! Prepare for next round
                  </p>
                )}
                {app.status === "selected" && (
                  <p className="text-green-400">
                    🎉 Congratulations! You are selected
                  </p>
                )}
                {app.status === "rejected" && (
                  <p className="text-red-400">
                    ❌ Unfortunately, not selected
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
