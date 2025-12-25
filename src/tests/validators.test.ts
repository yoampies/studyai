import { describe, it, expect } from 'vitest';

const validateForm = (tab: 'text' | 'file', input: string, options: string[]) => {
  const isInputValid = tab === 'text' ? input.trim().length > 5 : input.trim().length > 0;
  const hasOptions = options.length > 0;
  return isInputValid && hasOptions;
};

describe('Validadores de Formulario de Estudio', () => {
  it('debe invalidar texto demasiado corto (menor a 6 caracteres)', () => {
    expect(validateForm('text', 'Hola', ['Summary'])).toBe(false);
  });

  it('debe validar texto con longitud correcta (6 o más caracteres)', () => {
    expect(validateForm('text', 'Historia de la IA', ['Summary'])).toBe(true);
  });

  it('debe invalidar si no hay ninguna opción de procesamiento seleccionada', () => {
    expect(validateForm('text', 'Texto válido largo', [])).toBe(false);
  });
});
