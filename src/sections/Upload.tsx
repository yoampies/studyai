// src/sections/Upload.tsx
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import SectionRendering from '../components/SectionRendering';
import { handlingOptions } from '../assets/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { gsap } from 'gsap';
import { 
  IAnalysis, 
  IAnalysisResults, 
  AnalysisType, 
  ProcessingOption
} from '../core/types';

const MOCK_AI_RESPONSES: IAnalysisResults = {
  summary: "Este es un resumen simulado de la IA. Cubre los puntos principales del texto/archivo de entrada, destacando los conceptos clave para un estudio eficiente.",
  quiz: [
    {
      id: uuidv4(),
      questionText: "¿Cuál es el concepto principal discutido en el texto?",
      options: [
        { text: "Concepto A", isCorrect: false },
        { text: "Concepto B", isCorrect: true },
        { text: "Concepto C", isCorrect: false },
        { text: "Concepto D", isCorrect: false }
      ]
    }
  ],
  flashcards: [
    {
      id: uuidv4(),
      front: "Término 1",
      back: "Definición del Término 1. Este término se relaciona con..."
    }
  ]
};

// Función asíncrona tipada
const simulateAIProcessing = (options: ProcessingOption[]): Promise<IAnalysisResults> => {
  return new Promise(resolve => {
    const delay = 2000 + Math.random() * 1000;
    setTimeout(() => {
      const results: IAnalysisResults = {};
      options.forEach(option => {
        if (option === "Summary") results.summary = MOCK_AI_RESPONSES.summary;
        if (option === "Quiz") results.quiz = MOCK_AI_RESPONSES.quiz;
        if (option === "Flashcards") results.flashcards = MOCK_AI_RESPONSES.flashcards;
      });
      resolve(results);
    }, delay);
  });
};

function Upload() {
  const [tab, setTab] = useState<AnalysisType>("text");
  const [fileName, setFileName] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");
  const [processingOptions, setProcessingOptions] = useState<ProcessingOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const loaderRef = useRef<HTMLDivElement>(null);

  // Casting de constants para asegurar que coincidan con ProcessingOption[]
  const order = handlingOptions as ProcessingOption[];

  useEffect(() => {
    const state = location.state as { file?: string } | null;
    if (state?.file) {
      setTab("file");
      setFileName(state.file);
    }
  }, [location.state]);

  useEffect(() => {
    if (isLoading && loaderRef.current) {
      gsap.to(loaderRef.current, {
        rotation: 360,
        duration: 1.2,
        repeat: -1,
        ease: "linear",
      });
    }
  }, [isLoading]);

  const handleTabChange = (state: AnalysisType) => {
    setTab(state);
    if (state === "text") {
      setFileName("");
    } else {
      setTextInput("");
    }
  };

  const handleFileChangeInParent = (name: string) => setFileName(name);
  const handleTextChangeInParent = (text: string) => setTextInput(text);

  const handleCheckboxChange = (option: ProcessingOption) => {
    setProcessingOptions(prevOptions => {
      const updatedOptions = prevOptions.includes(option)
        ? prevOptions.filter(item => item !== option)
        : [...prevOptions, option];
      
      return updatedOptions.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    });
  };

  const isFormValid = (): boolean => {
    const isInputProvided = tab === "text" ? textInput.trim().length > 0 : fileName.trim().length > 0;
    const isOptionSelected = processingOptions.length > 0;
    return isInputProvided && isOptionSelected;
  };

  const handleSubmitButton = async () => {
    if (isFormValid()) {
      setIsLoading(true);

      const fileToAnalyse = tab === "file" ? fileName : null;
      const textToAnalyze = tab === "text" ? textInput : null;
      const analysisID = uuidv4();

      try {
        const results = await simulateAIProcessing(processingOptions);
        
        const newAnalysis: IAnalysis = {
          id: analysisID,
          type: tab,
          title: fileToAnalyse || "New Text Analysis",
          file: fileToAnalyse,
          text: textToAnalyze,
          options: processingOptions,
          results,
          processedOn: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          })
        };

        const history: IAnalysis[] = JSON.parse(localStorage.getItem('studyHistory') || '[]');
        localStorage.setItem('studyHistory', JSON.stringify([newAnalysis, ...history]));

        setIsLoading(false);
        navigate(`/details/${analysisID}`, { state: { analysis: newAnalysis, results } });

      } catch (error) {
        console.error("Error during AI processing simulation:", error);
        setIsLoading(false);
        alert("An error occurred during processing.");
      }
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden font-inter">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#131118] text-[32px] font-bold p-4">What would you like to study?</h2>
            
            <div className="flex px-4 py-3">
              <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-[#f1f0f4] p-1">
                {(["text", "file"] as const).map((type) => (
                  <label key={type} className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:shadow-sm text-sm font-medium capitalize">
                    {type}
                    <input
                      type="radio"
                      className="invisible w-0"
                      checked={tab === type}
                      onChange={() => handleTabChange(type)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-48">
                <div ref={loaderRef} className="spinner h-12 w-12 mb-4"></div>
                <p className="text-lg">Processing your content...</p>
              </div>
            ) : (
              <SectionRendering 
                section={tab} 
                onFileNameChange={handleFileChangeInParent} 
                onTextInputChange={handleTextChangeInParent} 
                fileName={fileName} 
                textInput={textInput} 
              />
            )}

            <h3 className="text-lg font-bold px-4 pt-4">Processing Options</h3>
            <div className="px-4">
              {order.map((option) => (
                <label className="flex gap-x-3 py-3 items-center" key={option}>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-[#dedce5]"
                    onChange={() => handleCheckboxChange(option)}
                    disabled={isLoading}
                    checked={processingOptions.includes(option)}
                  />
                  <span className="text-base">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex px-4 py-3 justify-end">
              <button
                className={`min-w-[84px] rounded-lg h-10 px-4 text-white font-bold ${
                  isFormValid() && !isLoading ? 'bg-[#607afb]' : 'bg-[#c3c4c9] cursor-not-allowed'
                }`}
                onClick={handleSubmitButton}
                disabled={!isFormValid() || isLoading}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;