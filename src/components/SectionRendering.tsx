import React, { useRef } from 'react';
import { ISectionRenderingProps } from '../core/types';

const SectionRendering: React.FC<ISectionRenderingProps> = ({
  section,
  onFileNameChange,
  onTextInputChange,
  fileName,
  textInput,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextInputChange(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      onFileNameChange(selectedFile.name, selectedFile);
    }
  };

  return (
    <div className="flex max-w-[960px] flex-wrap items-end gap-4 px-4 py-3">
      {section === 'text' ? (
        <textarea
          placeholder="Enter text here..."
          className="form-input w-full rounded-lg border border-[#dedce5] min-h-36 p-4 focus:border-[#607afb] focus:ring-0 outline-none transition-all"
          onChange={handleTextChange}
          value={textInput}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-[#dedce5] p-6 w-full h-48 rounded-lg hover:border-[#607afb] transition-colors bg-[#fcfcfd]">
          <div className="flex flex-col items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#6e6388"
              viewBox="0 0 256 256"
            >
              <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
            </svg>
            <p className="font-semibold text-[#131118] text-center">
              {fileName || 'PDF or MP3 supported'}
            </p>
          </div>

          <button
            onClick={() => fileRef.current?.click()}
            className="bg-[#f1f0f4] hover:bg-[#e2e1e9] px-6 h-10 rounded-lg font-bold text-sm text-[#131118] transition-colors"
          >
            {fileName ? 'Change File' : 'Upload Document'}
          </button>

          <input
            type="file"
            ref={fileRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".mp3, .pdf, .txt"
          />
        </div>
      )}
    </div>
  );
};

export default SectionRendering;
