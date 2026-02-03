import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-[#0B0B14] text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-12 py-6">
        <h1 className="text-2xl font-bold">
          Placement<span className="text-purple-500">Portal</span>
        </h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-16 px-12 py-24 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl font-extrabold leading-tight">
            Launch Your Career <br />
            <span className="text-purple-500">With Confidence</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-lg">
            A centralized placement management platform to help students apply,
            track, and secure opportunities — and help admins manage the entire
            process efficiently.
          </p>

          <div className="flex gap-4">
            <Link to="/register" className="btn-primary px-6 py-3">
              Join as Student
            </Link>
            <Link
              to="/login"
              className="border border-purple-500 px-6 py-3 rounded-lg hover:bg-purple-500/10 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
            className="rounded-xl shadow-2xl"
            alt="Career growth"
          />
          <div className="absolute inset-0 bg-purple-600/10 rounded-xl"></div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-12 py-20 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Smart Eligibility",
            desc: "Students apply only to companies they are eligible for."
          },
          {
            title: "Real-time Status",
            desc: "Track applications as applied, shortlisted, or rejected."
          },
          {
            title: "Admin Control",
            desc: "Admins manage companies, students, and applications easily."
          }
        ].map((f, i) => (
          <div key={i} className="card">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="px-12 py-20 bg-[#0E0E1A]">
        <h3 className="text-3xl font-bold mb-12 text-center">
          How It Works
        </h3>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h4 className="text-purple-400 font-semibold mb-2">
              1. Register
            </h4>
            <p className="text-gray-400">
              Students and admins create accounts.
            </p>
          </div>
          <div>
            <h4 className="text-purple-400 font-semibold mb-2">
              2. Apply & Manage
            </h4>
            <p className="text-gray-400">
              Students apply, admins review applications.
            </p>
          </div>
          <div>
            <h4 className="text-purple-400 font-semibold mb-2">
              3. Track Results
            </h4>
            <p className="text-gray-400">
              View application status in real time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-12 py-24 text-center">
        <h3 className="text-4xl font-bold mb-6">
          Ready to Get Placed?
        </h3>
        <Link to="/register" className="btn-primary px-8 py-4 text-lg">
          Get Started Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1F2937] px-12 py-8 text-gray-400 flex justify-between">
        <p>© 2026 PlacementPortal</p>
        <p>Built with MERN Stack</p>
      </footer>
    </div>
  );
};

export default Landing;
