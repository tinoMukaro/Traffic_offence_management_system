import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="container text-center">
        <h1 className="display-3 fw-bold">
          TRAFFIC <span className="text-primary">OFFENCE</span> MANAGER
        </h1>
        <p className="lead text-muted w-75 mx-auto">
          A system for logging traffic offenses, assigning penalty points, and ensuring better road safety.
        </p>
        <Link to="/login" className="btn btn-primary btn-lg mt-4 px-5 py-3 shadow-sm fw-semibold" style={{ transition: "0.3s ease-in-out", borderRadius: "10px" }}>
          Get Started →
        </Link>
      </div>
    </div>
  );
};

export default Home;
