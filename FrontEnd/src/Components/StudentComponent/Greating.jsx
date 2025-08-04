import React from 'react';
import { Link } from 'react-router-dom';

const Greating = () => {
  return (
    <div className="container my-5">
      <section className="row justify-content-center align-items-center text-center bg-light shadow-lg rounded-4 p-4 p-md-5">
        <div className="col-12">
          <h1 className="text-success fw-bold display-5 mb-3">
            🎉 Congratulations!
          </h1>

          <h2 className="fw-semibold text-dark mb-4">
            Your exam has been submitted successfully!
          </h2>

          <p className="text-secondary mb-4 fs-6">
            Thank you for attending the exam with <strong>Drishtee Institute</strong>. <br />
            We wish you all the best for your results!
          </p>

          <Link
            to="/Default"
            className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm"
          >
            <i className="fa fa-home me-2"></i> Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Greating;
