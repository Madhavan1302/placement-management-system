import { useEffect, useState } from "react";
import api from "../api/axios";
import StudentNavbar from "../components/StudentNavbar";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const [form, setForm] = useState({
    regNo: "",
    branch: "",
    batch: "",
    cgpa: "",
    skills: "",
    resumeUrl: "",
    profilePhoto: "",
  });

  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState(""); 
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get("/students/profile")
      .then((res) => {
        if (res.data) {
          setForm({
            regNo: res.data.regNo || "",
            branch: res.data.branch || "",
            batch: res.data.batch || "",
            cgpa: res.data.cgpa || "",
            skills: res.data.skills?.join(", ") || "",
            resumeUrl: res.data.resumeUrl || "",
            profilePhoto: res.data.profilePhoto || "",
          });

          setStudentName(res.data.user?.name || ""); 
          setIsEdit(true);
        }
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          console.log("Profile doesn't exist yet.");
          setIsEdit(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/students/profile", form); 
      alert(isEdit ? "Profile updated successfully" : "Profile created successfully");
      navigate("/student");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to save profile. Ensure all fields are valid.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B14] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <StudentNavbar />

      <div className="max-w-2xl mx-auto mt-10 bg-[#111827] border border-[#1F2937] rounded-xl p-8 mb-10 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
          {isEdit ? "Update Your Profile" : "Create Your Profile"}
        </h1>

        {/* PROFILE PHOTO + NAME */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={form.profilePhoto || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-purple-500 object-cover shadow-lg"
          />

          {/* 👇 STUDENT NAME */}
          <h2 className="mt-4 text-xl font-semibold">
            {studentName}
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Profile photo is optional
          </p>
        </div>

        {message && <p className="text-red-400 mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="regNo"
            placeholder="Register Number"
            value={form.regNo}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#1F2937] rounded outline-none"
          />

          <input
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#1F2937] rounded outline-none"
          />

          <input
            name="cgpa"
            placeholder="CGPA"
            value={form.cgpa}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#1F2937] rounded outline-none"
          />

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#1F2937] rounded outline-none"
          />

          <input
            name="batch"
            placeholder="Batch (e.g. 2025)"
            value={form.batch}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#1F2937] rounded outline-none"
          />

          <input
            name="resumeUrl"
            placeholder="Resume URL"
            value={form.resumeUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#1F2937] rounded outline-none"
          />

          <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-semibold">
            {isEdit ? "Update Profile" : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};


export default StudentProfile;
