export type AnalysisType = 'text' | 'file';
export type ProcessingOption = "Summary" | "Flashcards" | "Quiz";
export type HistoryFilter = ProcessingOption | "All";

export interface IQuizOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuestion {
  id: string;
  questionText: string;
  options: IQuizOption[];
}

export interface IFlashcard {
  id: string;
  front: string;
  back: string;
}

export interface IAnalysisResults {
  summary?: string;
  quiz?: IQuestion[];
  flashcards?: IFlashcard[];
}

export interface IAnalysis {
  id: string;
  type: AnalysisType;
  title: string;
  file: string | null;
  text: string | null;
  options: ProcessingOption[];
  results: IAnalysisResults;
  processedOn: string;
}

export interface IFlashcardsProps {
  flashcards: IFlashcard[];
}

export interface IMCEProps {
  questions: IQuestion[];
}

export interface ITabRenderingProps {
  tab: string | null;
  results: IAnalysisResults | null;
}

export interface ISectionRenderingProps {
  section: AnalysisType;
  onFileNameChange: (name: string) => void;
  onTextInputChange: (text: string) => void;
  fileName: string;
  textInput: string;
}

export interface ISearchbarProps {
  text: string;
}

export interface IFilesProps {
  title: string;
}

export interface IUploadNavigationState {
  file: string;
}

export interface IDocDetailsNavigationState {
  analysis: IAnalysis;
  results: IAnalysisResults;
}
