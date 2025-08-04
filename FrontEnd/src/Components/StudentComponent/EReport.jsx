import React from 'react';

export default function EReport({ submitted, questions, answers }) {
  if (!submitted) {
    return <p className="text-center">No data to show. Please submit the exam.</p>;
  }

  if (!questions || questions.length === 0) {
    return <p className="text-center">No questions available</p>;
  }
// console.log('====================================');
// console.log(questions);
// console.log('====================================');
  return (
    <div className="mt-4 pt-5 bg-primary">
      <h3 className="text-center">Your Responses</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => {
              const userAnswer = answers.find(ans => ans._id === q._id)?.rsAns || '-';
              return (
                <tr key={q._id}>
                  <td>{index + 1}</td>
                  <td>{q.question}</td>
                  <td className={userAnswer === q.answer ? 'text-success' : 'text-danger'}>
                    {q.options[userAnswer] || 'Not answered'}
                  </td>
                  <td>{q.options[q.answer]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
