import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { submitAnswer } from '../../api/studentApi/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Greating from './Greating';
import EDuration from './EDuration';

const ExamPortal = () => {
  const questions = useSelector(state => state.exmQstns.questions);
  const examId = useSelector(state => state.exmQstns.examId);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [showHead, setShowHead] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Persist submission status
  useEffect(() => {
    const submittedBefore = localStorage.getItem(`submitted-${examId}`);
    if (submittedBefore) {
      setSubmitted(true);
      setShowTimer(false);
      setShowHead(false);
    }
  }, [examId]);

  const handleOptionChange = (questionId, optionKey) => {
    setAnswers(prev => {
      const idx = prev.findIndex(ans => ans._id === questionId);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { _id: questionId, rsAns: optionKey };
        return updated;
      } else {
        return [...prev, { _id: questionId, rsAns: optionKey }];
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitAnswer(examId, answers);
      toast.success('✅ Answers submitted successfully!');
      localStorage.setItem(`submitted-${examId}`, 'true');
      setSubmitted(true);
      setShowTimer(false);
      setShowHead(false);
    } catch (error) {
      toast.error('❌ Submission failed. Try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeUp = () => {
    if (!submitted) handleSubmit();
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // Auto-submit if tab/window is changed
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !submitted) {
        handleSubmit();
      }
    };

    const handleBlur = () => {
      if (!submitted) {
        handleSubmit();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [submitted, answers]);

  // Safely access current question
  const currentQuestion = !submitted && questions?.[currentIndex];

  return (
    <div className="exam-portal container py-4">
      {showHead && <h4 className="exam-title mb-4">📘 Student Final Examination</h4>}

      {submitted ? (
        <Greating />
      ) : !questions?.length ? (
        <p className="text-center">No questions available</p>
      ) : currentQuestion ? (
        <>
          <div className="question-card shadow-sm p-4 rounded-3 mb-4 bg-white">
            <div className="d-flex justify-content-between text-muted small mb-3">
              <div>{showTimer && <EDuration onTimeUp={handleTimeUp} submitted={submitted} examId={examId} />
              }</div>
              <div>
                Question {currentIndex + 1} / {questions.length}
              </div>
            </div>

            <div className="question-text fs-5 fw-semibold mb-3">
              Q{currentIndex + 1}. {currentQuestion.question}
            </div>

            <div className="options-list d-flex flex-column gap-3">
              {Object.entries(currentQuestion.options).map(([key, val]) => {
                const selected = answers.find(a => a._id === currentQuestion._id)?.rsAns === key;
                return (
                  <label
                    key={key}
                    className={`option p-3 rounded border d-flex align-items-center gap-2 ${selected ? 'active text-white' : 'text-dark'
                      }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion._id}
                      className="d-none"
                      onChange={() => handleOptionChange(currentQuestion._id, key)}
                      checked={selected}
                    />
                    <strong>{key}.</strong> {val}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="d-flex gap-3">
            <button
              className="btn btn-primary flex-fill"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ⬅️ Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                className="btn btn-success flex-fill"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : '✅ Submit'}
              </button>
            ) : (
              <button className="btn btn-primary flex-fill" onClick={handleNext}>
                Next ➡️
              </button>
            )}
          </div>
        </>
      ) : null}

      <ToastContainer />

      <style>{`
        .exam-title {
          color: #2a2a72;
          font-weight: 700;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .option {
          background: #f1f3f5;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          user-select: none;
        }
        .option:hover {
          background: #e7f1ff;
          border-color: #007bff;
        }
        .option.active {
          background: #007bff;
          border-color: #007bff;
        }
        .option.active:hover {
          background: #0056b3;
          border-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ExamPortal;
