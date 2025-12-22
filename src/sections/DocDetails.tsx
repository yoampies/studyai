// src/sections/DocDetails.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TabRendering from '../components/TabRendering';
import { DUMMY_DOCUMENTS } from '../assets/constants';
import { 
  IAnalysis, 
  IAnalysisResults, 
  IDocDetailsNavigationState, 
  ProcessingOption 
} from '../core/types';

function DocDetails() {
  const location = useLocation();
  const { docId } = useParams<{ docId: string }>();
  
  const [analysisData, setAnalysisData] = useState<IAnalysis | null>(null);
  const [resultsData, setResultsData] = useState<IAnalysisResults | null>(null);
  const [activeTool, setActiveTool] = useState<ProcessingOption | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDocument = () => {
      const state = location.state as IDocDetailsNavigationState;
      if (state?.analysis) {
        updateStates(state.analysis, state.results);
        return;
      }

      if (docId) {
        const storedHistory: IAnalysis[] = JSON.parse(localStorage.getItem('studyHistory') || '[]');
        const allDocs = [...storedHistory, ...DUMMY_DOCUMENTS];
        const found = allDocs.find(doc => doc.id === docId);

        if (found) {
          updateStates(found, found.results);
        }
      }
      setLoading(false);
    };

    const updateStates = (analysis: IAnalysis, results: IAnalysisResults) => {
      setAnalysisData(analysis);
      setResultsData(results);
      
      if (analysis.options.includes('Summary')) {
        setActiveTool('Summary');
      } else if (analysis.options.length > 0) {
        setActiveTool(analysis.options[0]);
      }
      setLoading(false);
    };

    fetchDocument();
  }, [location.state, docId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#607afb]"></div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="flex justify-center items-center h-screen flex-col p-4 bg-white text-center">
        <h1 className="text-[#131118] text-2xl font-bold mb-6">Analysis not found</h1>
        <Link 
          to="/history"
          className="min-w-[150px] rounded-lg h-10 px-4 bg-[#607afb] text-white font-bold flex items-center justify-center hover:bg-[#4a63e0] transition-colors"
        >
          Back to History
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden font-inter">
      <Navbar />
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <h1 className="text-[#131118] text-[32px] font-bold leading-tight">
              {analysisData.title}
            </h1>
          </div>

          <div className="pb-3">
            <div className="flex border-b border-[#dedce5] px-4 gap-8">
              {analysisData.options.map((tool) => (
                <button
                  key={tool}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 cursor-pointer transition-all ${
                    tool === activeTool ? "border-b-[#131118] text-[#131118]" : "border-b-transparent text-[#6e6388]"
                  }`}
                  onClick={() => setActiveTool(tool)}
                >
                  <span className="text-sm font-bold uppercase tracking-wider">{tool}</span>
                </button>
              ))}
            </div>
          </div>

          <main className="flex-1">
            <TabRendering tab={activeTool} results={resultsData} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DocDetails;