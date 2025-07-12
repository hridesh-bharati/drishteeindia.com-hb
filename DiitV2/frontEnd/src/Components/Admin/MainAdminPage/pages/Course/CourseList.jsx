import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteCourse, getCourseList } from "../../../../../api/adminApi/api";

export default function CourseBrochure() {
  const [courseList, setCourseList] = useState([]);

  const fetchCourse = async () => {
    try {
      const res = await getCourseList();
      if (res?.message) setCourseList(res.message);
    } catch {
      toast.error("Failed to load courses.");
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      const res = await deleteCourse(_id);
      if (res.ackbool === 1) {
        toast.success(res.message);
        fetchCourse();
      } else {
        toast.error(res.message || "Delete failed.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-5">
        <i className="bi bi-journal-bookmark me-2" />
        Course Brochure
      </h2>

      <div className="row g-4">
        {courseList.length ? (
          courseList.map(({ _id, name, description, duration, prerequisites, subjects }) => (
            <div className="col-md-6 col-lg-4" key={_id}>
              <div className="card h-100 shadow-sm border-0 course-card">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-book-half fs-4" />
                    {name}
                  </h5>
                  <button
                    className="btn btn-sm btn-danger btn-delete"
                    onClick={() => handleDelete(_id)}
                    title="Delete Course"
                    aria-label={`Delete course ${name}`}
                  >
                    <i className="bi bi-trash-fill" />
                  </button>
                </div>

                <div className="card-body">
                  <p className="text-danger fst-italic">{description || "No description provided."}</p>

                  <div className="mb-3">
                    <strong className="text-success d-block mb-1">Subjects:</strong>
                    {subjects?.length ? (
                      subjects.map((sub, i) => (
                        <span
                          key={i}
                          className="badge bg-light text-dark me-1 mb-1 subject-badge"
                        >
                          {sub.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">N/A</span>
                    )}
                  </div>

                  <div className="d-flex justify-content-between text-info small fw-semibold">
                    <span>
                      Duration: <span className="fw-normal">{duration ? `${duration} Month(s)` : "N/A"}</span>
                    </span>
                    <span>
                      Prerequisites: <span className="fw-normal">{prerequisites || "None"}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted fs-5 py-5">
            <i className="bi bi-info-circle me-2" />
            No courses available.
          </div>
        )}
      </div>

      <style>{`
        .course-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .course-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgb(0 0 0 / 0.15);
        }
        .card-header {
          border-bottom: 1px solid rgba(255,255,255,0.25);
        }
        .btn-delete {
          transition: background-color 0.3s ease;
        }
        .btn-delete:hover {
          background-color: #b02a37;
        }
        .subject-badge {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
}
