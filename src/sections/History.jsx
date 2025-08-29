// src/components/History.jsx

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { RECENT_DOCUMENTS } from '../assets/constants';

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
  </svg>
);

const CaretRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
  </svg>
);

function History() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const filterFromUrl = searchParams.get('filter');
  let initialFilter = 'All';

  if (filterFromUrl) {
    if (filterFromUrl === 'summaries') initialFilter = 'Summary';
    if (filterFromUrl === 'quizzes') initialFilter = 'Quiz';
    if (filterFromUrl === 'flashcards') initialFilter = 'Flashcards';
  }

  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    let newFilter = 'All';
    const filterFromUrl = searchParams.get('filter');
    if (filterFromUrl) {
      if (filterFromUrl === 'summaries') newFilter = 'Summary';
      if (filterFromUrl === 'quizzes') newFilter = 'Quiz';
      if (filterFromUrl === 'flashcards') newFilter = 'Flashcards';
    }
    setActiveFilter(newFilter);
  }, [searchParams]);

  const handleFilterClick = (filterName) => {
    let urlFilterName = filterName.toLowerCase();
    if (urlFilterName === 'summary') urlFilterName = 'summaries';
    if (urlFilterName === 'quiz') urlFilterName = 'quizzes';
    setSearchParams({ filter: urlFilterName });
  };

  const getButtonClasses = (filterName) => {
    const baseClasses = "flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 text-sm font-medium leading-normal cursor-pointer";
    if (activeFilter === filterName) {
      return `${baseClasses} bg-[#607afb] text-white`;
    }
    return `${baseClasses} bg-[#f1f0f4] text-[#131118]`;
  };

  const filteredDocuments = RECENT_DOCUMENTS.filter(document => {
    if (activeFilter === 'All') {
      return true;
    }
    return document.tools.includes(activeFilter);
  });

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-inter">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#131118] tracking-light text-[32px] font-bold leading-tight">History</p>
                <p className="text-[#6e6388] text-sm font-normal leading-normal">Review your past study sessions and documents.</p>
              </div>
            </div>

            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-[#6e6388] flex border-none bg-[#f1f0f4] items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search documents"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#131118] focus:outline-0 focus:ring-0 border-none bg-[#f1f0f4] focus:border-none h-full placeholder:text-[#6e6388] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    defaultValue=""
                  />
                </div>
              </label>
            </div>

            <div className="flex gap-3 p-3 flex-wrap pr-4">
              <div className={getButtonClasses('All')} onClick={() => handleFilterClick('All')}>
                <p className="text-sm font-medium leading-normal">All</p>
              </div>
              <div className={getButtonClasses('Summary')} onClick={() => handleFilterClick('Summary')}>
                <p className="text-sm font-medium leading-normal">Summary</p>
              </div>
              <div className={getButtonClasses('Quiz')} onClick={() => handleFilterClick('Quiz')}>
                <p className="text-sm font-medium leading-normal">Quiz</p>
              </div>
              <div className={getButtonClasses('Flashcards')} onClick={() => handleFilterClick('Flashcards')}>
                <p className="text-sm font-medium leading-normal">Flashcards</p>
              </div>
            </div>

            <h2 className="text-[#131118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Recent Documents</h2>

            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((document, index) => (
                <Link 
                  key={index} 
                  to="/details/history" // Updated path to a more general "history" or similar.
                  state={{ documentData: document }} // Pass the entire document object
                  className="flex gap-4 bg-white px-4 py-3 justify-between cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-[#131118] flex items-center justify-center rounded-lg bg-[#f1f0f4] shrink-0 size-12">
                      <FileIcon />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-[#131118] text-base font-medium leading-normal">{document.title}</p>
                      <p className="text-[#6e6388] text-sm font-normal leading-normal">Tools: {document.tools.join(', ')}</p>
                      <p className="text-[#6e6388] text-sm font-normal leading-normal">Processed on: {document.processedOn}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <div className="text-[#131118] flex size-7 items-center justify-center">
                      <CaretRightIcon />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-[#6e6388] mt-8">No documents found for this filter.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;