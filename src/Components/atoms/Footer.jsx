import React, { useState } from 'react';
import { FaDiscord, FaGithub, FaCog } from 'react-icons/fa';
import Dropdown from './Dropdown';
import '/src/index.css'

function Footer() {
  const buildId = 'v.2.07d';
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  
  const languageOptions = [
    { 
      value: 'english', 
      label: 'English', 
      icon: <img src='https://i.postimg.cc/prgv7vpp/us-ed9e9dcf.png' className='h-4 w-6 object-cover rounded-sm' alt='US Flag' />
    },
    { 
      value: 'german', 
      label: 'German', 
      icon: <img src='https://i.postimg.cc/TPR6BCYq/de-666805f5.png' className='h-4 w-6 object-cover rounded-sm' alt='German Flag' />
    },
    { 
      value: 'swedish', 
      label: 'Swedish', 
      icon: <img src='https://i.postimg.cc/W1mV9Qj1/sw-d6ff23.png' className='h-4 w-6 object-cover rounded-sm' alt='Swedish Flag' />
    }
  ];

  return (
    <footer className='fixed bottom-0 left-0 right-0 z-50 w-full backdrop-blur border-t border-neutral-800 text-neutral-300'>
      <div className='max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <a href='#' aria-label='Discord' className='h-8 w-8 grid place-items-center rounded-md hover:bg-white/5 text-neutral-300 hover:text-white transition-colors'>
            <FaDiscord size={16} />
          </a>
          <a href='https://github.com/TANKBOI29' aria-label='GitHub' className='h-8 w-8 grid place-items-center rounded-md hover:bg-white/5 text-neutral-300 hover:text-white transition-colors'>
            <FaGithub size={16} />
          </a>
          <span className='text-neutral-500'>•</span>
          <a href='#' aria-label='Updates' className='text-sm hover:text-white transition-colors'>Updates</a>
        </div>

        <div className='flex items-center gap-2'>
          <button type='button' aria-label='Settings' className='h-8 w-8 grid place-items-center rounded-md hover:bg-white/5 text-neutral-300 hover:text-white transition-colors'>
            <FaCog size={14} />
          </button>
          <Dropdown
            options={languageOptions}
            value={selectedLanguage}
            onChange={(option) => setSelectedLanguage(option.value)}
            className="min-w-[120px] max-h-[50px] mx-auto  min-h-[32px] h-8 items-center justify-center"
          />
          <span className='text-xs text-neutral-400 ml-2 hidden sm:inline'>{buildId}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
