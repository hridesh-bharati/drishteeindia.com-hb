import { toast } from "react-toastify";
import { postData } from '../../../../../../api/tools/apiTools'
import { useState } from "react";
const baseUrl = "http://localhost:3000/admin";
export default function PushQuestionPaper(props) {
    const examId = props.examId;
    const [maxMarks, setMaxMarks] = useState(0);
    const [totalQuestions, seTotalQuestions] = useState(0);
    const pshPprHandler = async () => {
        const token = localStorage.getItem('aToken');
        const rspns = await postData(baseUrl, "/pushQuestionPaper", { examId, maxMarks, totalQuestions }, { 'Authorization': token, 'Content-Type': "application/json" });
        if (rspns.ackbool == 1) {
            toast.success(rspns.message);
        }
    }
    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-body">
                    <input type="number" className="my-1" placeholder="maximum mark" value={maxMarks} onChange={(e) => { setMaxMarks(parseInt(e.target.value)) }} />
                    <input type="number" className="my-1" placeholder="Total questions" value={totalQuestions} onChange={(e) => { seTotalQuestions(parseInt(e.target.value)) }} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={pshPprHandler}>Save </button>
                </div>
            </div>
        </div>
    )
}
