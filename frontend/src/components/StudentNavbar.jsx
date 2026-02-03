import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";

const StudentNavbar = () => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/students/profile")
      .then((res) => {
        if (res.data?.profilePhoto) {
          setProfilePhoto(res.data.profilePhoto);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex justify-between items-center">
      {/* LEFT */}
      <h1 className="text-xl font-bold text-purple-400">Placement Portal</h1>

      {/* CENTER LINKS */}
      <div className="flex gap-6 text-gray-300">
        <NavLink
          to="/student"
          className={({ isActive }) =>
            isActive ? "text-purple-400 font-semibold" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/student/companies" 
          className={({isActive})=>
            isActive?"text-purple-400 font-semibold" : ""}
        >
        Companies
        </NavLink>

        <NavLink
          to="/student/applications"
          className={({ isActive }) =>
            isActive ? "text-purple-400 font-semibold" : ""
          }
        >
          My Applications
        </NavLink>

        <NavLink
          to="/student/profile"
          className={({ isActive }) =>
            isActive ? "text-purple-400 font-semibold" : ""
          }
        >
          Profile
        </NavLink>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <img
          src={profilePhoto || "/default-avatar.png"}
          alt="Profile"
          className="w-9 h-9 rounded-full border border-purple-500 object-cover"
        />
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-red-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;
