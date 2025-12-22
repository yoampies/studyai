import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { gsap } from 'gsap';

import Navbar from '../components/Navbar';
import SectionRendering from '../components/SectionRendering';
import { useStudyStore } from '../core/store/useStudy';
import { 
  IAnalysis, 
  IAnalysisResults, 
  AnalysisType, 
  ProcessingOption 
} from '../core/types';

const MOCK_AI_RESPONSES: IAnalysisResults = {
  summary: "Este es un resumen simulado de la IA. Cubre los puntos principales destacando conceptos clave.",
  quiz: [
    {
      id: uuidv4(),
      questionText: "¿Cuál es el concepto principal discutido?",
      options: [
        { text: "Concepto A", isCorrect: false },
        { text: "Concepto B", isCorrect: true }
      ]
    }
  ],
  flashcards: [{ id: uuidv4(), front: "Término 1", back: "Definición del Término 1." }]
};

const simulateAIProcessing = (options: ProcessingOption[]): Promise<IAnalysisResults> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const results: IAnalysisResults = {};
      options.forEach(opt => {
        if (opt === "Summary") results.summary = MOCK_AI_RESPONSES.summary;
        if (opt === "Quiz") results.quiz = MOCK_AI_RESPONSES.quiz;
        if (opt === "Flashcards") results.flashcards = MOCK_AI_RESPONSES.flashcards;
      });
      resolve(results);
    }, 2500);
  });
};

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const addAnalysis = useStudyStore((state) => state.addAnalysis);
  
  const [tab, setTab] = useState<AnalysisType>("text");
  const [fileName, setFileName] = useState("");
  const [textInput, setTextInput] = useState("");
  const [processingOptions, setProcessingOptions] = useState<ProcessingOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const state = location.state as { file?: string };
    if (state?.file) {
      setTab("file");
      setFileName(state.file);
    }
  }, [location.state]);

  useEffect(() => {
    if (isLoading && loaderRef.current) {
      gsap.to(loaderRef.current, { rotation: 360, duration: 1, repeat: -1, ease: "linear" });
    }
  }, [isLoading]);

  const handleCheckboxChange = (option: ProcessingOption) => {
    setProcessingOptions(prev => 
      prev.includes(option) ? prev.filter(i => i !== option) : [...prev, option]
    );
  };

  const isFormValid = () => (tab === "text" ? textInput.trim() : fileName.trim()) && processingOptions.length > 0;

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setIsLoading(true);
    const analysisID = uuidv4();

    try {
      const results = await simulateAIProcessing(processingOptions);
      const newAnalysis: IAnalysis = {
        id: analysisID,
        type: tab,
        title: tab === "file" ? fileName : "New Text Analysis",
        file: tab === "file" ? fileName : null,
        text: tab === "text" ? textInput : null,
        options: processingOptions,
        results,
        processedOn: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };

      addAnalysis(newAnalysis); // Guardado vía Zustand (Persistido)
      navigate(`/details/${analysisID}`, { state: { analysis: newAnalysis, results } });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white font-inter">
      <Navbar />
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h1 className="text-[#131118] text-[32px] font-bold p-4">What would you like to study?</h1>
          
          <div className="flex px-4 py-3">
            <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-[#f1f0f4] p-1">
              {(["text", "file"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTab(type)}
                  className={`flex-1 h-full rounded-lg text-sm font-medium capitalize transition-all ${tab === type ? "bg-white shadow-sm text-[#131118]" : "text-[#6e6388]"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-48">
              <div ref={loaderRef} className="h-12 w-12 border-4 border-t-[#607afb] border-[#f1f0f4] rounded-full"></div>
              <p className="mt-4 font-medium">Analyzing content with AI...</p>
            </div>
          ) : (
            <SectionRendering 
              section={tab} 
              onFileNameChange={setFileName} 
              onTextInputChange={setTextInput} 
              fileName={fileName} 
              textInput={textInput} 
            />
          )}

          <h3 className="text-lg font-bold px-4 pt-6">Processing Options</h3>
          <div className="px-4 flex flex-col gap-2">
            {(["Summary", "Quiz", "Flashcards"] as ProcessingOption[]).map((opt) => (
              <label key={opt} className="flex gap-3 py-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-[#dedce5] text-[#607afb] focus:ring-[#607afb]"
                  checked={processingOptions.includes(opt)}
                  onChange={() => handleCheckboxChange(opt)}
                  disabled={isLoading}
                />
                <span className="text-base text-[#131118]">{opt}</span>
              </label>
            ))}
          </div>

          <div className="flex px-4 py-6 justify-end">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid() || isLoading}
              className={`min-w-[120px] rounded-lg h-12 px-6 text-white font-bold transition-all ${isFormValid() && !isLoading ? 'bg-[#607afb] hover:bg-[#4a63e0]' : 'bg-[#c3c4c9] cursor-not-allowed'}`}
            >
              Start Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;