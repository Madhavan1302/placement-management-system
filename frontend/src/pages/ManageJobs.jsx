import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs"); // Admin gets ALL jobs
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
        await api.post(`/jobs/${id}/status`, { status });
        // Update local state
        setJobs(jobs.map(job => job._id === id ? { ...job, approvalStatus: status } : job));
        alert(`Job ${status} successfully`);
    } catch (err) {
        alert("Failed to update status");
        console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <AdminNavbar />

      <div className="px-10 py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Job Drives</h1>

        {loading ? (
          <p>Loading drives...</p>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 shadow-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <p className="text-gray-400 text-sm">
                    {job.company?.name} • {job.location} • {new Date(job.driveDate).toDateString()}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                      Posted By: {job.postedBy ? "User " + job.postedBy : "System"}
                  </div>
                  <div className="mt-2">
                      <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${
                          job.approvalStatus === 'approved' ? 'bg-green-900 text-green-400' :
                          job.approvalStatus === 'rejected' ? 'bg-red-900 text-red-400' :
                          'bg-yellow-900 text-yellow-400'
                      }`}>
                          {job.approvalStatus}
                      </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {job.approvalStatus === 'pending' && (
                    <>
                      <button 
                        onClick={() => updateStatus(job._id, 'approved')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => updateStatus(job._id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
