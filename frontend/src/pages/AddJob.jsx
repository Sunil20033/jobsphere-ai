import { useState } from "react";
import { addJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!job.title.trim())
      newErrors.title = "Job Title is required.";

    if (!job.company.trim())
      newErrors.company = "Company Name is required.";

    if (!job.location.trim())
      newErrors.location = "Location is required.";

    if (!job.salary)
      newErrors.salary = "Salary is required.";
    else if (isNaN(job.salary) || Number(job.salary) <= 0)
      newErrors.salary = "Enter a valid salary.";

    if (!job.description.trim())
      newErrors.description = "Description is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    await addJob(job);

    toast.success("Job Added Successfully!");

    navigate("/jobs");
  };

  return (

  <div className="container py-5">

      <div className="row justify-content-center">

          <div className="col-lg-8">

              <div className="card shadow-lg border-0 rounded-4">

                  <div className="card-body p-5">

                      <div className="text-center mb-5">

                          <i
                              className="bi bi-briefcase-fill text-primary"
                              style={{fontSize:"55px"}}
                          ></i>

                          <h2 className="fw-bold mt-3">
                              Post a New Job
                          </h2>

                          <p className="text-muted">
                              Fill in the details below to publish a new job opening.
                          </p>

                      </div>

                      <form onSubmit={handleSubmit}>

                          <div className="mb-4">

                              <label className="form-label fw-semibold">
                                  Job Title *
                              </label>

                              <input
                                  className="form-control form-control-lg"
                                  type="text"
                                  name="title"
                                  placeholder="Software Engineer"
                                  value={job.title}
                                  onChange={handleChange}
                              />

                              <small className="text-danger">
                                  {errors.title}
                              </small>

                          </div>

                          <div className="row">

                              <div className="col-md-6 mb-4">

                                  <label className="form-label fw-semibold">
                                      Company *
                                  </label>

                                  <input
                                      className="form-control form-control-lg"
                                      type="text"
                                      name="company"
                                      placeholder="Google"
                                      value={job.company}
                                      onChange={handleChange}
                                  />

                                  <small className="text-danger">
                                      {errors.company}
                                  </small>

                              </div>

                              <div className="col-md-6 mb-4">

                                  <label className="form-label fw-semibold">
                                      Location *
                                  </label>

                                  <input
                                      className="form-control form-control-lg"
                                      type="text"
                                      name="location"
                                      placeholder="Hyderabad"
                                      value={job.location}
                                      onChange={handleChange}
                                  />

                                  <small className="text-danger">
                                      {errors.location}
                                  </small>

                              </div>

                          </div>

                          <div className="mb-4">

                              <label className="form-label fw-semibold">
                                  Salary *
                              </label>

                              <div className="input-group input-group-lg">

                                  <span className="input-group-text">
                                      ₹
                                  </span>

                                  <input
                                      className="form-control"
                                      type="number"
                                      name="salary"
                                      placeholder="800000"
                                      value={job.salary}
                                      onChange={handleChange}
                                  />

                              </div>

                              <small className="text-danger">
                                  {errors.salary}
                              </small>

                          </div>

                          <div className="mb-4">

                              <label className="form-label fw-semibold">
                                  Job Description *
                              </label>

                              <textarea
                                  className="form-control"
                                  rows="6"
                                  name="description"
                                  placeholder="Describe responsibilities, skills and requirements..."
                                  value={job.description}
                                  onChange={handleChange}
                              ></textarea>

                              <small className="text-danger">
                                  {errors.description}
                              </small>

                          </div>

                          <div className="d-flex justify-content-between">

                              <button
                                  type="button"
                                  className="btn btn-outline-secondary btn-lg"
                                  onClick={() => navigate("/jobs")}
                              >
                                  Cancel
                              </button>

                              <button
                                  className="btn btn-primary btn-lg px-5"
                              >
                                  <i className="bi bi-plus-circle me-2"></i>

                                  Publish Job

                              </button>

                          </div>

                      </form>

                  </div>

              </div>

          </div>

      </div>

  </div>

  );
}

export default AddJob;