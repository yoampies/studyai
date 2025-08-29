import React from 'react';
import MCE from './MCE';
import Flashcards from './Flashcards';

function TabRendering({ tab, results }) {
  switch (tab) {
    case ("Summary"):
      return (
        <>
          <h2 className="text-[#131118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Summary</h2>
          {results?.summary ? (
            <>
              <p className="text-[#131118] text-base font-normal leading-normal pb-3 pt-1 px-4">{results.summary}</p>
              <h2 className="text-[#131118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">AI Chatbot</h2>
              <div className="flex items-center px-4 py-3 gap-3 @container">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_dUMcF5N2lKjicCc0FvFOQVme3m4jKegPGTuUJKRIYjBZp8NZyh-bBkiSF7DzdBiKXcJqYAZhM7t4M9IBky5TE_r5-R0xE96nxtOjsMqICXfmTjdoa9kOX4z4-bAlU7BQ7B85Poz689gj6XOrG6q9cO0XsaXtJDivfYocqRuVVE5t65RClEcGF3FBcMuCJgb4L3uj7v7-KZNZbHS7T5V6nlgVh_VEH6v6SwLimTWVjJJUiP67P1RwWoDKvJ2xJVPR3Hnw9X4RzOsV")' }}
                ></div>
                <label className="flex flex-col min-w-40 h-12 flex-1">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                    <input
                      placeholder="Ask me anything about this summary..."
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#131118] 
                      focus:outline-0 focus:ring-0 border-none bg-[#f1f0f4] focus:border-none h-full placeholder:text-[#6e6388] 
                      px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                    />
                    <div className="flex border-none bg-[#f1f0f4] items-center justify-center pr-4 rounded-r-lg border-l-0 !pr-2">
                      <div className="flex items-center gap-4 justify-end">
                        <button
                          className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 
                          px-4 bg-[#607afb] text-white text-sm font-medium leading-normal hidden @[480px]:block"
                        >
                          <span className="truncate">Send</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </>
          ) : (
            <p className="text-[#6e6388] text-base font-normal leading-normal pb-3 pt-1 px-4">No summary available.</p>
          )}
        </>
      );
    case ("Quiz"):
      return <MCE questions={results?.quiz} />;
    case ("Flashcards"):
      return <Flashcards flashcards={results?.flashcards} />;
    default:
      return null;
  }
}

export default TabRendering;