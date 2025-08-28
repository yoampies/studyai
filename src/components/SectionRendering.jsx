import React, {useRef, useState} from 'react'

function SectionRendering({ section }) {
  const commonContainerClasses = "flex max-w-[960px] flex-wrap items-end gap-4 px-4 py-3";
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState("")

  const handleFileButtonClick = () => {
    fileRef.current.click();
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files;
    setFileName(selectedFile[0].name)
  }

  switch (section) {
    case ("text"):
      return (
        <div className={commonContainerClasses}>
          <label className="flex flex-col min-w-40 flex-1 h-48">
            <textarea
              placeholder="Enter text here"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden 
                rounded-lg text-[#131118] focus:outline-0 focus:ring-0 border border-[#dedce5] bg-white 
                focus:border-[#dedce5] min-h-36 placeholder:text-[#6e6388] p-[15px] text-base font-normal 
                leading-normal"
            ></textarea>
          </label>
        </div>
      );
    case ("file"):
      return (
        <div className={commonContainerClasses}>
          <div className="flex flex-col items-center gap-6 rounded-lg border border-[#dedce5] p-6 w-full h-48">
            {fileName ? (
                <div className="flex max-w-[980px] flex-col items-center gap-2">
                    <p className="text-[#131118] text-lg font-semibold leading-tight tracking-[-0.015em] max-w-[480px] text-center">{fileName}</p>
                    <p className="text-[#131118] text-sm font-normal leading-normal max-w-[480px] text-center">Ready to Analyze</p>
                </div>
            ) : (
             <div className="flex max-w-[980px] flex-col items-center gap-2">
              <p className="text-[#131118] text-lg font-semibold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Drag and drop files here</p>
              <p className="text-[#131118] text-sm font-normal leading-normal max-w-[480px] text-center">Or</p>
            </div>   
            )}
            <button
              onClick={handleFileButtonClick}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f1f0f4] text-[#131118] text-sm font-semibold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">{fileName ? "Choose Another File" : "Browse Files"}</span>
            </button>
            <input 
                type="file" 
                ref={fileRef}
                onChange={handleFileChange}
                className="hidden"
                accept='.mp3, .pdf'
            />
          </div>
          <p className="text-[#6e6388] text-sm font-normal leading-normal text-center w-full">Supported file types: PDF, MP3</p>
        </div>
      );
    default:
      return null;
  }
}

export default SectionRendering;