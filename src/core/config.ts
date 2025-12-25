import * as pdfjsLib from 'pdfjs-dist';

export const APP_CONFIG = {
  // Sincroniza automáticamente la versión de la librería con la del Worker en la CDN
  PDF_WORKER_URL: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`,

  IMAGES: {
    EXAM: '/src/assets/img/exam.png',
    FLASHCARD: '/src/assets/img/flashcard.png',
    SUMMARY: '/src/assets/img/summary.png',
  },
};
