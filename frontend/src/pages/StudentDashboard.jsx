import Navbar from "../components/Navbar";
import CompanyList from "./CompanyList";

const StudentDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <CompanyList />
      </div>
    </>
  );
};

export default StudentDashboard;
