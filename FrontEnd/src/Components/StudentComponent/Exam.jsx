import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    setExamData,
    setExmQstns
} from '../../store/reduxStore/student/studentSlice';
import {
    getExams,
    fillExamForm,
    startExam
} from '../../api/studentApi/api';
import StudentFooter from './StudentFooter';
import Marquee from '../HomePage/Marquee';

export default function Exam() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const examData = useSelector(state => state.examDetails);
    const { name, photo } = useSelector(state => state.studentProfileDetails);

    useEffect(() => {
        const fetchExamHandler = async () => {
            try {
                const data = await getExams(false, false);
                dispatch(setExamData(data.message));
            } catch (error) {
                console.error('Exam fetching error:', error);
            }
        };
        fetchExamHandler();
    }, [dispatch]);

    const handleApplyForm = async () => {
        if (!examData?._id) return;
        const response = await fillExamForm(true, examData._id);
        toast.success(response.message);
    };

    const handleStartExam = async () => {
        const response = await startExam(true);
        if (response.ackbool === 1) {
            dispatch(setExmQstns(response.message));
            toast.success('Exam Has Been Started');
            navigate('/Exam-Portal');
        }
    };

    const renderDate = (date) => date ? new Date(date).toLocaleDateString() : '';
    const renderTime = (time) => time ? new Date(time).toLocaleTimeString() : '';

    return (
        <>
            <div className="container-fluid row w-100 m-auto mb-5 mt-35  bg-white shadow-sm py-5">
                <h2 className="text-center fw-bolder text-primary dblue shadow py-3 my-0">
                    <i className="bi bi-card-list fs-2 text-primary fw-bolder"></i> Apply Examination
                </h2>
                <h3 className="text-center p-2 fw-bolder" style={{ color: 'maroon' }}>
                    Welcome to examination dashboard
                </h3>

                {/* Student Photo */}
                <div className="col-md-6 shadow-sm text-center py-3">
                    <img src={photo} alt="Student" width={200} />
                </div>

                {/* Exam Info Table */}
                <div className="col-md-6 shadow py-3">
                    <div className="table-responsive small">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <td>{name}</td>
                                </tr>
                            </thead>
                            {examData && (
                                <tbody>
                                    <tr><th>Course</th><td>{examData.courseName}</td></tr>
                                    <tr><th>Date</th><td>{renderDate(examData.examDate)}</td></tr>
                                    <tr><th>Duration</th><td>{examData.duration} hours</td></tr>
                                    <tr><th>Reporting Time</th><td>{renderTime(examData.reportingTime)}</td></tr>
                                    <tr><th>Start From</th><td>{renderTime(examData.from)}</td></tr>
                                    <tr><th>End At</th><td>{renderTime(examData.to)}</td></tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>

                {/* Guidelines */}
                <div className="col-12 my-2">
                    <h3 className="text-center text-white py-2 HindiFont2" style={{ background: 'maroon' }}>छात्रों के लिए निर्देश</h3>
                    <ul className="ps-3 HindiFont2 small">
                        <li className="my-2">
                            परीक्षा की तारीख, समय और अन्य महत्वपूर्ण जानकारी के लिए कृपया संस्थान की शैक्षिक वेबसाइट पर उपलब्ध अध्ययन-अधिसूचना को समय-समय पर देखें।
                        </li>
                        <li className="my-2">
                            छात्रों को सलाह दी जाती है कि वे परीक्षा से जुड़ी नवीनतम जानकारी के लिए संस्थान की
                            <strong> आधिकारिक वेबसाइट </strong> को नियमित रूप से चेक करते रहें।
                        </li>
                    </ul>
                </div>

                {/* Notice + Scrolling Instructions */}
                <div className="col-md-6 shadow HindiFont2 small">
                    <p className="mt-3">
                        <strong className="text-danger">Note:</strong> अगर छात्र/छात्रा को किसी भी तरह की पूछताछ करनी हो या जानकारी लेनी हो,
                        तो संस्था के नंबर पर कॉल करें या ईमेल के माध्यम से संपर्क करें।
                    </p>
                </div>

                <div className="col-md-6 shadow">
                    <h5 className="text-center w-100 py-1 text-white py-2 HindiFont2" style={{ background: 'maroon' }}>महत्वपूर्ण निर्देश</h5>
                    <div className="scroll-container">
                        <ul className="ps-3 HindiFont2 small">
                            <li className="my-2">सभी छात्रों के लिए कोर्स नोट्स का हस्तलिखित रूप से पूरा होना अनिवार्य है।</li>
                            <li className="my-2">सभी छात्रों की <strong>उपस्थिति कम से कम 80%</strong> होना आवश्यक है।</li>
                            <li className="my-2">परीक्षा के दौरान किसी भी <strong>इलेक्ट्रॉनिक उपकरण</strong> का उपयोग <span className="text-danger fw-semibold">सख्त रूप से निषेध</span> है।</li>
                        </ul>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 py-4">
                    <div className="text-center">
                        <button
                            className="btn btn-lg btn-outline-primary rounded-pill px-4 shadow-sm"
                            onClick={handleApplyForm}
                        >
                            <i className="bi bi-pencil-square me-2"></i> Apply for Examination
                        </button>
                    </div>
                    <div className="text-center">
                        <button
                            className="btn btn-lg btn-primary rounded-pill px-4 shadow-sm"
                            onClick={handleStartExam}
                        >
                            <i className="bi bi-play-circle me-2"></i> Start Examination
                        </button>
                    </div>
                </div>

            </div>

            <StudentFooter />

            {/* Scrolling Style */}
            <style>{`
        .scroll-container {
          height: 150px;
          overflow: hidden;
          position: relative;
        }
        .scroll-container ul {
          position: absolute;
          animation: scroll-up 10s linear infinite;
        }
        @keyframes scroll-up {
          0% { top: 100%; }
          100% { top: -100%; }
        }
      `}</style>
        </>
    );
}
