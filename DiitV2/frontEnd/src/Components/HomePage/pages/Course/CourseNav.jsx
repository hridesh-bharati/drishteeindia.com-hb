import React from 'react';
import { Link } from 'react-router-dom';

// 🔍 SearchBox component
const SearchBox = ({ searchQuery, setSearchQuery }) => (
    <div className="p-1">
        <div className="input-group rounded-pill shadow-sm bg-white overflow-hidden">
            <span className="input-group-text bg-white border-0">
                <i className="bi bi-search text-primary"></i>
            </span>
            <input
                className="form-control border-0 text-secondary"
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={({ target: { value } }) => setSearchQuery(value)}
                style={{ outline: 'none' }}
            />
        </div>
    </div>
);

// 📚 CourseNav component
const CourseNav = ({ data, searchQuery, setSearchQuery }) => (
    <div className="container-fluid py-4 px-3 rounded-4 shadow-sm mb-4" style={{
        background: 'linear-gradient(to right, #e0f7ff,rgb(212, 235, 255))',
        border: '2px solid #cde5ff'
    }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2">
            <div>
                <h2 className="fw-bold mb-1 text-primary">
                    {data} <span className="text-danger">Courses</span>
                </h2>
                <small className="text-muted">
                    <Link to="/" className="text-decoration-none text-primary fw-semibold">
                        <i className="fa fa-home me-1"></i>Home
                    </Link>
                    <span className="mx-2">/</span>
                    {data} Courses
                </small>
            </div>

            <div className="mt-3 mt-md-0" style={{ minWidth: '250px' }}>
                <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
        </div>
    </div>
);

export default CourseNav;
