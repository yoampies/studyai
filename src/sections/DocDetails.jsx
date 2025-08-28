import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar';
import TabRendering from '../components/TabRendering';

function DocDetails() {
  const location = useLocation();
  const [analysis, setAnalysis] = useState(null)
  const [tab, setTab] = useState([])

  useEffect(() => {
    if(location.state && location.state.analysis) {
      setAnalysis(location.state.analysis);
      setTab(location.state.analysis.options[0])
    }
  }, [location])

  if (!analysis) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-500 text-2xl font-bold">Data not available or loading...</h1>
      </div>
    );
  }
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-['Inter, Noto Sans, sans-serif']"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#131118] tracking-light text-[32px] font-bold leading-tight min-w-72">
                {analysis.file
                  ? analysis.file
                  : analysis.text.split(" ").length > 5
                  ? analysis.text.split(" ").slice(0, 5).join(" ") + "..."
                  : analysis.text}
              </p>
            </div>
            <div className="pb-3">
              <div className="flex border-b border-[#dedce5] px-4 gap-8">
                {analysis.options.map((option) => (
                  <a
                    key={option}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 cursor-pointer ${
                      option === tab
                        ? "border-b-[#131118] text-[#131118]"
                        : "border-b-transparent text-[#6e6388]"
                    }`}
                    onClick={() => setTab(option)}
                  >
                    <p
                      className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                        option === tab ? "text-[#131118]" : "text-[#6e6388]"
                      }`}
                    >
                      {option}
                    </p>
                  </a>
                ))}
              </div>
            </div>
            <TabRendering tab={tab}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocDetails