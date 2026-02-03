# Placement Management System

A comprehensive MERN-stack placement portal designed for educational institutions. It features multi-tenancy (college-based isolation), role-based dashboards, and automated recruitment workflows.

## 🚀 Key Features

- **Multi-Tenancy**: Data isolation by college. Students only see drives related to their institution, and admins manage their own college's data.
- **Role-Based Access**: Specialized dashboards for Students, College Admins, and Recruiters.
- **Drive Management**: Recruiters can post job drives, and Admins can approve or reject them.
- **Student Profiles**: Dynamic profile creation with resume and photo support (via Cloudinary).
- **Application Tracking**: Students can track their application status (Applied, Shortlisted, Rejected).
- **Statistics & Analytics**: Real-time placement statistics with company-wise performance and drive counts.

## 💻 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **Storage**: Cloudinary (for resumes and profile photos)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary account

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder (if using custom ports):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `backend/`: Express API with controllers, models, and routes.
- `frontend/`: React application with Tailwind CSS and Vite.

## 🔒 Multi-Tenancy Logic

This system enforces strict college-based isolation:
- **Registration**: All users (Students and Admins) must select their college during sign-up.
- **Job Drives**: Recruiters post drives for specific colleges (or their assigned college).
- **Filtering**: All statistics, student lists, and job listings are automatically filtered by the logged-in user's college ID.

---

Built with ❤️ for better campus placements.
