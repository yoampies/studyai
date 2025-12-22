// src/assets/constants.ts
import { v4 as uuidv4 } from 'uuid';
import { IAnalysis, IQuestion, IFlashcard } from '../core/types';

import examImg from './img/exam.png';
import flashcardImg from './img/flashcard.png';
import summaryImg from './img/summary.png';

interface IRecentAnalysisItem {
  id: string;
  name: string;
  date: string;
  description: string;
  img: string;
}

export const recentAnalyses: Record<string, IRecentAnalysisItem[]> = {
  quizzes: [
    {
      id: uuidv4(),
      name: 'Examen de Matemáticas',
      date: '2025-08-27 10:30 AM',
      description: 'Resultados: 9 de 10 respuestas correctas. Confianza Promedio: 90%',
      img: examImg,
    },
  ],
  flashcards: [
    {
      id: uuidv4(),
      name: 'Sesión de Repaso de Química',
      date: '2025-08-27 02:45 PM',
      description: 'Dominio de 15 de 20 tarjetas. Progreso de la sesión: 75%',
      img: flashcardImg,
    },
  ],
  summaries: [
    {
      id: uuidv4(),
      name: 'Resumen de La Revolución Francesa',
      date: '2025-08-27 05:15 PM',
      description: 'Puntos clave cubiertos: 8 de 10. Confianza del análisis: 80%',
      img: summaryImg,
    },
  ],
};

export const handlingOptions: string[] = ["Summary", "Flashcards", "Quiz"];

/**
 * Preguntas de examen tipadas con IQuestion.
 * Se corrigió la estructura para que coincida con IQuizOption {text, isCorrect}.
 */
export const exam_questions: IQuestion[] = [
  {
    id: uuidv4(),
    questionText: 'Which of the following is a positive impact of social media?',
    options: [
      { text: 'Increased access to information', isCorrect: true },
      { text: 'Mental health concerns', isCorrect: false },
      { text: 'Misinformation and polarization', isCorrect: false },
      { text: 'Privacy and data security', isCorrect: false },
    ],
  },
  {
    id: uuidv4(),
    questionText: 'According to the summary, what is a negative impact of social media algorithms?',
    options: [
      { text: 'Empowerment and activism', isCorrect: false },
      { text: 'Fostering relationships', isCorrect: false },
      { text: 'Spreading misinformation', isCorrect: true },
      { text: 'Enhanced connectivity', isCorrect: false },
    ],
  },
  {
    id: uuidv4(),
    questionText: 'What is a benefit mentioned that social media provides for individuals and groups?',
    options: [
      { text: 'Reduced anxiety levels', isCorrect: false },
      { text: 'Lower risk of data breaches', isCorrect: false },
      { text: 'Platforms for activism', isCorrect: true },
      { text: 'A balanced and critical approach to use', isCorrect: false },
    ],
  },
];

/**
 * Flashcards tipadas con IFlashcard.
 */
export const flashcards: IFlashcard[] = [
  {
    id: uuidv4(),
    front: 'What is a potential negative impact of social media?',
    back: 'Mental health concerns, misinformation, and privacy issues.',
  },
  {
    id: uuidv4(),
    front: 'How can social media be a tool for positive change?',
    back: 'It can be used for empowerment, activism, and to organize social movements.',
  },
];

/**
 * Historial de documentos ficticios tipado con IAnalysis.
 * Se ajustaron los resultados para cumplir con la interfaz estricta.
 */
export const DUMMY_DOCUMENTS: IAnalysis[] = [
  {
    id: "hist-1",
    type: 'file',
    title: "The Renaissance",
    file: "renaissance.pdf",
    text: null,
    options: ["Summary", "Quiz"],
    processedOn: "January 15, 2024",
    results: {
      summary: "This is a brief summary of the Renaissance...",
      quiz: [
        {
          id: uuidv4(),
          questionText: "When did the Renaissance take place?",
          options: [
            { text: "11th-13th century", isCorrect: false },
            { text: "14th-17th century", isCorrect: true },
            { text: "18th-19th century", isCorrect: false }
          ],
        },
      ],
    },
  },
  {
    id: "hist-6",
    type: 'file',
    title: "The Space Race",
    file: "space_race.pdf",
    text: null,
    options: ["Flashcards"],
    processedOn: "January 3, 2024",
    results: {
      flashcards: [
        {
          id: uuidv4(),
          front: "Sputnik 1",
          back: "The first artificial Earth satellite, launched by the Soviet Union in 1957.",
        },
      ],
    },
  },
];