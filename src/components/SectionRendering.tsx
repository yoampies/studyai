import React, { useRef, useEffect } from 'react';
import { ISectionRenderingProps } from '../core/types';

const SectionRendering: React.FC<ISectionRenderingProps> = ({ 
  section, onFileNameChange, onTextInputChange, fileName, textInput 
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextInputChange(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileNameChange(files[0].name);
    }
  };

  return (
    <div className="flex max-w-[960px] flex-wrap items-end gap-4 px-4 py-3">
      {section === "text" ? (
        <textarea
          placeholder="Enter text here"
          className="form-input w-full rounded-lg border border-[#dedce5] min-h-36 p-4"
          onChange={handleTextChange}
          value={textInput}
        />
      ) : (
        <div className="flex flex-col items-center gap-6 border border-[#dedce5] p-6 w-full h-48 rounded-lg">
          <p className="font-semibold">{fileName || "Drag and drop files here"}</p>
          <button
            onClick={() => fileRef.current?.click()}
            className="bg-[#f1f0f4] px-4 h-10 rounded-lg font-semibold"
          >
            {fileName ? "Choose Another File" : "Browse Files"}
          </button>
          <input type="file" ref={fileRef} onChange={handleFileChange} className="hidden" accept=".mp3, .pdf" />
        </div>
      )}
    </div>
  );
};

export default SectionRendering;