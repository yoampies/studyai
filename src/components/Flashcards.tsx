import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { IFlashcardsProps } from '../core/types';

const Flashcards: React.FC<IFlashcardsProps> = ({ flashcards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-[#6e6388] text-base font-normal">
          No hay tarjetas de estudio disponibles.
        </p>
      </div>
    );
  }

  const currentCard = flashcards[currentCardIndex];
  const progressPercentage = ((currentCardIndex + 1) / flashcards.length) * 100;

  useEffect(() => {
    setIsFlipped(false);
    if (frontRef.current && backRef.current) {
      gsap.set(frontRef.current, { rotationY: 0 });
      gsap.set(backRef.current, { rotationY: -180 });
    }
  }, [currentCardIndex]);

  useEffect(() => {
    if (isFlipped) {
      gsap.to(frontRef.current, { rotationY: 180, duration: 0.6, ease: "power2.inOut" });
      gsap.to(backRef.current, { rotationY: 0, duration: 0.6, ease: "power2.inOut" });
    } else {
      gsap.to(frontRef.current, { rotationY: 0, duration: 0.6, ease: "power2.inOut" });
      gsap.to(backRef.current, { rotationY: -180, duration: 0.6, ease: "power2.inOut" });
    }
  }, [isFlipped]);

  const handleNextCard = () => {
    if (cardContainerRef.current) {
      gsap.to(cardContainerRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
          gsap.fromTo(
            cardContainerRef.current,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3 }
          );
        },
      });
    }
  };

  const handlePreviousCard = () => {
    if (cardContainerRef.current) {
      gsap.to(cardContainerRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
          gsap.fromTo(
            cardContainerRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3 }
          );
        },
      });
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Flashcards
      </h2>
      
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
          <p className="text-[#111418] text-base font-medium leading-normal">Progress</p>
          <p className="text-[#60748a] text-sm font-normal leading-normal">{`${currentCardIndex + 1} of ${flashcards.length}`}</p>
        </div>
        <div className="rounded bg-[#dbe0e6] h-2">
          <div
            className="h-full rounded bg-[#111418] transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="p-4 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div
          ref={cardContainerRef}
          className="relative w-full h-80 transition-all"
          style={{ perspective: '1000px' }}
        >
          <div 
            ref={frontRef} 
            className="card-face absolute inset-0 w-full h-full bg-[#f3f4f6] text-[#111827] flex items-center justify-center p-8 rounded-xl shadow-lg"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-2xl font-bold text-center">
              {currentCard.front}
            </p>
          </div>

          <div 
            ref={backRef} 
            className="card-face absolute inset-0 w-full h-full bg-white text-[#111827] flex items-center justify-center p-8 rounded-xl shadow-lg"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(-180deg)' }}
          >
            <p className="text-2xl font-semibold text-center">
              {currentCard.back}
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-[#60748a] text-sm font-normal pb-3 pt-1 text-center">
        Click to flip
      </p>

      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
          <button
            onClick={(e) => { e.stopPropagation(); handlePreviousCard(); }}
            disabled={currentCardIndex === 0}
            className={`flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#f1f0f4] text-[#131118] text-sm font-bold transition-opacity ${currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          >
            Previous
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNextCard(); }}
            className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#607afb] text-white text-sm font-bold hover:bg-[#4a63e0]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;