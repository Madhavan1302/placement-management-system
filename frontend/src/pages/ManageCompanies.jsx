import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    website: "",
    location: "",
    description: ""
  });

  const fetchCompanies = () => {
    api.get("/companies").then(res => setCompanies(res.data));
  };

  useEffect(fetchCompanies, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createCompany = async e => {
    e.preventDefault();

    await api.post("/companies", form);

    setForm({
      name: "",
      website: "",
      location: "",
      description: ""
    });

    fetchCompanies();
  };

  const deleteCompany = async id => {
    await api.delete(`/companies/${id}`);
    fetchCompanies();
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <AdminNavbar />

      <div className="p-10 space-y-8">
        <h1 className="text-3xl font-bold">Manage Companies</h1>

        {/* CREATE COMPANY */}
        <form
          onSubmit={createCompany}
          className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 grid md:grid-cols-2 gap-4"
        >
          <input name="name" placeholder="Company Name" onChange={handleChange} value={form.name}
            className="input" />
          <input name="website" placeholder="Website URL" onChange={handleChange} value={form.website}
            className="input" />
          <input name="location" placeholder="Location" onChange={handleChange} value={form.location}
            className="input" />
          <input name="description" placeholder="Description" onChange={handleChange} value={form.description}
            className="input md:col-span-2" />
          
          <button className="bg-purple-600 py-2 rounded-lg col-span-2 font-semibold hover:bg-purple-700 transition">
            Add Company
          </button>
        </form>

        {/* COMPANY LIST */}
        <div className="grid md:grid-cols-2 gap-6">
          {companies.map(c => (
            <div key={c._id}
              className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
              <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{c.name}</h3>
                    <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 text-sm hover:underline">{c.website}</a>
                    <p className="text-gray-400 text-sm mt-1">{c.location}</p>
                    <p className="text-gray-300 mt-2">{c.description}</p>
                  </div>
                  <button
                    onClick={() => deleteCompany(c._id)}
                    className="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-3 py-1 rounded transition text-sm"
                  >
                    Delete
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCompanies;
