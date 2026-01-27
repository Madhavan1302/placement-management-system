import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <h2>Student Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default StudentDashboard;
