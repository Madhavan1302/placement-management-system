import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

import StudentDashboard from "../pages/StudentDashboard";
import StudentProfile from "../pages/StudentProfile";
import MyApplications from "../pages/MyApplications";
import CompanyList from "../pages/CompanyList";
import AdminDashboard from "../pages/AdminDashboard";
import ManageCompanies from "../pages/ManageCompanies";
import ManageJobs from "../pages/ManageJobs";
import ViewApplicants from "../pages/ViewApplicants";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import PostJob from "../pages/PostJob";
import RecruiterJobs from "../pages/RecruiterJobs";
import JobApplicants from "../pages/JobApplicants";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ========== STUDENT ROUTES ========== */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/applications"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/companies"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CompanyList />
            </ProtectedRoute>
          }
        />

        {/* ========== RECRUITER ROUTES ========== */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/post-job"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/applications"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/job/:jobId/applicants"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <JobApplicants />
            </ProtectedRoute>
          }
        />

        {/* ========== ADMIN ROUTES ========== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageCompanies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageJobs />
            </ProtectedRoute>
          }
        />
        <Route
        path = "/admin/applications"

        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ViewApplicants />
          </ProtectedRoute>
        }
      />
        <Route
          path="/admin/applicants/:companyId"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ViewApplicants />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
