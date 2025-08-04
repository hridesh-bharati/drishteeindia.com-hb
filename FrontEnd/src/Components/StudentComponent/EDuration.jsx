import { toast } from "react-toastify";
import { getAllExams } from "../../api/adminApi/api";
import { useEffect, useState } from "react";

export default function EDuration({ onTimeUp, submitted, examId }) {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [duration, setDuration] = useState(0);

    const fetchAllExamHandler = async () => {
        try {
            const rspns = await getAllExams(false, false);
            setExams(rspns.message);
            const totalDuration = rspns.message[0]?.duration * 3600 || 0;
            setDuration(totalDuration);

            // ✅ Suppress toast if already submitted
            if (!submitted && !localStorage.getItem(`submitted-${examId}`)) {
                toast.success("Exams duration fetched successfully!");
            }
        } catch (error) {
            toast.error("Failed to fetch exams duration.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllExamHandler();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(prevDuration => {
                if (prevDuration > 0) {
                    return prevDuration - 1;
                } else {
                    onTimeUp();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimeUp]);

    return (
        <div className="bg-white p-0 m-0">
            <div className="table-responsive">
                {loading ? (
                    <p>Time is Loading...</p>
                ) : (
                    exams.length > 0 && (
                        <div>
                            <p>Max. Duration: {Math.floor(duration / 3600)} : {Math.floor((duration % 3600) / 60)} : {duration % 60}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
