import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";
import { toast } from "react-toastify";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    const response = await getJobById(id);
    setJob(response.data);
  };

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

    await updateJob(id, job);

    toast.success("Job Updated Successfully!");

    navigate("/jobs");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Job</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control"
          name="title"
          value={job.title}
          onChange={handleChange}
        />
        <small className="text-danger">{errors.title}</small>

        <br />

        <input
          className="form-control"
          name="company"
          value={job.company}
          onChange={handleChange}
        />
        <small className="text-danger">{errors.company}</small>

        <br />

        <input
          className="form-control"
          name="location"
          value={job.location}
          onChange={handleChange}
        />
        <small className="text-danger">{errors.location}</small>

        <br />

        <input
          className="form-control"
          type="number"
          name="salary"
          value={job.salary}
          onChange={handleChange}
        />
        <small className="text-danger">{errors.salary}</small>

        <br />

        <textarea
          className="form-control"
          rows="4"
          name="description"
          value={job.description}
          onChange={handleChange}
        ></textarea>
        <small className="text-danger">{errors.description}</small>

        <br />

        <button className="btn btn-success">
          Update Job
        </button>

      </form>
    </div>
  );
}

export default EditJob;