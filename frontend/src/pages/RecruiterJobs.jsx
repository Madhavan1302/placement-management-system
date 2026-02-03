import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import RecruiterNavbar from "../components/RecruiterNavbar";
import { useAuth } from "../context/AuthContext";

const RecruiterJobs = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.company) {
            const companyId = typeof user.company === 'object' ? user.company._id : user.company;
            api.get(`/jobs/company/${companyId}`)
                .then(res => setJobs(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-[#0B0B14] text-white">
            <RecruiterNavbar />
            
            <div className="p-10">
                <h1 className="text-3xl font-bold mb-6 text-purple-400">Your Job Drives</h1>

                {loading ? (
                    <p>Loading jobs...</p>
                ) : jobs.length === 0 ? (
                    <div className="text-gray-400">
                        <p>No jobs posted yet. </p>
                        <Link to="/recruiter/post-job" className="text-purple-400 underline">Post your first drive</Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {jobs.map(job => (
                            <div key={job._id} className="bg-[#111827] border border-[#1F2937] p-6 rounded-xl flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">{job.title}</h2>
                                    <p className="text-gray-400">{job.driveDate ? new Date(job.driveDate).toLocaleDateString() : 'Date TBD'}</p>
                                    <p className="text-sm text-gray-500">{job.location} • {job.package}</p>
                                </div>
                                <div className="flex gap-4">
                                     <Link 
                                        to={`/recruiter/job/${job._id}/applicants`}
                                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-semibold transition"
                                     >
                                        View Applicants
                                     </Link>
                                     <button className="text-red-400 hover:text-red-300">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterJobs;
