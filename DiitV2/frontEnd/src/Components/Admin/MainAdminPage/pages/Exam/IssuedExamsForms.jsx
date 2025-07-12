import { toast } from "react-toastify";
import { getAllExams, lockExamForm } from "../../../../../api/adminApi/api";
import PushQuestionPaper from "./questionPaper/PushQuestionPaper";
import SendQuestions from "./questionPaper/SendQuestions";
import { useEffect, useState } from "react";

export default function ExamForms() {
  const [exams, setExams] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [action, setAction] = useState(true);
  const [examId, setExamId] = useState("");
  const [qPId, setQpId] = useState("");

  const fetchAllExamHandler = async () => {
    try {
      const rspns = await getAllExams(completed, locked);
      if (rspns.ackbool === 1) {
        setExams(rspns.message);
      } else toast.error("Failed to fetch exams");
    } catch {
      toast.error("Error fetching exams");
    }
  };

  const setLockExamFormHandler = async (examIds) => {
    try {
      const rspns = await lockExamForm(examIds, action);
      if (rspns.ackbool === 1) {
        toast.success(rspns.message);
        fetchAllExamHandler();
      } else toast.error("Failed to update exam lock status");
    } catch {
      toast.error("Error locking/unlocking exams");
    }
  };

  useEffect(() => {
    fetchAllExamHandler();
  }, [completed, locked]);

  return (
    <section className="container mt-4 px-2">
      <div className="d-flex justify-content-between align-items-center bg-primary text-white px-3 py-2 rounded shadow-sm mb-3">
        <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
          <i className="bi bi-journal-text fs-5"></i> Exam Forms
        </h5>
        <button
          className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
          onClick={fetchAllExamHandler}
          style={{ width: "32px", height: "32px" }}
        >
          <i className="bi bi-arrow-clockwise text-primary"></i>
        </button>
      </div>

      {exams.length === 0 ? (
        <div className="text-center text-muted fst-italic py-5">No exams found.</div>
      ) : (
        <div className="row g-3">
          {exams.map((exam) => (
            <div className="col-12 col-md-6" key={exam._id}>
              <div className="card shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <h6 className="text-primary fw-semibold">{exam.courseName}</h6>

                  <div className="row g-2 mt-2 small text-secondary">
                    <div className="col-6">
                      <i className="bi bi-calendar-check me-1"></i><strong>Exam Date:</strong>
                      <div>{new Date(exam.examDate).toLocaleDateString()}</div>
                    </div>
                    <div className="col-6">
                      <i className="bi bi-clock me-1"></i><strong>Duration:</strong>
                      <div>{exam.duration}</div>
                    </div>
                    <div className="col-6">
                      <i className={`bi ${exam.locked ? "bi-lock-fill" : "bi-unlock"} me-1`}></i><strong>Lock:</strong>
                      <span className={`badge ${exam.locked ? "bg-danger" : "bg-success"} ms-1`}>
                        {exam.locked ? "Locked" : "Unlocked"}
                      </span>
                    </div>
                    <div className="col-6">
                      <i className="bi bi-check2-circle me-1"></i><strong>Status:</strong>
                      <span className={`badge ${exam.completed ? "bg-success" : "bg-warning text-dark"} ms-1`}>
                        {exam.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                    <div className="col-12">
                      <i className="bi bi-people me-1"></i><strong>Students:</strong> {exam.students?.length}
                    </div>
                  </div>

                  <div className="d-grid mt-3">
                    {exam.paper ? (
                      <button
                        className="btn btn-outline-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#sendqstModel"
                        onClick={() => setQpId(exam.paper)}
                      >
                        <i className="bi bi-upload me-1"></i> Upload Questions
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#setPaperModal"
                        onClick={() => setExamId(exam._id)}
                      >
                        <i className="bi bi-pencil-square me-1"></i> Set Paper
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Questions Modal */}
      <div className="modal fade m-0 p-0 mt-4 " id="sendqstModel" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable">
          <SendQuestions paperId={qPId} />
        </div>
      </div>

      {/* Set Paper Modal */}
      <div className="modal fade" id="setPaperModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Set Question Paper</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <PushQuestionPaper examId={examId} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
