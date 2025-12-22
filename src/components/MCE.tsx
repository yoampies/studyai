import React, { useState } from 'react';
import { IMCEProps } from '../core/types';

const MCE: React.FC<IMCEProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center text-[#131118] text-lg font-bold px-4 py-10">
        No hay preguntas disponibles para el examen.
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div>
      <h2 className="text-[#131118] text-[22px] font-bold px-4 pb-3 pt-5">Exam</h2>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex justify-between">
          <p className="font-medium">Progress</p>
          <p className="text-sm">{`${Math.round(progressPercentage)}%`}</p>
        </div>
        <div className="rounded bg-[#dedce5] h-2">
          <div className="h-full rounded bg-[#131118]" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <h2 className="text-lg font-bold px-4 pt-4">{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</h2>
      <p className="text-base px-4 py-2">{currentQuestion.questionText}</p>

      <div className="flex flex-col gap-3 p-4">
        {currentQuestion.options.map((option, index) => (
          <label key={index} className="flex items-center gap-4 rounded-lg border border-[#dedce5] p-4 cursor-pointer hover:bg-gray-50">
            <input type="radio" name={currentQuestion.id} value={option.text} className="h-5 w-5" />
            <p className="text-sm font-medium">{option.text}</p>
          </label>
        ))}
      </div>

      <div className="flex justify-between px-4 py-3">
        <button 
          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          disabled={currentQuestionIndex === 0}
          className="px-4 h-10 bg-[#f1f0f4] rounded-lg font-bold disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          onClick={() => currentQuestionIndex < questions.length - 1 ? setCurrentQuestionIndex(prev => prev + 1) : alert('Finished!')}
          className="px-4 h-10 bg-[#607afb] text-white rounded-lg font-bold"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default MCE;