import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0B0B14] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          Placement<span className="text-purple-500">Portal</span>
        </h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-semibold shadow-lg transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center px-8 md:px-20 py-20 gap-16">
        {/* Left */}
        <div className="md:w-1/2 space-y-8 animate-fadeIn">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Launch Your Career <br />
            <span className="text-purple-500">With Confidence</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-xl">
            A premium placement management platform to apply, track, and secure
            opportunities from top companies — all in one place.
          </p>

          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-purple-600 px-7 py-3 rounded-lg font-semibold hover:scale-105 transition shadow-purple-500/30 shadow-xl"
            >
              Join as Student
            </Link>

            <Link
              to="/login"
              className="border border-purple-500 px-7 py-3 rounded-lg hover:bg-purple-600 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center items-center relative animate-slideUp">
          {/* Glow */}
          <div className="absolute w-72 h-72 bg-purple-600/30 rounded-full blur-3xl"></div>

          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
            alt="Career Growth"
            className="relative  z-10 max-w-md w-full rounded-xl shadow-2xl object-cover"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-8 md:px-20 py-20 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Smart Eligibility",
            desc: "Apply only to companies you qualify for.",
          },
          {
            title: "Real-time Status",
            desc: "Track applied, shortlisted & rejected jobs.",
          },
          {
            title: "Admin Control",
            desc: "Manage drives, students & applications.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 hover:border-purple-500 transition"
          >
            <h3 className="text-xl font-bold mb-2 text-purple-400">
              {f.title}
            </h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Landing;
