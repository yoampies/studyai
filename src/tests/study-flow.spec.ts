import { test, expect } from '@playwright/test';

test.describe('Flujo E2E - StudyAI', () => {
  test('Flujo completo: Carga de texto -> Procesamiento -> Resultados', async ({ page }) => {
    // 1. Navegar a la sección de carga
    await page.goto('/upload');

    // 2. Ingresar texto de prueba
    const testText =
      'La inteligencia artificial permite a las máquinas aprender de la experiencia.';

    // CAMBIO CLAVE: Usamos el selector de etiqueta 'textarea' directamente.
    // Como es el único en la pantalla de texto, es infalible.
    const textArea = page.locator('textarea');
    await textArea.waitFor({ state: 'visible', timeout: 15000 });
    await textArea.fill(testText);

    // 3. Seleccionar opciones de procesamiento
    // En tu Upload.tsx, los checkboxes están dentro de labels.
    // Usar click en el texto es más seguro si el input está oculto por estilos.
    await page.getByText('Summary', { exact: true }).click();
    await page.getByText('Quiz', { exact: true }).click();

    // 4. Iniciar análisis
    const startButton = page.getByRole('button', { name: /Start Analysis/i });
    await expect(startButton).toBeEnabled();
    await startButton.click();

    // 5. Verificar estado de carga
    await expect(page.getByText(/Processing content.../i)).toBeVisible();
    await expect(page.locator('.animate-spin')).toBeVisible();

    // 6. Verificación de redirección y resultados
    // Esperamos que la simulación de 2s termine y navegue
    await page.waitForURL(/\/details\/.+/, { timeout: 15000 });

    // Verificaciones en DocDetails.tsx
    // 1. Comprobar que el título sea el correcto para texto
    await expect(page.getByText('Text Analysis')).toBeVisible();

    // 2. Comprobar que el texto original que escribimos se muestra en el panel izquierdo
    await expect(page.getByText(testText)).toBeVisible();

    // 3. Comprobar que la pestaña de Summary está activa (tiene el borde azul)
    const summaryTab = page.getByRole('button', { name: 'Summary' });
    // Usamos una regex para la clase CSS para evitar problemas con los corchetes []
    await expect(summaryTab).toHaveClass(/border-\[#607afb\]/);
  });
});

test('debe mantener el botón deshabilitado si el texto es muy corto', async ({ page }) => {
  await page.goto('/upload');

  // Caso: Texto de solo 3 caracteres (el mínimo es 6 según tu código)
  const textArea = page.locator('textarea');
  await textArea.fill('Hola');

  // Seleccionamos una opción para que solo falte el texto
  await page.getByLabel('Summary').check();

  const startButton = page.getByRole('button', { name: /Start Analysis/i });

  // Verificación: El botón debe tener el atributo 'disabled'
  await expect(startButton).toBeDisabled();

  // Caso: Completamos a 6 caracteres y el botón debería habilitarse
  await textArea.fill('Hola mundo');
  await expect(startButton).toBeEnabled();
});

test('un nuevo análisis debe aparecer en la página de History tras ser creado', async ({
  page,
}) => {
  await page.goto('/upload');

  const textArea = page.locator('textarea');
  await textArea.fill('Este es un texto de prueba para verificar el historial.');

  await page.getByLabel('Summary').check();
  await page.getByRole('button', { name: /Start Analysis/i }).click();

  // Esperamos a que termine el procesamiento y llegue a detalles
  await page.waitForURL(/\/details\/.+/);

  // Navegamos manualmente a History
  await page.goto('/history');

  // Verificamos que el nuevo documento aparezca en la lista
  // (Asumiendo que en History se muestra el título; como es texto, por defecto es 'Text Analysis')
  await expect(page.getByText('Text Analysis').first()).toBeVisible();

  // También verificamos que el filtro funcione
  await page.getByRole('button', { name: 'Summary' }).click();
  await expect(page.getByText('Text Analysis').first()).toBeVisible();
});

test('el Knowledge Heatmap debe ser visible en el Dashboard', async ({ page }) => {
  await page.goto('/');

  // Verificamos que el contenedor del heatmap exista
  const heatmap = page.locator('.react-calendar-heatmap');
  await expect(heatmap).toBeVisible();

  // Verificamos que al menos haya un cuadro de color (rect)
  const days = heatmap.locator('rect');
  await expect(days.first()).toBeVisible();
});
