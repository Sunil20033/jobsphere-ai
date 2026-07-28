import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <NavLink className="navbar-brand fw-bold fs-3" to="/">
          💼 JobSphere
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold" : "nav-link"
                }
              >
                View Jobs
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold" : "nav-link"
                }
              >
                Add Job
              </NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;