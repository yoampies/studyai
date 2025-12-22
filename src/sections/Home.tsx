import React from 'react';
import Navbar from '../components/Navbar';
import Files from '../components/Files';
import Searchbar from '../components/Searchbar';
import RecentCard from '../components/RecentCard';
import { Link } from 'react-router-dom';
import { IUploadNavigationState } from '../core/types';

const Home: React.FC = () => {
  
  const renderRecentFileLink = (fileName: string) => {
    const state: IUploadNavigationState = { file: fileName };
    return (
      <Link to="/upload" state={state}>
        <Files title={fileName} />
      </Link>
    );
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden font-inter">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        
        <div className="gap-1 px-6 flex flex-1 justify-center">
          <aside className="layout-content-container flex flex-col w-80">
            <h2 className="text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Recent Files
            </h2>
            <nav className="flex flex-col gap-1">
              {renderRecentFileLink("Chapter One Notes")}
              {renderRecentFileLink("Lecture Slides")}
              {renderRecentFileLink("Textbook Excerpts")}
            </nav>
          </aside>

          <main className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h1 className="text-[#111218] tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Dashboard
            </h1>
            
            <div className="px-4 py-3">
              <Searchbar text="Search for created elements" />
            </div>

            <h2 className="text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-4">
              Recently Accessed
            </h2>
            
            <RecentCard />

            <div className="flex px-4 py-3 justify-start">
              <Link
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden 
                rounded-lg h-12 px-5 bg-[#607afb] text-white text-base font-bold leading-normal tracking-[0.015em]
                hover:bg-[#4a63e0] transition-colors"
                to="/upload"
              >
                <span className="truncate">Upload a file</span>
              </Link>
            </div>
            
            <div className="w-full h-[20px]"></div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;