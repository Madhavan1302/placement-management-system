import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RecruiterNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-purple-400 font-semibold"
      : "text-gray-300 hover:text-purple-400 transition";

  return (
    <nav className="bg-[#0B0B14] border-b border-[#1F2937] px-8 py-4 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex items-center gap-10">
        <h1 className="text-xl font-bold text-purple-500">
          Placement Portal
        </h1>
      </div>
      <div className="flex gap-6">
        <NavLink to="/recruiter" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/recruiter/applications" className={linkClass}>
          View Applications
        </NavLink>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-300">
          <div className="w-8 h-8 rounded-full border border-purple-500 flex items-center justify-center">
            🏢
          </div>
          <span className="text-sm">Recruiter</span>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-lg text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default RecruiterNavbar;
