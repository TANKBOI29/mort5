import React from 'react';
import { FaInfoCircle, FaUsers, FaImage } from 'react-icons/fa';
import '/src/index.css'

function About() {
    return (
        <div className='h-full w-screen bg-transparent items-center justify-center'>
            <center className=''>
                <h2 className='text-blue-700 font-bold leading-10 text-xl'>
                    About us
                </h2>
            </center>
            <div className=''>
                <p className="max-w-3xl mx-auto text-center text-white p-4 border-l-4 border-blue-700 rounded mb-12" style={{ background: "rgba(20, 71, 230, 0.05)" }}>
                    FORSCOM produces combat ready and globally responsive Total Army Forces that are well led, disciplined, trained, and expeditionary ready now to deploy and win in Large Scale Combat Operations against any and all threats.
                </p>
                <div className="max-w-3xl mx-auto text-center text-white p-4 border-l-4 border-blue-700 rounded items-center justify-center" style={{ background: "rgba(20, 71, 230, 0.05)" }}>
                    <h2 className='text-blue-700 font-bold leading-10 text-xl'>
                        FORSCOM CHAIN OF COMMAND
                    </h2>
                    <p className='text-center text-white text-lg mb-6'>
                        Below is the official FORSCOM Chain of Command:
                    </p>
                    <a src='/fade' className='w-2xl max-w-2xl h-15 flex items-center justify-center mx-auto border border-blue-700 rounded-md mb-6' style={{ background: "rgba(20, 20, 20, 0.7)" }}>
                        <p className='text-center text-blue-700 text-lg mr-2 font-bold'> Commanding General: </p>
                        <p className='text-center text-white text-lg font-bold'>General, fade297 </p>
                    </a>
                    <div className='w-2xl max-w-2xl h-15 flex items-center justify-center mx-auto border border-blue-700 rounded-md mb-6' style={{ background: "rgba(20, 20, 20, 0.7)" }}>
                        <p className='text-center text-blue-700 text-lg mr-2 font-bold'> Deputy Commanding General: </p>
                        <p className='text-center text-white text-lg font-bold'>Lieutenant General, rokillerz1 </p>
                    </div>
                    <div className='w-2xl max-w-2xl h-15 flex items-center justify-center mx-auto border border-blue-700 rounded-md mb-6' style={{ background: "rgba(20, 20, 20, 0.7)" }}>
                        <p className='text-center text-blue-700 text-lg mr-2 font-bold'> Command Sergeant Major </p>
                        <p className='text-center text-white text-lg font-bold'> Command Sergeant Major, sinxxrr </p>
                    </div>
                    <div className='w-2xl max-w-2xl h-15 flex items-center justify-center mx-auto border border-blue-700 rounded-md mb-6' style={{ background: "rgba(20, 20, 20, 0.7)" }}>
                        <p className='text-center text-blue-700 text-lg mr-2 font-bold'> Chief of Staff </p>
                        <p className='text-center text-white text-lg font-bold'>Major General, Blinky5671 </p>
                    </div>
                    <div className='w-2xl max-w-2xl h-15 flex items-center justify-center mx-auto border border-blue-700 rounded-md mb-6' style={{ background: "rgba(20, 20, 20, 0.7)" }}>
                        <p className='text-center text-blue-700 text-lg mr-2 font-bold '> Deputy Chief of Staff </p>
                        <p className='text-center text-white text-lg font-bold'>Major General, VACANT </p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center mt-8'>
                <a href='' className='px-6 py-3 text-blue-700 font-bold border-2 border-blue-700 rounded-md hover:bg-blue-700 hover:text-white transition-colors duration-300'>
                    Learn more
                </a>
            </div>
        </div>
    );
}

export default About;