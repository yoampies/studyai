import React from 'react'
import Navbar from '../components/Navbar'
import Files from '../components/Files'
import Searchbar from '../components/Searchbar'
import RecentCard from '../components/RecentCard'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-['Inter, Noto Sans, sans-serif']">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="gap-1 px-6 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-80">
            <h2 className="text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Recent Files</h2>
            <Files title="Chapter One Notes"/>
            <Files title="Lecture Slides"/>
            <Files title="Textbook Excerpts"/>
          </div>
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h1 className="text-[#111218] tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-5">Dashboard</h1>
            <div className="px-4 py-3">
              <Searchbar text="Search for created elements"/>
            </div>
            <h2 className="text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-4">Recently Accessed</h2>
            <RecentCard />
            <div className="flex px-4 py-3 justify-start">
              <Link
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden 
                rounded-lg h-12 px-5 bg-[#607afb] text-white text-base font-bold leading-normal tracking-[0.015em]"
                to="/upload"
              >
                <span className="truncate">Upload a file</span>
              </Link>
            </div>
            <div className="w-full h-[20px]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home