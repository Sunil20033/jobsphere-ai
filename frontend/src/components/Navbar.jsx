import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-2" to="/">
          💼 JobSphere
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">

            <li className="nav-item mx-2">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <NavLink className="nav-link" to="/jobs">
                View Jobs
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <NavLink
                className="btn btn-primary rounded-pill ms-3 px-4"
                to="/add"
              >
                + Add Job
              </NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;