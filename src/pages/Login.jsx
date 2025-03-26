import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg text-center" style={{ width: "400px", borderRadius: "15px" }}>
        <div className="card-body">
          <h2 className="mb-4 text-primary">Welcome to Traffic Offense Manager</h2>
          <p className="text-muted mb-4">Please select your role to continue</p>
          <div className="d-grid gap-3">
            <Link
              to="/admin-login"
              className="btn btn-primary btn-lg py-2"
              style={{ borderRadius: "10px" }}
            >
              Admin Login
            </Link>
            <Link
              to="/officer-login"
              className="btn btn-outline-secondary btn-lg py-2"
              style={{ borderRadius: "10px" }}
            >
              Traffic Officer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;