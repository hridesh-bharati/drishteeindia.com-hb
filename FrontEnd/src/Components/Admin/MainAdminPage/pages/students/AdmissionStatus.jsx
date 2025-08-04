import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getStudentList,
  deleteStudentRegistrationForm,
  toggleStudentStatus,
  takeNewAdmission,
  generateCertificate,
} from '../../../../../api/adminApi/api';
import ScrollDownArrow from '../../../../HelperCmp/Scroller/ScrollDown';
import AdmNotify from './AdmNotify';

export default function AdmissionStatus() {
  const [modal, setModal] = useState({ show: false, type: '', studentId: '', studentCenter: '' });
  const [form, setForm] = useState({ name: '', regNum: '', percentage: '', date: new Date() });
  const [students, setStudents] = useState([]);
  const [isUnique, setIsUnique] = useState(true);
  const [loading, setLoading] = useState(false);
  const [branchFilter, setBranchFilter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const rspns = await getStudentList({ name: form.name });
      if (rspns?.message && Array.isArray(rspns.message)) setStudents(rspns.message);
      else toast.error("Unexpected response format.");
    } catch (error) {
      toast.error("Failed to fetch students: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const activeStatusChangeHandler = async (e, student_id) => {
    const statusString = e.target.value;
    const status = statusString === "true";
    setActiveStatus(status);
    const res = await toggleStudentStatus(student_id, status);
    if (res.ackbool === 1) {
      toast.success(res.message);
      await fetchStudents();
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const closeModal = () => {
    setModal({ show: false, type: '', studentId: '', studentCenter: '' });
    setForm({ ...form, regNum: '', percentage: '', date: new Date() });
    setIsUnique(true);
  };

  const centerCodeMap = {
    nichlaul: "DIIT124",
    thoothibari: "DIIT125"
  };

  const getBranchCodeFromCenter = (center) => {
    if (!center) return "DIIT124";
    const lower = center.toLowerCase();
    return Object.keys(centerCodeMap).find(c => lower.includes(c))
      ? centerCodeMap[Object.keys(centerCodeMap).find(c => lower.includes(c))]
      : "DIIT124";
  };

  const regPattern = /^(DIIT12[45])\/([A-Z]{2,})\/(\d+)$/;

  const checkUnique = (reg) => {
    const match = reg.match(regPattern);
    if (!match) return true;
    const [_, branch, course, numPart] = match;
    return !students.some(s => {
      if (!s.regNum) return false;
      const parts = s.regNum.split('/');
      return parts[0] === branch && parts[1] === course && parts[2] === numPart;
    });
  };

  const handleAction = async () => {
    if (submitting) return;
    const { studentId, type } = modal;
    setSubmitting(true);

    try {
      let rspns;
      if (type === 'delete') {
        rspns = await deleteStudentRegistrationForm(studentId);
      } else if (type === 'admission') {
        if (!isUnique) {
          toast.error("Reg. number must be unique");
          return;
        }
        rspns = await takeNewAdmission(studentId, form.regNum);
        await toggleStudentStatus(studentId, true);
      } else if (type === 'certificate') {
        rspns = await generateCertificate(studentId, form.percentage, form.date);
      }

      if (rspns?.ackbool) {
        toast.success(rspns.message);
        closeModal();
        await fetchStudents();
      }
    } catch (error) {
      toast.error("Action failed: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderModalContent = () => {
    if (modal.type === 'delete') {
      return <Button variant="danger" onClick={handleAction}>Delete</Button>;
    }

    if (modal.type === 'admission') {
      const student = students.find(s => s._id === modal.studentId);
      const branchCode = getBranchCodeFromCenter(modal.studentCenter);
      const expectedCourse = student?.course?.toUpperCase();
      const placeholder = `e.g. ${branchCode}/${expectedCourse || 'ADCA'}/123`;

      const regMatch = form.regNum.match(regPattern);
      const regCourse = regMatch?.[2] || "";
      const regBranch = regMatch?.[1] || "";
      const courseMismatch = expectedCourse && regCourse && regCourse !== expectedCourse;
      const branchMismatch = regBranch && regBranch !== branchCode;

      return (
        <>
          <input
            className="form-control"
            placeholder={placeholder}
            value={form.regNum}
            onChange={(e) => {
              const val = e.target.value.toUpperCase();
              setForm({ ...form, regNum: val });
              setIsUnique(checkUnique(val));
            }}
          />

          {form.regNum && !regPattern.test(form.regNum) && (
            <span className="text-danger text-start w-100 p-0 m-0" style={{ fontSize: "0.7rem" }}>
              Invalid format. Example: {placeholder}
            </span>
          )}

          {form.regNum && regPattern.test(form.regNum) && courseMismatch && (
            <span className="text-danger text-start w-100 p-0 m-0 " style={{ fontSize: "0.7rem" }}>
              Course in Reg. No. must match actual course ({expectedCourse})
            </span>
          )}

          {form.regNum && regPattern.test(form.regNum) && branchMismatch && (
            <span className="text-danger text-start w-100 p-0 m-0 " style={{ fontSize: "0.7rem" }}>
              Branch code in Reg. No. must match, actual branch ({branchCode})
            </span>
          )}

          {form.regNum && regPattern.test(form.regNum) && !courseMismatch && !branchMismatch && !isUnique && (
            <span className="text-danger text-start w-100 p-0 m-0" style={{ fontSize: "0.7rem" }}>
              Reg. number must be unique
            </span>
          )}

          <Button
            variant="primary"
            onClick={handleAction}
            disabled={
              submitting ||
              !form.regNum ||
              !regPattern.test(form.regNum) ||
              courseMismatch ||
              branchMismatch ||
              !isUnique
            }
          >
            {submitting ? "Please wait..." : <><i className="bi bi-check2-circle"></i> Done</>}
          </Button>
        </>
      );
    }

    if (modal.type === 'certificate') {
      return (
        <>
          <input className="form-control" type="number" placeholder="Enter percentage" onChange={(e) => setForm({ ...form, percentage: e.target.value })} />
          <input className="form-control" type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <Button variant="secondary" onClick={closeModal}><i className="bi bi-x"></i></Button>
          <Button variant="primary" onClick={handleAction}><i className="fa fa-paper-plane"></i></Button>
        </>
      );
    }
  };

  const uniqueBranches = [...new Set(students.map(s => s.center).filter(Boolean))];

  const branchFilterDropdown = (
    <Form.Select
      size="sm"
      className="rounded-pill"
      value={branchFilter}
      onChange={(e) => setBranchFilter(e.target.value)}
    >
      <option value="">All Branches</option>
      {uniqueBranches.map((br, i) => (
        <option key={i} value={br}>{br}</option>
      ))}
    </Form.Select>
  );

  const searchFields = (
    <>
      <input className="form-control rounded-pill" placeholder="Search by Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="form-control rounded-pill" placeholder="Reg. No" value={form.regNum} onChange={(e) => setForm({ ...form, regNum: e.target.value })} />
      {branchFilterDropdown}
      <button className="btn btn-primary rounded-pill" onClick={fetchStudents}><i className="bi bi-search"></i></button>
    </>
  );

  const rightButtons = (
    <div className="d-flex gap-2 align-items-center">
      <Link to="/AdmissionForm" className="btn btn-light btn-sm rounded-circle shadow-sm" title="Add Student">
        <i className="fa fa-plus text-primary"></i>
      </Link>
      <button className="btn btn-light btn-sm rounded-circle shadow-sm" onClick={fetchStudents} title="Refresh">
        <i className="bi bi-arrow-clockwise text-danger"></i>
      </button>
    </div>
  );

  // Count deactivated students
  const deactivatedCount = students.filter(s => s.activeStatus === false).length;
  const pendingCount = students.filter(s => !s.regNum).length;

  const leftIcons = (
    <div className="text-white fw-bold d-flex align-items-center gap-3">
      {/* Total students */}
      <div className="position-relative text-white">
        <i className="bi bi-people-fill text-light mx-2"></i>
        <span className="position-absolute top-0 start-50 ms-2 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.7rem' }}>
          {students.length}
        </span>
      </div>

      {/* Pending students */}
      <div className="position-relative text-white">
        <i className="bi bi-hourglass-split text-light mx-2"></i>
        <span className="position-absolute top-0 start-50 ms-2 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
          {pendingCount}
        </span>
      </div>

      {/* Deactivated students */}
      <div className="position-relative text-white">
        <i className="bi bi-person-fill-slash text-light mx-2"></i>
        <span className="position-absolute top-0 start-50 ms-2 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
          {deactivatedCount}
        </span>
      </div>

      {/* Notification icon */}
      <div className="position-relative text-white">
        <i className="bi bi-person-fill-exclamation text-light mx-2"></i>
        <AdmNotify />
      </div>
    </div>
  );


  return (
    <div className="StudentList  min-vh-100 mt-3 bg-light dark-bg ">
      <div className="sticky-top" style={{ zIndex: 2 }}>
        <div className="d-none d-sm-flex header-gradient p-3 justify-content-between align-items-center shadow-sm">
          <div className="d-flex align-items-center gap-4 fs-4 text-white">
            {leftIcons}
            <div className="d-flex gap-2">{searchFields}</div>
          </div>
          {rightButtons}
        </div>
        <div className="d-flex d-sm-none header-gradient p-3 justify-content-between align-items-center shadow-sm">
          <div className="fs-4">{leftIcons}</div>
          {rightButtons}
        </div>
        <div className="d-flex d-sm-none bg-white px-3 py-2 border-bottom border-secondary-subtle shadow-sm flex-column gap-2">
          {searchFields}
        </div>
      </div>

      <div className="container py-4">
        {loading && <div className="text-center text-muted py-3">Loading students...</div>}
        <div className="row g-4">
          {!loading && students.length === 0 && (
            <div className="col-12 text-center text-muted py-5">No students found.</div>
          )}
          {students
            .filter(({ name, regNum, center }) => {
              const searchName = form.name.toLowerCase();
              const searchReg = form.regNum.toLowerCase();
              const branchMatch = branchFilter ? center === branchFilter : true;
              return (
                (!searchName || name.toLowerCase().includes(searchName)) &&
                (!searchReg || regNum?.toLowerCase().includes(searchReg)) &&
                branchMatch
              );
            })
            .map((s) => {
              const { _id, name, photo, course, center, regNum, dob, mobileNumber, address, gnCertificate, activeStatus } = s;
              const hasRegNum = !!regNum;
              const certificateGenerated = !!gnCertificate;

              return (
                <div key={_id} className="col-12 col-sm-6 col-lg-4">
                  <div className="card  shadow-sm border-0 h-100">
                    <div className="card-header small d-flex gap-3 align-items-center bg-gradient-cc">
                      <div className="ratio ratio-1x1 rounded-circle border border-3 overflow-hidden" style={{ width: 70 }}>
                        <img src={photo} alt={name} className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold text-primary">{name}</h6>
                        <div className="d-flex">
                          <div>
                            <span className="px-1 text-dark">Course: {course}</span>
                            <span className="px-1 text-dark d-block">Branch: {center}</span>
                          </div>
                          <div>
                            <select
                              className="rounded-pill px-1 small"
                              name="activeStatus" id="activeStatus" value={activeStatus} onChange={(e) => { activeStatusChangeHandler(e, _id) }}>
                              <option value="true">Active</option>
                              <option value="false">Deactive</option>
                            </select>
                          </div>
                        </div>
                        <span className={`badge rounded-pill d-block ${hasRegNum ? "bg-success" : "bg-warning text-dark"}`}>
                          Reg no: {regNum || "Pending"}
                        </span>
                      </div>
                    </div>

                    <div className="card-body py-2 px-3">
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        <span className="badge bg-gradient-cc2 text-white flex-grow-1 d-flex justify-content-between px-3 py-2">
                          <span><i className="bi bi-phone me-1"></i>{mobileNumber}</span>
                          <span><i className="bi bi-calendar3 me-1"></i>{new Date(dob).toLocaleDateString()}</span>
                        </span>
                        <span className="small bg-light about-card text-dark px-3 py-2">
                          <i className="bi bi-geo-alt me-1"></i>{address}
                        </span>
                      </div>

                      <div className="d-flex flex-column gap-2">
                        {!hasRegNum && (
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary w-50" onClick={() => setModal({ show: true, type: "admission", studentId: _id, studentCenter: center })}>
                              <i className="bi bi-pencil"></i> Take Admission
                            </button>
                            <button className="btn btn-sm btn-outline-danger w-50" onClick={() => setModal({ show: true, type: "delete", studentId: _id })}>
                              <i className="bi bi-trash-fill"></i> Delete
                            </button>
                          </div>
                        )}
                        {hasRegNum && !certificateGenerated && (
                          <button className="btn btn-sm btn-outline-success" onClick={() => setModal({ show: true, type: "certificate", studentId: _id })}>
                            <i className="bi bi-person-check-fill"></i> Generate
                          </button>
                        )}
                        {certificateGenerated && (
                          <button className="btn btn-sm btn-success" disabled>
                            <i className="bi bi-patch-check-fill text-white me-1"></i>
                            Certificate Generated
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <Modal show={modal.show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modal.type === 'delete' && "Confirm Delete"}
            {modal.type === 'admission' && "Enter Reg Number"}
            {modal.type === 'certificate' && "Generate Certificate"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderModalContent()}
        </Modal.Body>
      </Modal>
      <style>{`
.header-gradient {
  background: linear-gradient(90deg, #375a7f, #3498db 60%, #38ada9);
}

/* Card header background gradient */
.bg-gradient-cc {
  background: linear-gradient(90deg, rgb(227, 227, 227), #c9f7f5) !important;
}

/* Card badge background gradient */
.bg-gradient-cc2 {
  background: linear-gradient(90deg, #38ada9, #54a0ff) !important;
}


`}</style>
      <ScrollDownArrow />
    </div>
  );
}
