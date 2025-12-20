import React from 'react';
import '/src/index.css'

function Footer() {
    return (
        <footer className="w-full py-8 bg-neutral-900/90 border-t-2 border-blue-700 flex items-center justify-center">
            <div className="text-center w-full h-17.5">
                <a href="https://github.com/TANKBOI29" target="_blank" rel="noopener noreferrer" className="text-white font-bold text-lg block hover:underline">TANKBOI29 (hogriddatm)</a>
                <div className="text-white font-bold text-lg">Developer</div>
                
            </div>
        </footer>
    );
}

export default Footer;