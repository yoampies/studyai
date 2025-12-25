import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { APP_CONFIG } from '../core/config';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import Navbar from '../components/Navbar';
import TabRendering from '../components/TabRendering';
import AudioVisualizer from '../components/AudioVisualizer';
import ErrorBoundary from '../components/ErrorBoundary';
import { IDocDetailsNavigationState, ProcessingOption } from '../core/types';

interface ExtendedNavigationState extends IDocDetailsNavigationState {
  fileObject?: File;
}

const DocDetails: React.FC = () => {
  const location = useLocation();
  const state = location.state as ExtendedNavigationState;

  const [activeTool, setActiveTool] = useState<ProcessingOption>('Summary');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // SOLUCIÓN HOOKS: Instanciamos el plugin de forma estable al inicio
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    let url: string | null = null;
    if (state?.fileObject && state.fileObject.type === 'application/pdf') {
      url = URL.createObjectURL(state.fileObject);
      setPdfUrl(url);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
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
            <ErrorBoundary componentName="Original Content Viewer">
              {analysis.type === 'file' ? (
                <>
                  {state.fileObject?.type === 'application/pdf' && pdfUrl ? (
                    <Worker workerUrl={APP_CONFIG.PDF_WORKER_URL}>
                      <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                    </Worker>
                  ) : state.fileObject?.type.includes('audio') ? (
                    <div className="h-full flex items-center justify-center bg-[#f1f0f4] p-10">
                      <AudioVisualizer file={state.fileObject} />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-white p-10 text-center">
                      <p className="text-lg font-medium">Original file not in memory.</p>
                      <p className="text-sm opacity-70">
                        Re-upload from Home to view side-by-side.
                      </p>
                    </div>
                  )}
                </>
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
            </ErrorBoundary>
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
            <ErrorBoundary componentName="AI Results Viewer">
              <TabRendering tab={activeTool} results={results} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocDetails;
