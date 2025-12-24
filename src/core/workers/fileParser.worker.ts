import { WorkerInput, WorkerOutput } from '../types';

self.onmessage = async (e: MessageEvent<WorkerInput>) => {
  const { file } = e.data;

  try {
    const content = await parseFileContent(file);

    const response: WorkerOutput = {
      success: true,
      content: content,
      fileName: file.name,
    };

    self.postMessage(response);
  } catch (error) {
    console.error('Worker Error:', error);

    self.postMessage({
      success: false,
      error: 'Error al procesar el archivo en el worker',
      content: '',
      fileName: file.name,
    });
  }
};

async function parseFileContent(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const raw = e.target?.result as string;
      setTimeout(() => {
        resolve(`Contenido procesado de ${file.name}: ${raw.substring(0, 500)}...`);
      }, 1500);
    };
    reader.readAsText(file);
  });
}
