// src/components/Flashcards.jsx
import React, { useState } from 'react';
import { flashcards } from '../assets/constants'; 

const Flashcards = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Duración de la animación
    }
  };

  const handleNextCard = () => {
    if (!isAnimating) {
      setIsFlipped(false);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setIsAnimating(false);
      }, 500);
    }
  };
  
  const handlePreviousCard = () => {
    if (!isAnimating) {
      setIsFlipped(false);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setIsAnimating(false);
      }, 500);
    }
  };

  const currentCard = flashcards[currentCardIndex];
  const progressPercentage = ((currentCardIndex + 1) / flashcards.length) * 100;

  return (
    <div>
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Flashcards
      </h2>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
          <p className="text-[#111418] text-base font-medium leading-normal">
            Progress
          </p>
          <p className="text-[#60748a] text-sm font-normal leading-normal">{`${currentCardIndex + 1} of ${flashcards.length}`}</p>
        </div>
        <div className="rounded bg-[#dbe0e6]">
          <div
            className="h-2 rounded bg-[#111418] transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="p-4 cursor-pointer" onClick={handleFlip}>
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
          {/* Front of the card */}
          <div className="card-face card-front">
            <p className="text-2xl font-bold text-center">
              {currentCard.question}
            </p>
          </div>

          {/* Back of the card */}
          <div className="card-face card-back">
            <p className="text--2xl font-semibold text-center">
              {currentCard.answer}
            </p>
          </div>
        </div>
      </div>
      <p className="text-[#60748a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
        Click to flip
      </p>

      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
          <button
            onClick={handlePreviousCard}
            disabled={currentCardIndex === 0}
            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f1f0f4] text-[#131118] text-sm font-bold leading-normal tracking-[0.015em] ${currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="truncate">Previous</span>
          </button>
          <button
            onClick={handleNextCard}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#607afb] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;