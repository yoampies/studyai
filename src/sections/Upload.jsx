import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import SectionRendering from '../components/SectionRendering';
import { handlingOptions } from '../assets/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { gsap } from 'gsap';

// Datos simulados para la respuesta de la IA
const MOCK_AI_RESPONSES = {
  "Summary": "Este es un resumen simulado de la IA. Cubre los puntos principales del texto/archivo de entrada, destacando los conceptos clave para un estudio eficiente.",
  "Quiz": [
    {
      question: "¿Cuál es el concepto principal discutido en el texto?",
      options: ["Concepto A", "Concepto B", "Concepto C", "Concepto D"],
      answer: "Concepto B"
    },
    {
      question: "¿Qué papel juega la tecnología en el tema?",
      options: ["Acelera el proceso", "No tiene impacto", "Crea desafíos", "Resuelve todos los problemas"],
      answer: "Crea desafíos"
    }
  ],
  "Flashcards": [
    {
      front: "Término 1",
      back: "Definición del Término 1. Este término se relaciona con..."
    },
    {
      front: "Término 2",
      back: "Definición del Término 2. Este término es fundamental para entender..."
    }
  ]
};

// Función asíncrona que simula el procesamiento de la IA
const simulateAIProcessing = (options) => {
  return new Promise(resolve => {
    const delay = 2000 + Math.random() * 1000;
    setTimeout(() => {
      const results = {};
      options.forEach(option => {
        if (option === "Summary") {
          results.summary = MOCK_AI_RESPONSES.Summary;
        }
        if (option === "Quiz") {
          results.quiz = MOCK_AI_RESPONSes["Quiz"];
        }
        if (option === "Flashcards") {
          results.flashcards = MOCK_AI_RESPONSES.Flashcards;
        }
      });
      resolve(results);
    }, delay);
  });
};

function Upload() {
  const [tab, setTab] = useState("text");
  const [fileName, setFileName] = useState("");
  const [textInput, setTextInput] = useState("");
  const [processingOptions, setProcessingOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const loaderRef = useRef(null);

  const order = handlingOptions;

  useEffect(() => {
    if (location.state && location.state.file) {
      setTab("file");
      setFileName(location.state.file);
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

  const handleTabChange = (state) => {
    setTab(state);
    if (state === "text") {
      setFileName("");
    } else {
      setTextInput("");
    }
  };

  const handleFileChangeInParent = (name) => {
    setFileName(name);
  };

  const handleTextChangeInParent = (text) => {
    setTextInput(text);
  };

  const handleCheckboxChange = (option) => {
    setProcessingOptions(prevOptions => {
      let updatedOptions;
      if (prevOptions.includes(option)) {
        updatedOptions = prevOptions.filter(item => item !== option);
      } else {
        updatedOptions = [...prevOptions, option];
      }
      updatedOptions.sort((a, b) => order.indexOf(a) - order.indexOf(b));
      return updatedOptions;
    });
  };

  const isFormValid = () => {
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
      const analysis = {
        id: analysisID,
        type: tab,
        file: fileToAnalyse,
        text: textToAnalyze,
        options: processingOptions
      };

      try {
        const results = await simulateAIProcessing(processingOptions);
        
        const history = JSON.parse(localStorage.getItem('studyHistory')) || [];
        const newHistory = [...history, {
          ...analysis,
          results,
          title: fileToAnalyse || "New Text Analysis",
          processedOn: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        }];
        localStorage.setItem('studyHistory', JSON.stringify(newHistory));

        setIsLoading(false);
        navigate(`/details/${analysisID}`, { state: { analysis, results } });

      } catch (error) {
        console.error("Error during AI processing simulation:", error);
        setIsLoading(false);
        alert("An error occurred during processing.");
      }
    } else {
      alert("Please enter text or upload a file and select at least one processing option.");
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-['Inter, Noto Sans, sans-serif']"
      style={{ '--checkbox-tick-svg': "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(255,255,255)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')" }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#131118] tracking-light text-[32px] font-bold leading-tight min-w-72">What would you like to study?</p>
            </div>
            <div className="flex px-4 py-3">
              <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-[#f1f0f4] p-1">
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#131118] text-[#6e6388] text-sm font-medium leading-normal">
                  <span className="truncate">Text</span>
                  <input
                    type="radio"
                    name="upload-option"
                    className="invisible w-0"
                    value="Text"
                    checked={tab === "text"}
                    onChange={() => handleTabChange("text")}
                  />
                </label>
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#131118] text-[#6e6388] text-sm font-medium leading-normal">
                  <span className="truncate">Files</span>
                  <input
                    type="radio"
                    name="upload-option"
                    className="invisible w-0"
                    value="Files"
                    checked={tab === "file"}
                    onChange={() => handleTabChange("file")}
                  />
                </label>
              </div>
            </div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-48 py-3 px-4">
                <div ref={loaderRef} className="spinner h-12 w-12 mb-4"></div>
                <p className="text-[#131118] text-center text-lg font-normal leading-normal">Processing your content...</p>
              </div>
            ) : (
              <SectionRendering section={tab} onFileNameChange={handleFileChangeInParent} onTextInputChange={handleTextChangeInParent} fileName={fileName} textInput={textInput} />
            )}
            <h3 className="text-[#131118] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Processing Options</h3>
            <div className="px-4">
              {handlingOptions.map((option) => (
                <label className="flex gap-x-3 py-3 flex-row" key={option}>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-[#dedce5] border-2 bg-transparent text-[#4514b8] checked:bg-[#4514b8] checked:border-[#4514b8] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#dedce5] focus:outline-none"
                    onChange={() => handleCheckboxChange(option)}
                    disabled={isLoading}
                    checked={processingOptions.includes(option)}
                  />
                  <p className="text-[#131118] text-base font-normal leading-normal">{option}</p>
                </label>
              ))}
            </div>
            <div className="flex px-4 py-3 justify-end">
              <button
                className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-white text-sm font-bold leading-normal tracking-[0.015em] ${isFormValid() && !isLoading ? 'bg-[#607afb]' : 'bg-[#c3c4c9] cursor-not-allowed'}`}
                onClick={handleSubmitButton}
                disabled={!isFormValid() || isLoading}
              >
                <span className="truncate">Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;