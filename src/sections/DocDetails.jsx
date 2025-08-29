import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TabRendering from '../components/TabRendering';

function DocDetails() {
  const location = useLocation();
  const [documentData, setDocumentData] = useState(null);
  const [activeTool, setActiveTool] = useState(null);

  useEffect(() => {
    // Check if the state object exists and contains documentData
    if (location.state && location.state.documentData) {
      const data = location.state.documentData;
      setDocumentData(data);

      // Set the first available tool as the default active tab
      if (data.tools && data.tools.length > 0) {
        setActiveTool(data.tools[0]);
      }
    }
  }, [location.state]);

  if (!documentData) {
    return (
      <div className="flex justify-center items-center h-screen flex-col p-4">
        <h1 className="text-[#131118] text-2xl font-bold text-center mb-4">Processing not available. Please go back to history to check other analyses.</h1>
        <Link 
          to="/history"
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 border border-[#131118] text-[#131118] text-sm font-bold leading-normal tracking-[0.015em]"
        >
          Go to History
        </Link>
      </div>
    );
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-['Inter, Noto Sans, sans-serif']"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#131118] tracking-light text-[32px] font-bold leading-tight min-w-72">
                {documentData.title}
              </p>
            </div>
            <div className="pb-3">
              <div className="flex border-b border-[#dedce5] px-4 gap-8">
                {/* Render tabs based on the 'tools' array from the history item */}
                {documentData.tools.map((tool) => (
                  <a
                    key={tool}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 cursor-pointer ${
                      tool === activeTool
                        ? "border-b-[#131118] text-[#131118]"
                        : "border-b-transparent text-[#6e6388]"
                    }`}
                    onClick={() => setActiveTool(tool)}
                  >
                    <p
                      className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                        tool === activeTool ? "text-[#131118]" : "text-[#6e6388]"
                      }`}
                    >
                      {tool}
                    </p>
                  </a>
                ))}
              </div>
            </div>
            {/* Pass the selected tool to TabRendering */}
            <TabRendering tab={activeTool} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocDetails;