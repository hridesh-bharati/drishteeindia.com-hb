import React, { useEffect, useState } from 'react';
import { getAllQuery, deleteQuery, updateQueryStatus } from '../../../api/adminApi/api';

const StudentChart = () => {
  const [query, setQuery] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchAllQuery = async () => {
    try {
      const rspns = await getAllQuery();
      setQuery(rspns.message);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQueryVia = async (_id) => {
    try {
      await deleteQuery(_id);
    } catch (error) {
      console.error("Delete query error:", error);
    } finally {
      await fetchAllQuery();
    }
  };

  const markAsSolved = async (_id) => {
    try {
      const rspns = await updateQueryStatus(_id);
      if (rspns.ackbool === 1) {
        await fetchAllQuery();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / 60 / 1000);
    const hours = Math.floor(diffMs / 60 / 60 / 1000);
    const days = Math.floor(diffMs / 24 / 60 / 60 / 1000);
    if (seconds < 10) return 'Just now';
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
    return past.toLocaleDateString('en-GB');
  };

  const filteredQueries = query
    .filter(q => {
      const matchesFilter =
        filter === 'all' ? true : filter === 'solved' ? q.iSolveStatus : !q.iSolveStatus;
      const matchesSearch =
        q.fullName.toLowerCase().includes(search.toLowerCase()) ||
        q.email.toLowerCase().includes(search.toLowerCase()) ||
        q.title.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) =>
      sortBy === 'latest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  useEffect(() => {
    fetchAllQuery();
  }, []);

  return (
    <div className="container-fluid inboxContainer dark-bg pt-4 pb-4 px-1" style={{ background: 'linear-gradient(to right, #e0ecff, #f0f9ff)' }}>
      <div className="bg-primary text-white p-3 rounded-3 shadow-sm m-2">
        <div className="row gy-2 gx-3 align-items-center">
          <div className="col-12 col-md-auto d-flex align-items-center gap-2">
            <i className="bi bi-inbox-fill fs-5"></i>
            <h6 className="fw-semibold mb-0">Inbox</h6>
            <div className="position-relative mx-3">
              <i className="bi bi-bell-fill fs-5 text-white"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {query.length}
              </span>
            </div>
            <div className="w-100 d-flex justify-content-end ">
              <select
                className="form-select form-select-sm bg-light text-dark border-0 shadow-sm w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Search with Suggestions */}
          <div className="col-12 col-sm-6 col-md">
            <div className="position-relative w-100">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-sm bg-light text-dark border-0 shadow-sm pe-4"
                  placeholder="Search name / email / title"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  onFocus={() => setShowSuggestions(true)}
                />
                {search && (
                  <button
                    type="button"
                    className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent text-secondary"
                    onClick={() => {
                      setSearch('');
                      setShowSuggestions(false);
                    }}
                    style={{ fontSize: '1rem' }}
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </div>

              {search && showSuggestions && (
                <div
                  className="dropdown-menu show w-100 mt-1 shadow-sm"
                  style={{ maxHeight: '200px', overflowY: 'auto', zIndex: 1050 }}
                >
                  {query
                    .filter(
                      (q) =>
                        q.fullName.toLowerCase().includes(search.toLowerCase()) ||
                        q.email.toLowerCase().includes(search.toLowerCase()) ||
                        q.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .slice(0, 5)
                    .map((q, idx) => (
                      <button
                        type="button"
                        key={idx}
                        className="dropdown-item d-flex align-items-start small"
                        onClick={() => {
                          setSearch(q.fullName);
                          setShowSuggestions(false);
                        }}
                      >
                        <i className="bi bi-person-circle me-2 text-primary"></i>
                        <div className="text-start">
                          <div className="fw-semibold">{q.fullName}</div>
                          <small>{q.email}</small>
                        </div>
                      </button>
                    ))}
                </div>
              )}

            </div>

          </div>

          {/* Filters */}
          <div className="col-12 col-sm-auto">
            <div className="btn-group d-flex flex-wrap gap-2 shadow-sm">
              <button className={`btn btn-sm px-3 rounded-pill fw-semibold ${filter === 'all' ? 'bg-warning text-dark' : 'bg-gradient bg-light text-dark'}`} onClick={() => setFilter('all')}>
                All
              </button>
              <button className={`btn btn-sm px-3 rounded-pill fw-semibold ${filter === 'solved' ? 'bg-success text-white' : 'bg-gradient bg-light text-dark'}`} onClick={() => setFilter('solved')}>
                Solved
              </button>
              <button className={`btn btn-sm px-3 rounded-pill fw-semibold ${filter === 'unsolved' ? 'bg-danger text-white' : 'bg-gradient bg-light text-dark'}`} onClick={() => setFilter('unsolved')}>
                Unsolved
              </button>
              <button className="btn btn-sm px-3 rounded-pill bg-white text-dark shadow-sm border refresh-btn" onClick={fetchAllQuery} title="Refresh">
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Cards */}
      <div className="row row-cols-1 row-cols-md-2 g-3 m-0 p-0">
        {filteredQueries.length === 0 ? (
          <div className="text-center mx-auto  col mt-5">No messages found.</div>
        ) : (
          filteredQueries.map((q, index) => (
            <div className="col" key={index}>
              <div className={`card inbox-card border-0 shadow-sm h-100 m-1 ${q.iSolveStatus ? 'solved-card' : ''}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <h6 className="mb-0 text-primary">{q.fullName}</h6>
                    <small >{getRelativeTime(q.createdAt)}</small>
                  </div>
                  <div className="mb-2">
                    <strong className="text-dark">{q.title}</strong>
                    <p className=" small my-1">{q.query}</p>
                  </div>
                  <div className=" small mb-3">
                    <i className="bi bi-phone-fill me-1"></i>{q.mobile} &nbsp;
                    <i className="bi bi-envelope-fill me-1"></i>{q.email}
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    {!q.iSolveStatus ? (
                      <button className="btn btn-outline-success btn-sm" onClick={() => markAsSolved(q._id)}>
                        <i className="bi bi-check-circle me-1"></i> Solve
                      </button>
                    ) : (
                      <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                        <i className="bi bi-check2-all me-1"></i> Solved
                      </span>
                    )}
                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteQueryVia(q._id)}>
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Styles */}
      <style>{`
        .inboxContainer {
          mix-height: 100vh;
        }
        .inbox-card {
          border-radius: 1rem;
          background: linear-gradient(135deg, #ffffff, #f9f9f9);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border-left: 5px solid #0d6efd;
          transition: all 0.3s ease-in-out;
        }
        .solved-card {
          background: linear-gradient(135deg, #e6ffed, #f5fff7);
          border-left: 5px solid #28a745;
        }
        .btn-outline-success.btn-sm:hover {
          background-color: #28a745;
          color: white;
        }
        .btn-outline-danger.btn-sm:hover {
          background-color: #dc3545;
          color: white;
        }
        .badge.bg-success-subtle {
          background-color: #d1e7dd !important;
          color: #0f5132 !important;
        }
        .list-group-item:hover {
          background-color: #f0f0f0;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default StudentChart;
