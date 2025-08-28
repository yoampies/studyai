import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import SectionRendering from '../components/SectionRendering'
import { handlingOptions } from '../assets/constants'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

function Upload() {
    const [tab, setTab] = useState("text");
    const navigate = useNavigate();
    const [fileName, setFileName] = useState("")
    const [textInput, setTextInput] = useState("")
    const [processingOptions, setProcessingOptions] = useState([])

    const handleTabChange = (state) => { 
      setTab(state)
      if(state === "text") {
        setFileName("")
      } else {
        setTextInput("")
      }
    }

    const handleFileChangeInParent = (name) => {
      setFileName(name)
    }

    const handleTextChangeInParent = (text) => {
      setTextInput(text)
    }

    const handleCheckboxChange = (option) => {
      setProcessingOptions(prevOptions => {
        if(prevOptions.includes(option)) {
          return prevOptions.filter(item => item !== option);
        } else {
          return [...prevOptions, option]
        }
      })
    }

    const handleSubmitButton = () => {
      const fileToAnalyse = tab === "file" ? fileName : null;
      const textToAnalyze = tab === "text" ? textInput : null;
      const analysisID = uuidv4();
      const analysis = {
        id: analysisID,
        type: tab,
        file: fileToAnalyse,
        text: textToAnalyze,
        options: processingOptions
      }
      //navigate(`details/${analysisID}`, {state: {analysis}});
      console.log(analysis)
    }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-['Inter, Noto Sans, sans-serif']"
      style={{ '--checkbox-tick-svg': "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(255,255,255)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')" }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar/>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#131118] tracking-light text-[32px] font-bold leading-tight min-w-72">What would you like to study?</p>
            </div>
            <div className="flex px-4 py-3">
              <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-[#f1f0f4] p-1">
                <label
                  className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#131118] text-[#6e6388] text-sm font-medium leading-normal"
                >
                  <span className="truncate">Text</span>
                  <input type="radio" name="7e26e5f1-5761-443c-a4e2-6e99b97f4455" className="invisible w-0" value="Text" defaultChecked 
                  onClick={() => handleTabChange("text")}/>
                </label>
                <label
                  className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#131118] text-[#6e6388] text-sm font-medium leading-normal"
                >
                  <span className="truncate">Files</span>
                  <input type="radio" name="7e26e5f1-5761-443c-a4e2-6e99b97f4455" className="invisible w-0" value="Files" 
                  onClick={() => handleTabChange("file")}/>
                </label>
              </div>
            </div>
            <SectionRendering section={tab} onFileNameChange={handleFileChangeInParent} onTextInputChange={handleTextChangeInParent}/>
            <h3 className="text-[#131118] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Processing Options</h3>
            <div className="px-4">
                {handlingOptions.map((option) => (
                    <label className="flex gap-x-3 py-3 flex-row" key={option}>
                        <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-[#dedce5] border-2 bg-transparent text-[#4514b8] checked:bg-[#4514b8] 
                        checked:border-[#4514b8] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 
                        focus:border-[#dedce5] focus:outline-none"
                        onChange={() => handleCheckboxChange(option)}
                        />
                        <p className="text-[#131118] text-base font-normal leading-normal">{option}</p>
                    </label>
                ))}
            </div>
            <div className="flex px-4 py-3 justify-end">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 
                bg-[#607afb] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                onClick={handleSubmitButton}
              >
                <span className="truncate">Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload