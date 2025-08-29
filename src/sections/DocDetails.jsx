// src/sections/DocDetails.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TabRendering from '../components/TabRendering';

function DocDetails() {
  const location = useLocation();
  const { docId } = useParams();
  const [analysisData, setAnalysisData] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let documentFound = false;
    let analysis;
    let results;

    // First, check if data was passed through route state (for a new analysis)
    if (location.state && location.state.analysis) {
      analysis = location.state.analysis;
      results = location.state.results;
      documentFound = true;
    } else if (docId) {
      // If not, search localStorage for the document using its ID
      const storedHistory = JSON.parse(localStorage.getItem('studyHistory')) || [];
      const foundDocument = storedHistory.find(doc => doc.id === docId);

      if (foundDocument) {
        analysis = foundDocument;
        results = foundDocument.results;
        documentFound = true;
      }
    }

    if (documentFound) {
      setAnalysisData(analysis);
      setResultsData(results);
      // Prioritize the Summary tab if it exists, otherwise, select the first option
      if (analysis.options && analysis.options.includes('Summary')) {
        setActiveTool('Summary');
      } else if (analysis.options && analysis.options.length > 0) {
        setActiveTool(analysis.options[0]);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location.state, docId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[#131118] text-xl font-bold">Cargando...</p>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="flex justify-center items-center h-screen flex-col p-4">
        <h1 className="text-[#131118] text-2xl font-bold text-center mb-4">Análisis no encontrado. Por favor, revisa tu historial de estudio.</h1>
        <Link 
          to="/history"
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 border border-[#131118] text-[#131118] text-sm font-bold leading-normal tracking-[0.015em]"
        >
          Ir a Historial
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
                {analysisData.title || "New Text Analysis"}
              </p>
            </div>
            <div className="pb-3">
              <div className="flex border-b border-[#dedce5] px-4 gap-8">
                {analysisData.options.map((tool) => (
                  <a
                    key={tool}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 cursor-pointer ${
                      tool === activeTool ? "border-b-[#131118] text-[#131118]" : "border-b-transparent text-[#6e6388]"
                    }`}
                    onClick={() => setActiveTool(tool)}
                  >
                    <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${tool === activeTool ? "text-[#131118]" : "text-[#6e6388]"}`}>
                      {tool}
                    </p>
                  </a>
                ))}
              </div>
            </div>
            <TabRendering tab={activeTool} results={resultsData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocDetails;