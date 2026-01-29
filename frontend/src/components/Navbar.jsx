import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#0B0B14] border-b border-[#1F2937] px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-purple-500">PlacementPortal</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-400 capitalize">{role}</span>
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
