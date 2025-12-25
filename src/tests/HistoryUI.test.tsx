import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import HistorySection from '../sections/History';
import { IAnalysis } from '@/core/types';
import * as RTL from '@testing-library/react';
const { render, screen, fireEvent } = RTL;

vi.mock('../core/store/useStudy', () => ({
  useStudyStore: (selector: (state: { history: Partial<IAnalysis>[] }) => unknown) =>
    selector({
      history: [
        { id: '1', title: 'Prueba de Quiz', options: ['Quiz'], processedOn: '2023-01-01' },
        { id: '2', title: 'Prueba de Resumen', options: ['Summary'], processedOn: '2023-01-01' },
      ],
    }),
}));

describe('Componente History - Interacción de Filtros', () => {
  it('debe mostrar el título de los documentos inicialmente', () => {
    render(<HistorySection />, { wrapper: BrowserRouter });
    expect(screen.getByText('Prueba de Quiz')).toBeInTheDocument();
    expect(screen.getByText('Prueba de Resumen')).toBeInTheDocument();
  });

  it('debe filtrar la lista al hacer clic en un botón de categoría', () => {
    render(<HistorySection />, { wrapper: BrowserRouter });

    const quizFilterBtn = screen.getByRole('button', { name: /quiz/i });
    fireEvent.click(quizFilterBtn);

    expect(screen.getByText('Prueba de Quiz')).toBeInTheDocument();
    expect(screen.queryByText('Prueba de Resumen')).not.toBeInTheDocument();
  });
});
