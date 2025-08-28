import React from 'react'
import { recentAnalyses } from '../assets/constants'

function RecentCard() {
    const types = Object.keys(recentAnalyses);

  return (
    <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-lg">
            {
                types.map((type) => (
                    <div className="flex flex-[2_2_0px] flex-col gap-4" key={type}>
                        {recentAnalyses[type].map((item) => (
                            <div key={item.id} >
                                <div
                                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                                    style={{ backgroundImage: `url(${item.img})` }}
                                ></div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[#111218] text-base font-bold leading-tight mt-2">{item.name}</p>
                                    <p className="text-[#5f668c] text-sm font-normal leading-normal">{item.date}</p>
                                    <p className="text-[#5f668c] text-sm font-normal leading-normal">{item.description}</p>
                                </div>
                                <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 
                                flex-row-reverse bg-[#f0f1f5] text-[#111218] pr-2 gap-1 text-sm font-medium leading-normal w-fit mt-4"
                                >
                                    <div className="text-[#111218]" data-icon="ArrowRight" data-size="18px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                                        <path
                                            d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"
                                        ></path>
                                        </svg>
                                    </div>
                                    <span className="truncate">See all {type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RecentCard