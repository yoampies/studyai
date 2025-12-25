import React, { useState, useEffect } from 'react';
import { IFlashcardsProps } from '../core/types';

const Flashcards: React.FC<IFlashcardsProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleFlip = () => setIsFlipped(!isFlipped);

  // Manejo de teclado global para la sección
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ' || e.key === 'Enter') {
        // Evitamos scroll con espacio si el foco está en la carta
        if (document.activeElement?.id === 'flashcard-container') {
          e.preventDefault();
          handleFlip();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped]); // Dependencias para asegurar que usen el estado actual

  if (flashcards.length === 0) return <p>No flashcards available.</p>;

  return (
    <div className="flex flex-col items-center gap-6 py-10 px-4">
      <div
        id="flashcard-container"
        tabIndex={0} // Hace que el contenedor sea enfocable por teclado
        role="button"
        aria-label={`Flashcard ${currentIndex + 1} of ${flashcards.length}. Press Space or Enter to flip.`}
        onClick={handleFlip}
        className="relative w-full max-w-md h-64 cursor-pointer perspective-1000 focus:outline-none focus:ring-4 focus:ring-[#607afb] rounded-xl"
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white border-2 border-[#f1f0f4] rounded-xl flex items-center justify-center p-8 shadow-sm">
            <p className="text-xl font-bold text-[#131118] text-center">
              {flashcards[currentIndex].front}
            </p>
          </div>
          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-[#607afb] rounded-xl flex items-center justify-center p-8 shadow-sm rotate-y-180">
            <p className="text-xl font-bold text-white text-center">
              {flashcards[currentIndex].back}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button
          onClick={handlePrev}
          aria-label="Previous flashcard"
          className="p-3 rounded-full bg-[#f1f0f4] hover:bg-[#e2e1e9] transition-colors focus:ring-2 focus:ring-[#607afb]"
        >
          ←
        </button>
        <span className="font-medium text-[#6e6388]" aria-live="polite">
          {currentIndex + 1} / {flashcards.length}
        </span>
        <button
          onClick={handleNext}
          aria-label="Next flashcard"
          className="p-3 rounded-full bg-[#f1f0f4] hover:bg-[#e2e1e9] transition-colors focus:ring-2 focus:ring-[#607afb]"
        >
          →
        </button>
      </div>

      <p className="text-sm text-[#6e6388] italic">
        Tip: Use Arrow keys to navigate, Space to flip.
      </p>
    </div>
  );
};

export default Flashcards;
