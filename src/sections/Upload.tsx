import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Navbar from '../components/Navbar';
import SectionRendering from '../components/SectionRendering';
import { useStudyStore } from '../core/store/useStudy';
import {
  IAnalysis,
  IAnalysisResults,
  AnalysisType,
  ProcessingOption,
  AsyncSummaryGenerator,
  WorkerInput,
  WorkerOutput,
} from '../core/types';
import FileWorker from '../core/workers/fileParser.worker?worker';

const MOCK_AI_RESPONSES: IAnalysisResults = {
  summary:
    'Este es un resumen simulado de la IA. Cubre los puntos principales destacando conceptos clave.',
  quiz: [
    { id: uuidv4(), questionText: '¿Concepto A?', options: [{ text: 'Sí', isCorrect: true }] },
  ],
  flashcards: [{ id: uuidv4(), front: 'Pregunta', back: 'Respuesta' }],
};

// ... (Las funciones auxiliares las dejamos aquí por ahora para no romper imports en TabRendering,
// aunque lo ideal es moverlas a un archivo 'utils.ts' después del push)

export async function* simulateSummaryStreaming(fullText: string): AsyncSummaryGenerator {
  const words = fullText.split(' ');
  for (const word of words) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    yield word + ' ';
  }
}

const simulateAIProcessing = async (options: ProcessingOption[]): Promise<IAnalysisResults> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results: IAnalysisResults = {};
      options.forEach((opt) => {
        if (opt === 'Summary') results.summary = MOCK_AI_RESPONSES.summary;
        if (opt === 'Quiz') results.quiz = MOCK_AI_RESPONSES.quiz;
        if (opt === 'Flashcards') results.flashcards = MOCK_AI_RESPONSES.flashcards;
      });
      resolve(results);
    }, 2000);
  });
};

const Upload: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation(); // Eliminado porque no se usaba en este scope
  const addAnalysis = useStudyStore((state) => state.addAnalysis);

  const [tab, setTab] = useState<AnalysisType>('text');
  const [fileName, setFileName] = useState('');
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [processingOptions, setProcessingOptions] = useState<ProcessingOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new FileWorker();
    workerRef.current.onmessage = (e: MessageEvent<WorkerOutput>) => {
      if (e.data.success) setTextInput(e.data.content);
      setIsLoading(false);
    };
    return () => workerRef.current?.terminate();
  }, []);

  const handleFileNameChange = (name: string, file?: File) => {
    setFileName(name);
    if (file) {
      setRawFile(file);
      setIsLoading(true);
      workerRef.current?.postMessage({ file } as WorkerInput);
    }
  };

  const handleCheckboxChange = (option: ProcessingOption) => {
    setProcessingOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  };

  const isFormValid = () =>
    (tab === 'text' ? textInput.trim().length > 5 : fileName.trim()) &&
    processingOptions.length > 0;

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    setIsLoading(true);
    const analysisID = uuidv4();

    try {
      const results = await simulateAIProcessing(processingOptions);
      const newAnalysis: IAnalysis = {
        id: analysisID,
        type: tab,
        title: tab === 'file' ? fileName : 'Text Analysis',
        file: tab === 'file' ? fileName : null,
        text: textInput,
        options: processingOptions,
        results,
        processedOn: new Date().toLocaleDateString(),
      };

      addAnalysis(newAnalysis);
      navigate(`/details/${analysisID}`, {
        state: { analysis: newAnalysis, results, fileObject: rawFile },
      });
    } catch (error) {
      console.error('Processing error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white font-inter overflow-x-hidden">
      <Navbar />
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h1 className="text-[#131118] text-[32px] font-bold p-4">
            What would you like to study?
          </h1>

          <div className="flex px-4 py-3">
            <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-[#f1f0f4] p-1">
              {(['text', 'file'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTab(type)}
                  className={`flex-1 h-full rounded-lg text-sm font-medium capitalize transition-all ${
                    tab === type ? 'bg-white shadow-sm text-[#131118]' : 'text-[#6e6388]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[200px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-48">
                <div
                  ref={loaderRef}
                  className="h-12 w-12 border-4 border-t-[#607afb] border-[#f1f0f4] rounded-full"
                ></div>
                <p className="mt-4 font-medium text-[#6e6388]">Processing content...</p>
              </div>
            ) : (
              <SectionRendering
                section={tab}
                onFileNameChange={handleFileNameChange}
                onTextInputChange={setTextInput}
                fileName={fileName}
                textInput={textInput}
              />
            )}
          </div>

          <div className="mt-6 border-t border-[#f1f0f4] pt-6">
            <h3 className="text-lg font-bold px-4 mb-4 text-[#131118]">Processing Options</h3>
            <div className="px-4 flex flex-col gap-2">
              {(['Summary', 'Quiz', 'Flashcards'] as ProcessingOption[]).map((opt) => (
                <label
                  key={opt}
                  className="flex gap-3 py-3 items-center cursor-pointer group hover:bg-[#fcfcfd] rounded-lg px-2 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-[#dedce5] text-[#607afb] focus:ring-[#607afb] transition-all cursor-pointer"
                    checked={processingOptions.includes(opt)}
                    onChange={() => handleCheckboxChange(opt)}
                    disabled={isLoading}
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-[#131118] group-hover:text-[#607afb] transition-colors">
                      {opt}
                    </span>
                    <span className="text-xs text-[#6e6388]">
                      Generate {opt.toLowerCase()} for this document
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex px-4 py-8 justify-end">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid() || isLoading}
              className={`min-w-[180px] rounded-lg h-12 px-6 text-white font-bold transition-all shadow-lg ${
                isFormValid() && !isLoading
                  ? 'bg-[#607afb] hover:bg-[#4a63e0] active:scale-95'
                  : 'bg-[#c3c4c9] cursor-not-allowed opacity-70'
              }`}
            >
              {isLoading ? 'Processing...' : 'Start Analysis'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
