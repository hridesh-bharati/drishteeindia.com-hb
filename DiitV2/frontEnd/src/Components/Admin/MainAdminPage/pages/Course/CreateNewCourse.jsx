import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { pushANewCourse } from '../../../../../api/adminApi/api';

const Input = ({ label, value, onChange, placeholder, as = "input", rows = 3 }) => (
    <div className="mb-3">
        <label className="fw-semibold small">{label}</label>
        {as === "input" ? (
            <input className="form-control rounded-pill" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        ) : (
            <textarea className="form-control rounded" rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        )}
    </div>
);

export default function CreateNewCourse() {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [prequisite, setPrerequisite] = useState('');
    const [subject, setSubject] = useState([]);
    const [contentTitle, setContentTitle] = useState('');
    const [error, setError] = useState('');

    const resetForm = () => {
        setCourseTitle('');
        setCourseDescription('');
        setDuration('');
        setPrerequisite('');
        setSubject([]);
        setContentTitle('');
        setError('');
    };

    const handleAdd = () => {
        const name = contentTitle.trim();
        if (!name) return;
        if (subject.some(s => s.name.toLowerCase() === name.toLowerCase())) {
            setError('Already added');
        } else {
            setSubject([...subject, { name }]);
            setError('');
        }
        setContentTitle('');
    };

    const handleSubmit = async () => {
        const data = {
            name: courseTitle.trim(),
            description: courseDescription.trim(),
            duration: duration.trim(),
            subjects: subject,
            prequisite: prequisite.trim(),
        };
        const res = await pushANewCourse(data);
        res?.ackbool === 1 ? (toast.success(res.message), resetForm()) : toast.error('Failed to create course');
    };

    return (
        <div className="container mt-2 py-3" style={{ background: "#f2f4f8", minHeight: "100vh" }}>
            <div className="bg-white rounded-4 shadow-sm p-3">
                <div className="bg-primary rounded-top-4 text-white py-3 px-3">
                    <h5 className="m-0 d-flex align-items-center">
                        <i className="bi bi-bookmark-star-fill me-2 fs-4"></i> Create a New Course
                    </h5>
                </div>

                <div className="px-2 py-3">
                    <Input label="Course Title*" value={courseTitle} onChange={setCourseTitle} placeholder="e.g. CCC" />
                    <Input label="Description*" as="textarea" value={courseDescription} onChange={setCourseDescription} placeholder="e.g. Course on Computer Concepts" />
                    <Input label="Duration in month*" value={duration} onChange={setDuration} placeholder="e.g. 3" />
                    <Input label="Prerequisite (Optional)" as="textarea" rows={2} value={prequisite} onChange={setPrerequisite} placeholder="Prerequisite" />

                    <label className="fw-semibold small mb-1">Add Course Contents</label>
                    <div className="input-group mb-2">
                        <input
                            className="form-control rounded-start-pill"
                            value={contentTitle}
                            onChange={e => {
                                setContentTitle(e.target.value);
                                setError('');
                            }}
                            placeholder="e.g. HTML, CSS, JS"
                        />
                        <button className="btn btn-outline-primary rounded-end-pill" onClick={handleAdd}>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    </div>
                    {error && <small className="text-danger">{error}</small>}

                    {subject.length > 0 && (
                        <div className="mb-3 mt-2 d-flex flex-wrap gap-2">
                            {subject.map((s, i) => (
                                <span key={i} className="badge rounded-pill bg-light text-dark border">
                                    {s.name}
                                    <i className="bi bi-x ms-2 text-danger" style={{ cursor: 'pointer' }} onClick={() => setSubject(subject.filter((_, idx) => idx !== i))}></i>
                                </span>
                            ))}
                        </div>
                    )}

                    <button className="btn btn-success rounded-pill w-100 py-2 fs-5 mt-3" onClick={handleSubmit}>
                        <i className="bi bi-cloud-upload me-2"></i> Submit Course
                    </button>
                </div>
            </div>
        </div>
    );
}
