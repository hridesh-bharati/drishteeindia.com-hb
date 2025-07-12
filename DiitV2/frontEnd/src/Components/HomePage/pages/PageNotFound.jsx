import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div
      className="d-flex justify-content-center align-items-center text-center"
      style={{
        height: '92vh',
        background: 'linear-gradient(135deg, #f8f9fa, #e0eafc)',
        padding: '2rem',
      }}
    >
      <div className="card shadow-lg p-4 border-0 rounded-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
          <h1 className="display-3 fw-bold text-danger">404</h1>
          <h4 className="fw-semibold mb-3">Oops! Page not found</h4>
          <p className="text-muted mb-2">
            We’re sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <p className="text-muted small">
            Start working with <span className="fw-bold">DRISHTEE</span> that can provide everything you need for education.
          </p>
          <Link to="/" className="btn btn-primary rounded-pill mt-3 px-4 py-2">
            <i className="fa fa-home me-2"></i> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
