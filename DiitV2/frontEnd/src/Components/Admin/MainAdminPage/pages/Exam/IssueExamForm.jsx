import React, { useEffect, useState } from 'react'
import { issueExamForm, getCourseList } from '../../../../../api/adminApi/api';
import { toast } from 'react-toastify';
export default function IssueExamForm() {
    const [courseList, setCourseList] = useState("");
    const [courseName, setCourseName] = useState("");
    const [examDate, setExamDate] = useState("");
    const [duration, setDuration] = useState("");
    const [reportingTime, setReportingTime] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const getCourseListHandler = async () => {
        const rspns = await getCourseList();
        if (rspns.ackbool == 1) {
            const courses = rspns.message;
            var coursesName = [];
            courses.forEach(course => {
                coursesName.push(course.name);
            });
            setCourseList(coursesName)
            console.log(coursesName)

        }
    }
    const issueExamFormHandler = async () => {
        console.log(courseList);
        const rspns = await issueExamForm(courseName, examDate, duration, reportingTime, from, to);
        toast.success(rspns.message);
        console.log("duration", duration)
    }
    return (
        <>
            <div className="container my-4 myshadow bg-white py-4 ">
                <h2 className="text-center fw-bolder text-primary">Issus Exam's Date</h2>
                <div className="mb-3 row Questionpaper">
                    <div className="col-md-6 my-2">
                        <span>Course</span>
                        <select className='form-control' onClick={getCourseListHandler} onChange={async (e) => setCourseName(e.target.value)}>
                            <option value="Select course">Select course</option>8
                            {courseList && courseList.map((name) => {
                                return (
                                    <option key={name} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-6 my-2">
                        <span>Exam's Date</span>
                        <input type="date" className="form-control" onChange={(e) => { setExamDate(e.target.value) }} />
                    </div>
                    <div className="col-md-6 my-2">
                        <span>Duration</span>
                        <input type="number" className="form-control" placeholder='total exam duration' max={2.5} onChange={(e) => { setDuration(e.target.value) }} />
                    </div>
                    <div className="col-md-6 my-2">
                        <span>Exam reporting time</span>
                        <input type="datetime-local" className="form-control" onChange={(e) => { setReportingTime(e.target.value) }} />

                    </div>
                    <div className="col-md-6 my-2">
                        <span>Exam starting time</span>
                        <input type="datetime-local" className="form-control" placeholder="starting time" onChange={(e) => { setFrom(e.target.value) }} />
                    </div>
                    <div className="col-md-6 my-2">
                        <span>Exam ending time</span>
                        <input type="datetime-local" className="form-control" placeholder="closing time" onChange={(e) => { setTo(e.target.value) }} />

                    </div>
                    <div className="col-12 text-center my-4" >
                        <button className="btn btn-primary btn-sm mt-1 px-3" onClick={issueExamFormHandler}>  Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
