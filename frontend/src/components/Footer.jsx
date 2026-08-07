function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <h5 className="fw-bold mb-2">
          <i className="bi bi-briefcase-fill text-primary me-2"></i>
          JobSphere
        </h5>

        <p className="mb-2 text-light">
          A Job Management System built with React, Spring Boot & MySQL.
        </p>

        <small className="d-block mb-2">
          <i className="bi bi-code-slash me-1"></i>
          Developed with ❤️ by <strong>Sunil J</strong>
        </small>

        <small className="text-secondary">
          © 2026 JobSphere. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;