import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getStudentList } from '../../api/adminApi/api';

export default function StudentDataMobilePro() {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchStudentData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getStudentList();
            if (response?.ackbool === 1) setStudents(response.message);
            else setStudents([]);
        } catch {
            setStudents([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudentData();
    }, [fetchStudentData]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date) ? date.toLocaleDateString() : '';
    };

    const getInitials = (name) =>
        name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '';

    const filteredStudents = useMemo(() => {
        const lower = searchQuery.toLowerCase();
        return students.filter((s) => s.name.toLowerCase().includes(lower));
    }, [students, searchQuery]);

    const InfoRow = ({ icon, label, white }) => (
        <div className={`me-3 mb-1 d-flex align-items-center ${white ? 'text-white' : 'text-muted'}`}>
            <i className={`bi ${icon} me-2 ${white ? 'text-white' : 'text-primary'}`}></i>
            <span className={`${white ? 'text-white' : ''}`}>{label}</span>
        </div>
    );

    return (
        <div className="container-fluid small py-4">
            {/* Search Bar */}
            <div className="input-group mb-4 shadow-sm rounded-pill">
                <span className="input-group-text bg-white border-0">
                    <i className="bi bi-search text-muted"></i>
                </span>
                <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button className="btn border-0" onClick={() => setSearchQuery('')}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                )}
                <button className="btn border-0" onClick={fetchStudentData}>
                    <i className="bi bi-arrow-clockwise"></i>
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" />
                    <p className="mt-3 text-muted">Loading students...</p>
                </div>
            ) : filteredStudents.length === 0 ? (
                <p className="text-center text-muted">No students found.</p>
            ) : (
                <div className="row">
                    {filteredStudents.map((student, idx) => (
                        <div key={student._id || idx} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card shadow border-0 h-100 rounded-4 overflow-hidden">
                                {/* Header */}
                                <div className="p-3 text-white" style={{ background: 'linear-gradient(135deg, #6c63ff, #3f51b5)' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-0">{student.name}</h5>
                                            <small className="fw-light">
                                                <i className="bi bi-bookmark-fill me-1"></i>
                                                {student.course} • {student.category}
                                            </small>
                                        </div>
                                        <div className="rounded-circle bg-white d-flex align-items-center justify-content-center shadow" style={{ width: 70, height: 70 }}>
                                            {student.photo ? (
                                                <img
                                                    src={student.photo}
                                                    alt={student.name}
                                                    className="rounded-circle"
                                                    style={{ width: 66, height: 66, objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <span className="fw-bold text-dark" style={{ fontSize: 24 }}>
                                                    {getInitials(student.name)}
                                                </span>
                                            )}
                                        </div>

                                    </div>
                                    <div className="d-flex flex-wrap pt-2">
                                        <InfoRow icon="bi-phone" label={student.center} white />
                                        <InfoRow icon="bi-phone" label={student.mobileNumber} white />
                                        <InfoRow icon="bi-envelope" label={student.email} white />
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-3 small">
                                    <div className="row g-2">
                                        <div className="col-12 col-sm-6">
                                            <InfoRow icon="bi-person-badge" label={`Reg No: ${student.regNum}`} />
                                            <InfoRow icon="bi-calendar3" label={`DOB: ${formatDate(student.dob)}${student.gender ? ` • ${student.gender}` : ''}`} />
                                            <InfoRow icon="bi-clock-history" label={`Date of Reg: ${formatDate(student.createdAt)}`} />
                                            <InfoRow icon="bi-person" label={`Father: ${student.fatherName}`} />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <InfoRow icon="bi-person-heart" label={`Mother: ${student.motherName}`} />
                                            <InfoRow icon="bi-geo-alt" label={`Address: ${student.address}`} />
                                            <InfoRow icon="bi-fingerprint" label={`Aadhaar: ${student.aadhaar}`} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <InfoRow
                                            icon="bi-check-circle"
                                            label={<><span className="me-1">Admitted:</span><span className={`badge ${student.admitted ? 'bg-success' : 'bg-danger'}`}>{student.admitted ? 'Yes' : 'No'}</span></>}
                                        />
                                        <InfoRow
                                            icon="bi-award"
                                            label={<><span className="me-1">Certificate:</span><span className={`badge ${student.gnCertificate ? 'bg-success' : 'bg-warning'}`}>{student.gnCertificate ? 'Generated' : 'Pending'}</span></>}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
