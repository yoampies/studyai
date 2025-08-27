import React from 'react'
import Navbar from '../components/Navbar'
import Files from '../components/Files'
import Searchbar from '../components/Searchbar'

function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-['Inter, Noto Sans, sans-serif']">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
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
            <h2 className="text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">Recently Accessed</h2>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-lg">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#111218] text-base font-bold leading-tight">Exam 1</p>
                    <p className="text-[#5f668c] text-sm font-normal leading-normal">Multiple Choice Exam</p>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#f0f1f5] text-[#111218] pr-2 gap-1 text-sm font-medium leading-normal w-fit"
                  >
                    <div className="text-[#111218]" data-icon="ArrowRight" data-size="18px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path
                          d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"
                        ></path>
                      </svg>
                    </div>
                    <span className="truncate">See all Exams</span>
                  </button>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBz-iqY_uqza2Z7LxCwv8RBcO4CV4_ZNEQdz5PxbeONpUwzJ4i2efnhEuR8mRZ7QEy7Wf_X8RWC26jYkiI7kHDXFh_zwFoD4rUf33h16mrlYvr8Md4H6oMJgRUKAEP0SnUaPc-rJ45KgXstWsIiFAVT24XunIcmqe2fzgnS333HQcamslqhh5OGh9Dwe8neQAh6YlMI9FDK9qPe7HZqE_fkrgPjZtnFW1hLTLSMjicD_G-WL0krXJrstK8JxfwxBV1a8fJQdo0e2OZp")' }}
                ></div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-lg">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#111218] text-base font-bold leading-tight">Vocabulary Set 1</p>
                    <p className="text-[#5f668c] text-sm font-normal leading-normal">Flashcards</p>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#f0f1f5] text-[#111218] pr-2 gap-1 text-sm font-medium leading-normal w-fit"
                  >
                    <div className="text-[#111218]" data-icon="ArrowRight" data-size="18px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path
                          d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"
                        ></path>
                      </svg>
                    </div>
                    <span className="truncate">See all Flashcards</span>
                  </button>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHlpw-8btWyTt9oWd7WEg3j1agJ9GCBxJ39iTQS3nmXbunAaLr9m1m8fE1BX35q6NHZ7Xe3KslrRweujCBXefpQ2W7vmkslegekUhgnLBvxTXU525Q4wqcyuj5KwDlJFDIg4kduYvPNjwJDQbSPJ62InQV-oi8oLnRA9AUiBg3MxXQ0x9CQa2_QsuWoqUPOkiZ2CL5kr-DyguYdThD-lOwH-Lnxpy2Nr8Sy7LzMCJiHk-2tmOlCq_bj6xP1VlmBh4YSafHjohktEBl")' }}
                ></div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-lg">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#111218] text-base font-bold leading-tight">Chapter 1 Summary</p>
                    <p className="text-[#5f668c] text-sm font-normal leading-normal">Summary</p>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#f0f1f5] text-[#111218] pr-2 gap-1 text-sm font-medium leading-normal w-fit"
                  >
                    <div className="text-[#111218]" data-icon="ArrowRight" data-size="18px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path
                          d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"
                        ></path>
                      </svg>
                    </div>
                    <span className="truncate">See all Summaries</span>
                  </button>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRV4udNdbA4V8LCRDNDu3VPOhl1AJt55i2cMt3C-rTYjjUN7GWiuDHGWGTVY0NOtywO5UIqZ22KMP9QyehKxTLK3VLhOBPte7LBzKqtT6yruRqI0VWG4bJZaMG67lKccLaAdYezfieE-_H1RY8gQTrK8w16kzG3JeSKqxLuxzpOUUL9iYKywAk8xfZOHSJF5fPYFwbCtyF60TYUEXJ_Jv2825R2bJZjt1eeOS9VaXphqiXkmbWqTIr_td6Uo1zQ4J63DozVPS4nSt5")' }}
                ></div>
              </div>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#607afb] text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Upload a file</span>
              </button>
            </div>
            <div className="w-full h-[20px]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home