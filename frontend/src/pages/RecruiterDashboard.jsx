import RecruiterNavbar from "../components/RecruiterNavbar";

const RecruiterDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <RecruiterNavbar />

      <div className="p-10 space-y-8">
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
        <p className="text-gray-400">
          Manage your job postings and view applicants.
        </p>

        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            Welcome, Recruiter!
          </h2>
          <p className="text-gray-300 mb-6">
            You can post new job drives or manage existing applications.
          </p>
          
          <button 
            onClick={() => window.location.href = '/recruiter/post-job'}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-bold transition">
             Post a New Job Drive
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
