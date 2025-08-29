import { v4 as uuidv4 } from 'uuid';

import examImg from './img/exam.png'
import flashcardImg from './img/flashcard.png';
import summaryImg from './img/summary.png';

export const recentAnalyses = {
  exams: [
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
    "Multiple Choice Exam",
    "Flashcards",
    "Summary"
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

export const RECENT_DOCUMENTS = [
  {
    title: "The Renaissance",
    tools: "Summary, Quiz",
    processedOn: "2024-01-15",
  },
  {
    title: "World War II",
    tools: "Summary",
    processedOn: "2024-01-12",
  },
  {
    title: "The American Revolution",
    tools: "Quiz",
    processedOn: "2024-01-10",
  },
  {
    title: "Ancient Egypt",
    tools: "Summary, Quiz",
    processedOn: "2024-01-08",
  },
  {
    title: "The Industrial Revolution",
    tools: "Summary",
    processedOn: "2024-01-05",
  },
];