import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Flashcards = ({ flashcards }) => { // Acepta `flashcards` como un prop
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardContainerRef = useRef(null);
  const cardRefs = useRef({ front: null, back: null });

  // Si no hay tarjetas, no renderiza nada o muestra un mensaje
  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-[#6e6388] text-base font-normal leading-normal">
          No hay tarjetas de estudio disponibles.
        </p>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    // Reset rotations for the new card before animating
    gsap.set(cardRefs.current.front, { rotationY: 0 });
    gsap.set(cardRefs.current.back, { rotationY: -180 });
  }, [currentCardIndex]); // Depend on currentCardIndex to re-run on card change

  useEffect(() => {
    if (isFlipped) {
      gsap.to(cardRefs.current.front, { rotationY: 180, duration: 0.6 });
      gsap.to(cardRefs.current.back, { rotationY: 0, duration: 0.6 });
    } else {
      gsap.to(cardRefs.current.front, { rotationY: 0, duration: 0.6 });
      gsap.to(cardRefs.current.back, { rotationY: -180, duration: 0.6 });
    }
  }, [isFlipped]); // Depend on isFlipped to run on flip

  const handleNextCard = () => {
    gsap.to(cardContainerRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        gsap.fromTo(
          cardContainerRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 }
        );
      },
    });
  };

  const handlePreviousCard = () => {
    gsap.to(cardContainerRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        gsap.fromTo(
          cardContainerRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 }
        );
      },
    });
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
          <p className="text-[#111418] text-base font-medium leading-normal">Progress</p>
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
        <div
          ref={cardContainerRef}
          className="relative w-full h-80 transform-style preserve-3d"
        >
          {/* Front of the card */}
          <div ref={(el) => (cardRefs.current.front = el)} className="card-face card-front" style={{ zIndex: 2 }}>
            <p className="text-2xl font-bold text-center">
              {currentCard.front}
            </p>
          </div>

          {/* Back of the card */}
          <div ref={(el) => (cardRefs.current.back = el)} className="card-face card-back" style={{ zIndex: 1 }}>
            <p className="text-2xl font-semibold text-center">
              {currentCard.back}
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