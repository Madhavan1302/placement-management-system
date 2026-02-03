import { useEffect, useState } from "react";
import api from "../api/axios";

const ApplicationStatus = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get("/applications/my").then(res => setApps(res.data));
  }, []);

  if (!apps.length)
    return <p className="text-white p-6">No applications yet.</p>;

  return (
    <div className="p-6 bg-[#0B0B14] min-h-screen text-white">
      <h2 className="text-2xl text-purple-500 mb-4">My Applications</h2>

      {apps.map(a => (
        <div key={a._id} className="bg-[#111827] p-4 mb-3 rounded">
          <h3>{a.company.name}</h3>
          <p>Status: <b>{a.status}</b></p>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStatus;
