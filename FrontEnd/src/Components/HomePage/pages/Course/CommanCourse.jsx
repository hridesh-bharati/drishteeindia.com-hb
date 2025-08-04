import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import CourseNav from "./CourseNav";
import Footer from "../../../Footer/Footer";

function CommanCourse({ targetCourses, CTitle }) {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [columnsPerRow, setColumnsPerRow] = useState(2);
    const crs = useSelector(state => state.courses);

    useEffect(() => {
        if (crs?.length) setCourses(crs);

        const updateColumns = () => {
            const width = window.innerWidth;
            if (width < 576) setColumnsPerRow(2);
            else if (width < 768) setColumnsPerRow(3);
            else setColumnsPerRow(4);
        };

        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, [crs]);

    const trimmedQuery = searchQuery.trim().toLowerCase();
    const isAll = targetCourses.includes("All");

    const filteredCourses = courses.filter(course =>
        (isAll || targetCourses.some(tc => tc.toLowerCase() === course.name.toLowerCase())) &&
        (trimmedQuery ? course.name.toLowerCase().includes(trimmedQuery) : true)
    );

    return (
        <>
            <div className="container-fluid px-2">
                <div className="mt-3 py-4">
                    <CourseNav data={CTitle} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                    <div className="row">
                        {filteredCourses.length === 0 ? (
                            <div className="text-center mt-4 text-danger">
                                <p>⚠️ No courses found.</p>
                            </div>
                        ) : (
                            filteredCourses.map((course, index) => (
                                <div key={index} className="col-12 mb-4 bg-white" data-aos="fade-up">
                                    <div className="card border-0 shadow rounded-4 h-100 bg-white">
                                        <div className="card-body position-relative">
                                            <div className="course-header mb-3 px-2 py-2 rounded-3 text-white" style={{ background: 'linear-gradient(135deg, #0061ff, #60efff)' }}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h5 className="mb-0 fw-bold">
                                                        <i className="fas fa-laptop-code me-2"></i>{course.name}
                                                    </h5>
                                                    <span className="badge bg-warning text-dark px-3 py-2 rounded-pill shadow-sm small">
                                                        ⏳ {course.duration} Month{course.duration > 1 ? "s" : ""}
                                                    </span>
                                                </div>
                                                <p className="mb-0 mt-2 small text-white fw-bolder">{course.description}</p>
                                            </div>

                                            <div className="table-responsive rounded-3 overflow-hidden mb-3 shadow-sm border border-1 border-primary-subtle">
                                                <table className="table table-sm text-start mb-0 bg-white">
                                                    <thead>
                                                        <tr>
                                                            <th colSpan={columnsPerRow} className="py-2 fs-6 text-center">
                                                                📘 <span className="fw-bold">Course Subjects</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[...Array(Math.ceil(course.subjects.length / columnsPerRow))].map((_, rowIndex) => (
                                                            <tr key={rowIndex}>
                                                                {[...Array(columnsPerRow)].map((_, colIndex) => {
                                                                    const subject = course.subjects[rowIndex * columnsPerRow + colIndex];
                                                                    return (
                                                                        <td key={colIndex} className="ps-2 text-truncate border-end border-light">
                                                                            {subject?.name ? (
                                                                                <>
                                                                                    <i className="fas fa-check-circle text-success me-2"></i>
                                                                                    {subject.name}
                                                                                </>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </td>

                                                                    );
                                                                })}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="text-end">
                                                <Link to="/AdmissionForm" className="btn btn-primary btn-sm px-3 rounded-pill shadow-sm">
                                                    <i className="fas fa-paper-plane me-2"></i>Apply Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <style>{`
                        .card-title {
                            font-size: 1.2rem;
                        }
                        .text-truncate {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .table th, .table td {
                            vertical-align: middle !important;
                        }
                    `}</style>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CommanCourse;
