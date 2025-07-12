import { useState, useEffect } from "react";
import { getQuestions, pushQuestions } from '../../../../../../api/adminApi/api';
import { toast } from "react-toastify";

export default function SendQuestions({ paperId }) {
  const [questions, setQuestions] = useState([]);
  const [oldQuestions, setOldQuestions] = useState([]);
  const [question, setQuestion] = useState({
    question: "",
    options: { a: "", b: "", c: "", d: "" },
    answer: "",
  });

  // Controlled input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["a", "b", "c", "d"].includes(name)) {
      setQuestion((prev) => ({
        ...prev,
        options: { ...prev.options, [name]: value },
      }));
    } else {
      setQuestion((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addQuestion = () => {
    const { question: qText, options, answer } = question;
    if (!qText.trim() || !answer.trim() || Object.values(options).some(opt => !opt.trim())) {
      toast.error("Please fill all question details");
      return;
    }
    setQuestions((prev) => [...prev, question]);
    // Reset form
    setQuestion({ question: "", options: { a: "", b: "", c: "", d: "" }, answer: "" });
  };

  const saveQuestions = async () => {
    if (questions.length === 0) {
      toast.info("No new questions to save");
      return;
    }
    try {
      const response = await pushQuestions({ qPId: paperId, questions });
      if (response.ackbool === 1) {
        toast.success(response.message);
        setQuestions([]);
        fetchOldQuestions();
      } else {
        toast.error("Failed to save questions");
      }
    } catch (error) {
      toast.error("Error saving questions");
      console.error(error);
    }
  };

  const fetchOldQuestions = async () => {
    try {
      const response = await getQuestions(paperId);
      if (response.ackbool === 1) {
        setOldQuestions(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOldQuestions();
  }, [paperId]);

  return (
    <div className="modal-dialog m-0 p-0 pb-5" role="document">
      <div className="modal-content p-0 m-0">
        <div className="modal-body bg-primary-subtle">
          <div className="mb-4">

            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-outline-primary btn-sm mb-2"
                onClick={fetchOldQuestions}
                title="View old questions"
              >
                <i className="bi bi-eye fs-5"></i> View Old Questions ({oldQuestions.length})
              </button>
              <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" />

            </div>
            {oldQuestions.length > 0 && (
              <div className="border rounded p-3 bg-white" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                {oldQuestions.map((q, idx) => (
                  <div key={q._id} className="mb-3 pb-2 border-bottom">
                    <strong>Q{idx + 1}:</strong> {q.question.toUpperCase()} <br />
                    <em>Answer:</em> <u>{q.answer}</u>
                    <ol type="a" className="mb-0 ms-3">
                      <li>{q.options.a}</li>
                      <li>{q.options.b}</li>
                      <li>{q.options.c}</li>
                      <li>{q.options.d}</li>
                    </ol>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-3">
            <h5>New Questions</h5>
            {questions.length === 0 && <p className="text-muted">No new questions added yet.</p>}
            {questions.map((q, idx) => (
              <div key={idx} className="mb-2 p-2 bg-light border rounded">
                <strong>Q{oldQuestions.length + idx + 1}:</strong> {q.question.toUpperCase()} <br />
                <em>Answer:</em> <u>{q.answer}</u>
                <ol type="a" className="mb-0 ms-3">
                  <li>{q.options.a}</li>
                  <li>{q.options.b}</li>
                  <li>{q.options.c}</li>
                  <li>{q.options.d}</li>
                </ol>
              </div>
            ))}
          </div>

          <div className="mb-3 p-2 border rounded bg-white">
            <h5>Add New Question</h5>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter Question"
              name="question"
              value={question.question}
              onChange={handleInputChange}
              autoComplete="off"
            />
            {["a", "b", "c", "d"].map((opt) => (
              <input
                key={opt}
                type="text"
                className="form-control mb-2"
                placeholder={`Option ${opt}`}
                name={opt}
                value={question.options[opt]}
                onChange={handleInputChange}
                autoComplete="off"
              />
            ))}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Correct answer option (e.g. a, b, c, or d)"
              name="answer"
              value={question.answer}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button className="btn btn-primary btn-sm w-100" onClick={addQuestion}>
              Add Question
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={saveQuestions}
            disabled={questions.length === 0}
          >
            Save All Questions
          </button>
        </div>
      </div>
    </div>
  );
}
