import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useHistoryFilter } from '../hooks/useHistoryFilter';
import { HistoryFilter, IDocDetailsNavigationState } from '../core/types';

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
  </svg>
);

const CaretRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
  </svg>
);

const History: React.FC = () => {
  const { searchTerm, setSearchTerm, activeFilter, handleFilterClick, filteredDocuments } =
    useHistoryFilter();

  const getButtonClasses = (filterName: HistoryFilter) => {
    const base =
      'flex h-8 items-center justify-center gap-x-2 rounded-lg px-4 text-sm font-medium cursor-pointer transition-colors';
    return activeFilter === filterName
      ? `${base} bg-[#607afb] text-white`
      : `${base} bg-[#f1f0f4] text-[#131118] hover:bg-[#e2e1e9]`;
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden font-inter">
      <Navbar />
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-[#131118] text-[32px] font-bold leading-tight">History</h1>
              <p className="text-[#6e6388] text-sm font-normal">
                Review your past study sessions and documents.
              </p>
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="flex h-12 w-full items-stretch rounded-lg bg-[#f1f0f4]">
              <div className="text-[#6e6388] flex items-center justify-center pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input
                placeholder="Search documents by title..."
                className="flex-1 bg-transparent px-4 text-base outline-none text-[#131118]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 p-3 flex-wrap">
            {(['All', 'Summary', 'Quiz', 'Flashcards'] as HistoryFilter[]).map((f) => (
              <button key={f} className={getButtonClasses(f)} onClick={() => handleFilterClick(f)}>
                {f}
              </button>
            ))}
          </div>

          <h2 className="text-[#131118] text-[22px] font-bold px-4 pb-3 pt-5">Recent Documents</h2>

          <div className="flex flex-col">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <Link
                  key={doc.id}
                  to={`/details/${doc.id}`}
                  state={{ analysis: doc, results: doc.results } as IDocDetailsNavigationState}
                  className="flex gap-4 bg-white px-4 py-3 justify-between hover:bg-[#f8f7f9] border-b border-[#f1f0f4] transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-[#131118] flex items-center justify-center rounded-lg bg-[#f1f0f4] shrink-0 size-12">
                      <FileIcon />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#131118] text-base font-semibold">{doc.title}</p>
                      <p className="text-[#6e6388] text-sm">
                        {new Date(doc.processedOn).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2 mt-1">
                        {doc.options.map((opt) => (
                          <span
                            key={opt}
                            className="text-[10px] bg-[#f1f0f4] px-2 py-0.5 rounded text-[#6e6388]"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-[#131118]">
                    <CaretRightIcon />
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-[#6e6388] text-lg">No matches found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
