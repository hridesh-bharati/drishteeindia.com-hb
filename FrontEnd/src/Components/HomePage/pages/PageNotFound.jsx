import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center about-card bg-white p-4"
      style={{ height: '100dvh', overflow: 'hidden' }}
    >
      <img
        src="/images/icon/pagenotfound.webp"
        alt="Page Not Found"
        className="mb-4"
        style={{ maxWidth: '200px', height: 'auto' }}
      />
      <h1 className="display-6 text-danger fw-semibold mb-2">404 - Page Not Found</h1>
      <p className="text-muted mb-1" style={{ maxWidth: '400px' }}>
        Sorry, the page you're looking for doesn’t exist or has been moved.
      </p>
      <p className="text-muted small mb-4">
        Return to <span className="fw-bold text-primary">DRISHTEE</span> and continue your journey.
      </p>
      <Link to="/" className="btn btn-outline-primary rounded-pill px-4 py-2">
        <i className="fa fa-home me-2"></i>Back to Home
      </Link>
    </div>
  );
}
