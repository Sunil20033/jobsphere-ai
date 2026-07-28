import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs, deleteJob } from "../services/jobService";
import { toast } from "react-toastify";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);

    try {
      const response = await getJobs();
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
  setSelectedJobId(id);
  setShowModal(true);
  };

    const confirmDelete = async () => {
      try {
        await deleteJob(selectedJobId);

        toast.success("Job Deleted Successfully!");

        await loadJobs();

        setShowModal(false);
        setSelectedJobId(null);
      } catch (error) {
        toast.error("Failed to delete job.");
      }
    };

  let filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy === "title") {
    filteredJobs.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "company") {
    filteredJobs.sort((a, b) => a.company.localeCompare(b.company));
  } else if (sortBy === "salaryLow") {
    filteredJobs.sort((a, b) => Number(a.salary) - Number(b.salary));
  } else if (sortBy === "salaryHigh") {
    filteredJobs.sort((a, b) => Number(b.salary) - Number(a.salary));
  }

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "4rem", height: "4rem" }}
        ></div>

        <h4 className="mt-3">Loading Jobs...</h4>
      </div>
    );
  }

  return (
  <>
    <div className="container mt-4">

      <h2 className="mb-4 text-center">Available Jobs</h2>

      <div className="row mb-4">

        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by Job Title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="title">Title (A-Z)</option>
            <option value="company">Company (A-Z)</option>
            <option value="salaryLow">Salary (Low → High)</option>
            <option value="salaryHigh">Salary (High → Low)</option>
          </select>
        </div>

      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center mt-5">

          <h2>😔</h2>

          <h4>No Jobs Found</h4>

          <p className="text-muted">
            Try changing your search or add a new job.
          </p>

          <Link to="/add" className="btn btn-primary">
            Add New Job
          </Link>

        </div>
      ) : (
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">

          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Description</th>
              <th width="180">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>₹ {job.salary}</td>
                <td>{job.description}</td>

                <td>
                  <Link
                    to={`/edit/${job.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
            )}
    </div>

    {showModal && (
      <div
        className="modal d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                Delete Job
              </h5>
            </div>

            <div className="modal-body">
              <p>
                Are you sure you want to delete this job?
              </p>
            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowModal(false);
                  setSelectedJobId(null);
                }}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      </div>
    )}

  </>
);
}

export default JobList;