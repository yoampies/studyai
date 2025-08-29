import { v4 as uuidv4 } from 'uuid';

import examImg from './img/exam.png'
import flashcardImg from './img/flashcard.png';
import summaryImg from './img/summary.png';

export const recentAnalyses = {
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

export const handlingOptions = [
    "Summary",
    "Flashcards",
    "Quiz"
]

export const exam_questions = [
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
  {
    id: uuidv4(),
    questionText: 'What is the main idea of the conclusion about social media?',
    options: [
      { text: 'It is entirely harmful and should be avoided.', isCorrect: false },
      { text: 'Its benefits far outweigh its drawbacks.', isCorrect: false },
      { text: 'Its impact is complex and requires a balanced approach.', isCorrect: true },
      { text: 'It has no significant effect on society.', isCorrect: false },
    ],
  },
  {
    id: uuidv4(),
    questionText: 'Which term is NOT used to describe a negative aspect of social media?',
    options: [
      { text: 'Mental health concerns', isCorrect: false },
      { text: 'Societal polarization', isCorrect: false },
      { text: 'Enhanced connectivity', isCorrect: true },
      { text: 'Misuse of personal information', isCorrect: false },
    ],
  },
];

export const flashcards = [
  {
    id: uuidv4(),
    question: 'What is a potential negative impact of social media?',
    answer: 'Mental health concerns, misinformation, and privacy issues.',
  },
  {
    id: uuidv4(),
    question: 'How can social media be a tool for positive change?',
    answer: 'It can be used for empowerment, activism, and to organize social movements.',
  },
  {
    id: uuidv4(),
    question: 'What is a positive aspect of social media regarding information?',
    answer: 'It provides increased access to information and diverse perspectives.',
  },
  {
    id: uuidv4(),
    question: 'What is one of the main conclusions about social media\'s impact?',
    answer: 'Its impact is complex, requiring a balanced and critical approach.',
  },
];

// src/components/constants.js

export const DUMMY_DOCUMENTS = [
  {
    id: "hist-1",
    title: "The Renaissance",
    options: ["Summary", "Quiz"],
    processedOn: "January 15, 2024",
    results: {
      summary: "This is a brief summary of the Renaissance, a period of European history marking the transition from the Middle Ages to modernity. It spanned from the 14th to the 17th century and led to significant cultural, artistic, political, and economic changes.",
      quiz: [
        {
          question: "When did the Renaissance take place?",
          options: ["11th-13th century", "14th-17th century", "18th-19th century", "1st-3rd century"],
          answer: "14th-17th century",
        },
        {
          question: "Which of the following was a key characteristic of the Renaissance?",
          options: ["Industrialization", "Feudalism", "Humanism", "Nomadic living"],
          answer: "Humanism",
        },
      ],
    },
  },
  {
    id: "hist-2",
    title: "World War II",
    options: ["Summary"],
    processedOn: "January 12, 2024",
    results: {
      summary: "World War II was a global conflict that lasted from 1939 to 1945. It involved the vast majority of the world's countries and resulted in an estimated 70 to 85 million fatalities. It ended with the surrender of the Axis powers.",
    },
  },
  {
    id: "hist-3",
    title: "The American Revolution",
    options: ["Quiz"],
    processedOn: "January 10, 2024",
    results: {
      quiz: [
        {
          question: "When did the American Revolution begin?",
          options: ["1776", "1775", "1783", "1812"],
          answer: "1775",
        },
      ],
    },
  },
  {
    id: "hist-4",
    title: "Ancient Egypt",
    options: ["Summary", "Quiz"],
    processedOn: "January 8, 2024",
    results: {
      summary: "Ancient Egypt was a civilization of ancient Northeastern Africa, concentrated along the lower reaches of the Nile River. Its history is marked by the construction of monumental pyramids and the reign of pharaohs.",
      quiz: [
        {
          question: "What river was central to Ancient Egyptian civilization?",
          options: ["Amazon River", "Yangtze River", "Mississippi River", "Nile River"],
          answer: "Nile River",
        },
      ],
    },
  },
  {
    id: "hist-5",
    title: "The Industrial Revolution",
    options: ["Summary"],
    processedOn: "January 5, 2024",
    results: {
      summary: "The Industrial Revolution was the transition to new manufacturing processes in Europe and the United States, from about 1760 to sometime between 1820 and 1840. This transition included moving from hand production methods to machines.",
    },
  },
  {
    id: "hist-6",
    title: "The Space Race",
    options: ["Flashcards"],
    processedOn: "January 3, 2024",
    results: {
      flashcards: [
        {
          front: "Sputnik 1",
          back: "The first artificial Earth satellite, launched by the Soviet Union in 1957.",
        },
      ],
    },
  },
  {
    id: "hist-7",
    title: "The Scientific Method",
    options: ["Summary", "Flashcards"],
    processedOn: "January 1, 2024",
    results: {
      summary: "The Scientific Method is a systematic approach to research, which includes observing phenomena, formulating hypotheses, conducting experiments to test them, and analyzing the results to draw conclusions.",
      flashcards: [
        {
          front: "Hypothesis",
          back: "A proposed explanation made on the basis of limited evidence as a starting point for further investigation.",
        },
      ],
    },
  },
];