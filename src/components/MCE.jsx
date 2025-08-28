import React, {useState} from 'react'
import { exam_questions } from '../assets/constants'

function MCE() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    // Check if there are more questions to show
    if (currentQuestionIndex < exam_questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // You can add logic here for when the exam is finished, e.g., show results
      alert('¡Has completado el examen!');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Get the current question based on the state
  const currentQuestion = exam_questions[currentQuestionIndex];
  const totalQuestions = exam_questions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div>
      <h2 className="text-[#131118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Exam
      </h2>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
          <p className="text-[#131118] text-base font-medium leading-normal">Progress</p>
          <p className="text-[#131118] text-sm font-normal leading-normal">{`${Math.round(progressPercentage)}%`}</p>
        </div>
        <div className="rounded bg-[#dedce5]">
          <div className="h-2 rounded bg-[#131118]" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <h2 className="text-[#131118] text-lg font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-2 pt-4">
        {`Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
      </h2>
      <p className="text-[#131118] text-base font-normal leading-normal pb-3 pt-1 px-4">
        {currentQuestion.questionText}
      </p>

      <div className="flex flex-col gap-3 p-4">
        {currentQuestion.options.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-4 rounded-lg border border-solid border-[#dedce5] p-[15px]"
          >
            <input
              type="radio"
              className="h-5 w-5 border-2 border-[#dedce5] bg-transparent text-transparent checked:border-[#131118] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#131118]"
              name={currentQuestion.id} // Use the unique question ID for the radio group name
              // You can add a value and an onChange handler here to capture the user's answer
              value={option.text}
            />
            <div className="flex grow flex-col">
              <p className="text-[#131118] text-sm font-medium leading-normal">
                {option.text}
              </p>
            </div>
          </label>
        ))}
      </div>

      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f1f0f4] text-[#131118] text-sm font-bold leading-normal tracking-[0.015em] ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="truncate">Previous</span>
          </button>
          <button
            onClick={handleNextQuestion}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 
            bg-[#607afb] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MCE