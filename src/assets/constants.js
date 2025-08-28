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