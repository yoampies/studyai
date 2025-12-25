// src/tests/historyFiltering.test.ts
import { describe, it, expect } from 'vitest';
import { IAnalysis, ProcessingOption } from '../core/types';

const filterHistory = (history: IAnalysis[], filter: string) => {
  if (filter === 'All') return history;
  return history.filter((item) => item.options.includes(filter as ProcessingOption));
};

const mockHistory: Partial<IAnalysis>[] = [
  { id: '1', title: 'Doc A', options: ['Summary', 'Quiz'] },
  { id: '2', title: 'Doc B', options: ['Flashcards'] },
  { id: '3', title: 'Doc C', options: ['Summary'] },
];

describe('Lógica de Filtrado en Historial', () => {
  it('debe devolver todos los elementos cuando el filtro es "All"', () => {
    const result = filterHistory(mockHistory as IAnalysis[], 'All');
    expect(result).toHaveLength(3);
  });

  it('debe filtrar correctamente por "Summary"', () => {
    const result = filterHistory(mockHistory as IAnalysis[], 'Summary');
    expect(result).toHaveLength(2);
    expect(result.map((i) => i.title)).toContain('Doc A');
    expect(result.map((i) => i.title)).toContain('Doc C');
  });

  it('debe devolver una lista vacía si ninguna entrada coincide con el filtro', () => {
    const result = filterHistory(mockHistory as IAnalysis[], 'Quiz');
    expect(result).toHaveLength(1);

    const emptyResult = filterHistory([{ options: ['Summary'] } as IAnalysis], 'Quiz');
    expect(emptyResult).toHaveLength(0);
  });
});
