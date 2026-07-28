import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";

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

      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to JobSphere</h1>
        <p className="lead text-muted">
          A Job Management System built using React, Spring Boot and MySQL.
        </p>
      </div>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center h-100 border-primary">
            <div className="card-body">
              <h1><i className="bi bi-clipboard-data text-primary"></i></h1>
              <h4>Total Jobs</h4>
              <h2 className="text-primary fw-bold">{stats.totalJobs}</h2>
              <p>Manage all available jobs.</p>
              <Link to="/jobs" className="btn btn-primary">
                View Jobs
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center h-100 border-success">
            <div className="card-body">
              <h1><i className="bi bi-building text-success"></i></h1>
              <h4>Companies</h4>
              <h2 className="text-success fw-bold">
                {stats.totalCompanies}
              </h2>
              <p>Companies currently hiring.</p>
              <Link to="/jobs" className="btn btn-success">
                Explore
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center h-100 border-warning">
            <div className="card-body">
              <h1><i className="bi bi-geo-alt text-warning"></i></h1>
              <h4>Locations</h4>
              <h2 className="text-warning fw-bold">
                {stats.totalLocations}
              </h2>
              <p>Available job locations.</p>
              <Link to="/jobs" className="btn btn-warning">
                Browse
              </Link>
            </div>
          </div>
        </div>

      </div>

      <div className="row mt-2">

        <div className="col-md-6 mb-4">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h1><i className="bi bi-plus-circle text-success"></i></h1>
              <h4>Add New Job</h4>
              <p>Create a new job opening.</p>
              <Link to="/add" className="btn btn-success">
                Add Job
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h1><i className="bi bi-gear text-secondary"></i></h1>
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

    <div className="card-header bg-dark text-white">
      <h4 className="mb-0">Recent Jobs</h4>
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
                <td>₹ {job.salary}</td>
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