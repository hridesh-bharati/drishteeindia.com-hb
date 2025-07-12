import React, { useEffect, useState } from 'react';
import { examFormList, getCourseList, verifyExamForm } from '../../../../../api/adminApi/api';
import { toast } from 'react-toastify';

export default function AppliedExamForms() {
  const [formList, setFormList] = useState([]);
  const [examId, setExamId] = useState("");
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [completed, setCompleted] = useState(null);
  const [all, setAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const rspns = await getCourseList();
        setCourses(rspns.message.map(c => c.name));
      } catch (e) {
        toast.error("Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  const fetchExamFormHandler = async () => {
    try {
      const comp = all ? null : completed;
      const crs = all ? "" : course;
      const rspns = await examFormList(comp, crs);
      setExamId(rspns.examId || "");
      setFormList(rspns.message || []);
    } catch (e) {
      toast.error("Failed to fetch exam forms");
    }
  };

  const verifyExamFormHandler = async (exmId, frmId) => {
    try {
      const rspns = await verifyExamForm(exmId, frmId);
      toast.success(rspns.message);
      fetchExamFormHandler();
    } catch (error) {
      toast.error("Verification failed");
    }
  };

  useEffect(() => {
    fetchExamFormHandler();
  }, []);

  const filteredForms = formList.filter(({ name, regNum }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    regNum.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container my-4">
      <h4 className="text-center mb-3 text-primary fw-bold">STUDENT'S FINAL EXAMINATION QUERIES</h4>

      <div className="row mb-4 g-2 justify-content-center">
        <div className="col-12 col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name or Reg No."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select" value={all} onChange={e => setAll(e.target.value === 'true')}>
            <option value={false}>Not Selected</option>
            <option value={true}>All</option>
          </select>
        </div>
        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={completed === null ? '' : completed}
            onChange={e => setCompleted(e.target.value === '' ? null : e.target.value === 'true')}
            disabled={all}
          >
            <option value="">Exam Status</option>
            <option value={true}>Completed</option>
            <option value={false}>Uncompleted</option>
          </select>
        </div>
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={course}
            onChange={e => setCourse(e.target.value)}
            disabled={all}
          >
            <option value="">Select Course</option>
            {courses.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-2 d-grid">
          <button className="btn btn-primary" onClick={fetchExamFormHandler}>
            <i className="bi bi-search"></i> Search
          </button>
        </div>
      </div>

      {filteredForms.length === 0 ? (
        <p className="text-center text-muted fst-italic">No exam forms found.</p>
      ) : (
        <div className="row g-3">
          {filteredForms.map(student => (
            <div key={student.id} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="rounded-circle me-3"
                      style={{ width: 60, height: 60, objectFit: "cover", border: "2px solid #0d6efd" }}
                    />
                    <div>
                      <h5 className="card-title mb-1">{student.name}</h5>
                      <small className="text-muted">Reg No.: {student.regNum}</small>
                    </div>
                  </div>

                  <p className="mb-1">
                    <strong>Status: </strong>
                    <span className={student.verified ? 'text-success' : 'text-warning'}>
                      {student.verified ? "Verified" : "Pending"}
                    </span>
                  </p>

                  <p className="mb-1">
                    <strong>Applied At: </strong>{new Date(student.applyDate).toLocaleDateString()}
                  </p>

                  <p className="mb-3">
                    <strong>Tested: </strong>{student.tested ? "Yes" : "No"}
                  </p>

                  {!student.verified && (
                    <button
                      className="btn btn-sm btn-primary mt-auto align-self-start"
                      onClick={() => verifyExamFormHandler(examId, student.id)}
                    >
                      Verify Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
