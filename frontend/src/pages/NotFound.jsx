import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <h1 className="display-1 fw-bold text-danger"><i className="bi bi-exclamation-triangle-fill text-danger display-1"></i>404</h1>

      <h2 className="mb-3">Page Not Found</h2>

      <p className="text-muted text-center">
        Sorry! The page you are looking for doesn't exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;