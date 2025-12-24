import { v4 as uuidv4 } from 'uuid';
import { IAnalysisResults, ProcessingOption, AsyncSummaryGenerator } from './types';

export const MOCK_AI_RESPONSES: IAnalysisResults = {
  summary:
    'Este es un resumen simulado de la IA. Cubre los puntos principales destacando conceptos clave.',
  quiz: [
    { id: uuidv4(), questionText: '¿Concepto A?', options: [{ text: 'Sí', isCorrect: true }] },
  ],
  flashcards: [{ id: uuidv4(), front: 'Pregunta', back: 'Respuesta' }],
};

export async function* simulateSummaryStreaming(fullText: string): AsyncSummaryGenerator {
  const words = fullText.split(' ');
  for (const word of words) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    yield word + ' ';
  }
}

export const simulateAIProcessing = async (
  options: ProcessingOption[],
): Promise<IAnalysisResults> => {
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
