import React, { useState, useEffect, useRef } from 'react';
import MCE from './MCE';
import Flashcards from './Flashcards';
import { ITabRenderingProps, AsyncSummaryGenerator } from '../core/types';
import { simulateSummaryStreaming } from '../sections/Upload';

const TabRendering: React.FC<ITabRenderingProps> = ({ tab, results }) => {
  const [streamingSummary, setStreamingSummary] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  // CONTROL SENIOR: ID único para la ejecución actual del streaming
  const executionIdRef = useRef<number>(0);

  useEffect(() => {
    // 1. Invalidamos cualquier ejecución anterior incrementando el ID
    const currentId = ++executionIdRef.current;

    // 2. Limpiamos estado visual
    setStreamingSummary('');

    if (tab === 'Summary' && results?.summary) {
      startStreaming(results.summary, currentId);
    }

    // 3. Cleanup: Si el usuario cambia de tab rápido, invalidamos el proceso
    return () => {
      executionIdRef.current = 0;
    };
  }, [tab, results?.summary]);

  async function startStreaming(text: string, processId: number) {
    setIsStreaming(true);

    try {
      const generator: AsyncSummaryGenerator = simulateSummaryStreaming(text);

      for await (const word of generator) {
        // 4. CHECK DE SEGURIDAD:
        // Si el ID de este proceso no coincide con el ID actual del componente, abortamos.
        // Esto mata silenciosamente la ejecución "fantasma" del Strict Mode.
        if (processId !== executionIdRef.current) {
          return;
        }

        setStreamingSummary((prev) => prev + word);
      }
    } catch (error) {
      console.error('Streaming error:', error);
    } finally {
      // Solo quitamos el loading si este proceso sigue siendo el válido
      if (processId === executionIdRef.current) {
        setIsStreaming(false);
      }
    }
  }

  switch (tab) {
    case 'Summary':
      return (
        <div className="flex flex-col">
          <h2 className="text-[#131118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Summary
          </h2>
          {results?.summary ? (
            <>
              <p className="text-[#131118] text-base font-normal leading-normal pb-3 pt-1 px-4 min-h-[100px] whitespace-pre-wrap">
                {streamingSummary}
                {isStreaming && (
                  <span className="inline-block w-2 h-5 ml-1 bg-[#607afb] animate-pulse align-middle" />
                )}
              </p>

              <h2 className="text-[#131118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                AI Chatbot
              </h2>
              <div className="flex items-center px-4 py-3 gap-3 @container">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0 border border-[#f1f0f4]"
                  style={{
                    backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix")',
                  }}
                ></div>
                <label className="flex flex-col min-w-40 h-12 flex-1">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                    <input
                      placeholder="Ask me anything about this summary..."
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#131118] focus:outline-0 focus:ring-0 border-none bg-[#f1f0f4] px-4 text-base font-normal leading-normal"
                    />
                    <div className="flex border-none bg-[#f1f0f4] items-center justify-center pr-4 rounded-r-lg">
                      <button className="min-w-[84px] cursor-pointer rounded-lg h-8 px-4 bg-[#607afb] text-white text-sm font-medium hover:bg-[#4a63e0] transition-colors">
                        Send
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            </>
          ) : (
            <p className="text-[#6e6388] text-base font-normal leading-normal pb-3 pt-1 px-4">
              No summary available.
            </p>
          )}
        </div>
      );
    case 'Quiz':
      return <MCE questions={results?.quiz || []} />;
    case 'Flashcards':
      return <Flashcards flashcards={results?.flashcards || []} />;
    default:
      return null;
  }
};

export default TabRendering;
