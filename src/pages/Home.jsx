import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
          TRAFFIC <span className="text-blue-600">OFFENCE</span> MANAGER
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto">
          A system for logging traffic offenses, assigning penalty points, and ensuring better road safety.
        </p>

        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow transition-all duration-300"
        >
          Get Started →
        </Link>

        {/* Optional Add-ons for Visual Appeal */}
        <div className="mt-10 space-y-2 text-sm text-gray-400">
          <p>Designed for Zimbabwean traffic management needs</p>
          <p className="italic">Helping make the roads safer.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
