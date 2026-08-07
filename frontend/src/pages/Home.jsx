import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import { formatSalary } from "../utils/formatSalary";

function Home() {
  const [stats, setStats] = useState({
    
    totalJobs: 0,
    totalCompanies: 0,
    totalLocations: 0,
  });
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const response = await getJobs();
      const jobs = response.data;
      setRecentJobs(jobs.slice(-5).reverse());

      const companies = new Set(jobs.map((job) => job.company));
      const locations = new Set(jobs.map((job) => job.location));

      setStats({
        totalJobs: jobs.length,
        totalCompanies: companies.size,
        totalLocations: locations.size,
      });
    } catch (error) {
      console.error("Failed to load statistics", error);
    }
  };

  return (
    <div className="container mt-5">

      <section className="hero-section text-center">

        <div className="container">

          <span className="badge bg-primary px-3 py-2 mb-3">
            Full Stack Job Portal
          </span>

          <h1 className="display-3 fw-bold mb-3">
            Find & Manage Your Dream Career
          </h1>

          <p className="lead text-light mb-4">
            A modern Job Management System built with
            <strong> React</strong>,
            <strong> Spring Boot</strong> &
            <strong> MySQL</strong>.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">

            <Link
              to="/jobs"
              className="btn btn-light btn-lg px-4"
            >
              Browse Jobs
            </Link>

            <Link
              to="/add"
              className="btn btn-outline-light btn-lg px-4"
            >
              Post a Job
            </Link>

          </div>

        </div>

      </section>

      <div className="row">

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card stat-card border-0 h-100">

          <div className="card-body text-center">

              <div className="stat-icon bg-primary">
                  <i className="bi bi-briefcase-fill"></i>
              </div>

              <h5 className="mt-4 text-muted">
                  Total Jobs
              </h5>

              <h1 className="fw-bold text-primary">
                  {stats.totalJobs}
              </h1>

              <p className="text-secondary">
                  Available job opportunities.
              </p>

              <Link
                  to="/jobs"
                  className="btn btn-primary rounded-pill px-4"
              >
                  View Jobs
              </Link>

          </div>

      </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card stat-card border-0 h-100">

            <div className="card-body text-center">

                <div className="stat-icon bg-success">
                    <i className="bi bi-building-fill"></i>
                </div>

                <h5 className="mt-4 text-muted">
                    Companies
                </h5>

                <h1 className="fw-bold text-primary">
                    {stats.totalCompanies}
                </h1>

                <p className="text-secondary">
                    Companies currently hiring.
                </p>

                <Link
                    to="/jobs"
                    className="btn btn-success rounded-pill px-4"
                >
                    Explore
                </Link>
            </div>
         </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card stat-card border-0 h-100">

              <div className="card-body text-center">

                  <div className="stat-icon bg-warning">
                      <i className="bi bi-geo-alt-fill"></i>
                  </div>

                  <h5 className="mt-4 text-muted">
                      Locations
                  </h5>

                  <h1 className="fw-bold text-primary">
                      {stats.totalLocations}
                  </h1>

                  <p className="text-secondary">
                      Available job locations.
                  </p>

                  <Link
                      to="/jobs"
                      className="btn btn-warning rounded-pill px-4"
                  >
                    Browse
                  </Link>

              </div>

          </div>
        </div>
      </div>

      <div className="text-center mt-5 mb-4">

          <h2 className="fw-bold">
              ⚡ Quick Actions
          </h2>

          <p className="text-muted">
              Quickly navigate to the most commonly used features.
          </p>

      </div>
      <div className="row mt-5 g-4">

        <div className="col-md-6 mb-4">
          <div className="card dashboard-card h-100 text-center h-100">
            <div className="card-body">
              <h1><i className="bi bi-file-earmark-plus-fill"></i></h1>
              <h4>Add New Job</h4>
              <p>Create a new job opening.</p>
              <Link to="/add" className="btn btn-success">
                Add Job
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card dashboard-card h-100 text-center h-100">
            <div className="card-body">
              <h1><i className="bi bi-kanban-fill"></i></h1>
              <h4>Manage Jobs</h4>
              <p>Edit, search, sort and delete jobs.</p>
              <Link to="/jobs" className="btn btn-warning">
                Manage Jobs
              </Link>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-5">

  <div className="card shadow">

      <div className="card-header bg-primary text-white">

          <h4 className="mb-0">
              <i className="bi bi-stars me-2"></i>

              Latest Opportunities
          </h4>

      </div>

    <div className="card-body">

      {recentJobs.length === 0 ? (

        <p className="text-muted text-center">
          No jobs available.
        </p>

      ) : (

        <table className="table table-hover">

          <thead>

            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Salary</th>
            </tr>

          </thead>

          <tbody>

            {recentJobs.map((job) => (

              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>₹ {formatSalary(job.salary)}</td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

      <div className="text-center mt-3">

        <Link
          to="/jobs"
          className="btn btn-primary"
        >
          View All Jobs
        </Link>

      </div>

    </div>

  </div>

</div>
      <div className="mt-5">
        <div className="card shadow">
          <div className="card-body">
            <h3>About JobSphere</h3>
            <p>
              JobSphere is a full-stack Job Management System developed using
              React, Spring Boot, and MySQL. It enables users to add, view,
              update, delete, search, and sort job listings through a modern,
              responsive, and user-friendly interface.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;