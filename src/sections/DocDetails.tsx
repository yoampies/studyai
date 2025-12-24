import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import Navbar from '../components/Navbar';
import TabRendering from '../components/TabRendering';
import { IDocDetailsNavigationState, ProcessingOption } from '../core/types';

interface ExtendedNavigationState extends IDocDetailsNavigationState {
  fileObject?: File;
}

const DocDetails: React.FC = () => {
  const location = useLocation();
  const state = location.state as ExtendedNavigationState;

  // Corrección: Tipado explícito en lugar de string genérico
  const [activeTool, setActiveTool] = useState<ProcessingOption>('Summary');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (state?.fileObject) {
      const url = URL.createObjectURL(state.fileObject);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [state?.fileObject]);

  if (!state?.analysis) {
    return (
      <div className="p-20 text-center">
        No data found.{' '}
        <Link to="/history" className="text-blue-500">
          Go back
        </Link>
      </div>
    );
  }

  const { analysis, results } = state;

  return (
    <div className="flex flex-col h-screen bg-white font-inter">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:flex flex-[1.2] flex-col border-r border-[#dedce5] bg-[#525659]">
          <div className="bg-white p-4 border-b border-[#dedce5] flex justify-between items-center">
            <h2 className="font-bold text-[#131118] truncate">{analysis.title}</h2>
          </div>

          <div className="flex-1 overflow-hidden relative">
            {analysis.type === 'file' ? (
              pdfUrl ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                </Worker>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white p-10 text-center">
                  <p className="text-lg font-medium">Original PDF not in memory.</p>
                  <p className="text-sm opacity-70">
                    For security, PDFs are not saved in local storage. Please re-upload from Home to
                    view side-by-side.
                  </p>
                </div>
              )
            ) : (
              <div className="bg-white h-full p-8 overflow-y-auto">
                <h3 className="text-xs font-bold text-[#6e6388] uppercase tracking-widest mb-4">
                  Original Input
                </h3>
                <p className="text-[#131118] leading-relaxed whitespace-pre-wrap">
                  {analysis.text}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-[400px] bg-white">
          <div className="flex border-b border-[#dedce5] bg-white sticky top-0 z-10">
            {analysis.options.map((option) => (
              <button
                key={option}
                onClick={() => setActiveTool(option)}
                className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${
                  activeTool === option
                    ? 'border-[#607afb] text-[#131118]'
                    : 'border-transparent text-[#6e6388]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabRendering tab={activeTool} results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocDetails;
