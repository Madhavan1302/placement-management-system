import { useEffect, useState } from "react";
import api from "../api/axios";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedCompanies, setAppliedCompanies] = useState([]);

  useEffect(() => {
    api
      .get("/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const applyToCompany = async (companyId) => {
    try {
      await api.post("/applications/apply", { companyId });
      setAppliedCompanies([...appliedCompanies, companyId]);
    } catch (error) {
      alert(error.response?.data?.message || "Apply failed");
    }
  };

  if (loading) return <p>Loading companies...</p>;

  return (
    <div>
      <div
        key={company._id}
        className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 
             hover:border-purple-500 transition shadow-lg"
      >
        <h3 className="text-xl font-bold text-white">{company.name}</h3>
        <p className="text-gray-400">{company.role}</p>

        <div className="mt-3 text-sm text-gray-300 space-y-1">
          <p>🎓 Min CGPA: {company.minCgpa}</p>
          <p>💰 Package: ₹{company.package}</p>
        </div>

        <button
          disabled={appliedCompanies.includes(company._id)}
          className={`mt-4 w-full py-2 rounded-lg font-semibold transition
      ${
        appliedCompanies.includes(company._id)
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-purple-600 hover:bg-purple-700"
      }
    `}
        >
          {appliedCompanies.includes(company._id) ? "Applied ✓" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default CompanyList;
