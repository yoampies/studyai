import React from 'react';
import { IFilesProps } from '../core/types';

const Files: React.FC<IFilesProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-4 bg-white px-4 min-h-14">
      <div 
        className="text-[#111218] flex items-center justify-center rounded-lg bg-[#f0f1f5] shrink-0 size-10" 
        data-icon="File" 
        data-size="24px" 
        data-weight="regular"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24px" 
          height="24px" 
          fill="currentColor" 
          viewBox="0 0 256 256"
        >
          <path
            d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"
          ></path>
        </svg>
      </div>

      <div className="flex flex-col justify-center overflow-hidden">
        <p className="text-[#111218] text-base font-medium leading-normal truncate">
          {title}
        </p>
      </div>
    </div>
  );
};

export default Files;