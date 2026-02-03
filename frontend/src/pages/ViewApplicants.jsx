import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";

const ViewApplicants = () => {
  const { companyId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/applications/company/${companyId}`)
      .then((res) => setApplications(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [companyId]);

  const updateStatus = async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}/status`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <AdminNavbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Applicants</h1>

        {loading && <p>Loading applicants...</p>}

        {!loading && applications.length === 0 && (
          <p className="text-gray-400">No applicants yet.</p>
        )}

        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-[#111827] border border-[#1F2937] rounded-xl p-6"
            >
              <div className="flex items-center gap-6">
                <img
                  src={app.student.profilePhoto || "/default-avatar.png"}
                  className="w-16 h-16 rounded-full border border-purple-500"
                  alt="profile"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {app.student.user?.name}
                  </h2>
                  <p className="text-gray-400">
                    {app.student.regNo} • {app.student.branch} • CGPA{" "}
                    {app.student.cgpa}
                  </p>
                  <p className="text-sm text-purple-400">
                    Skills: {app.student.skills.join(", ")}
                  </p>

                  <a
                    href={app.student.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-400 underline"
                  >
                    View Resume
                  </a>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm capitalize text-gray-300">
                    Status:{" "}
                    <span className="text-purple-400">
                      {app.status}
                    </span>
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateStatus(app._id, "shortlisted")
                      }
                      className="px-3 py-1 bg-yellow-600 rounded"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(app._id, "selected")
                      }
                      className="px-3 py-1 bg-green-600 rounded"
                    >
                      Select
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(app._id, "rejected")
                      }
                      className="px-3 py-1 bg-red-600 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewApplicants;
