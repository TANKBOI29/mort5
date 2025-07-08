import React from 'react';
import { FaGlobe, FaClock, FaShieldAlt, FaDiscord } from 'react-icons/fa';
import { SiRoblox } from 'react-icons/si';
import '/src/index.css'

function Units() {

    

    return (
        <div className="max-h-screen h-full w-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8 items-center justify-center">
            <center className="mb-12">
                <h2 className="text-4xl font-extrabold text-white">
                    Our Elite Units
                </h2>
            </center>

            {/* Central Description */}
            <div className="max-w-4xl mx-auto mb-16">
                <p className="text-white text-center text-lg leading-relaxed p-6 border-l-4 border-blue-700 rounded" 
                   style={{background: "rgba(20, 71, 230, 0.05)"}}>
                    Forces Command is a combat-based unit within the military, equipped with 4 separate divisions with their own crucial specialties that contribute to the United States' success when deployed. With over 1,000 active serving personnel, Forces Command focuses on combat readiness for campaign-based combat at any moment, in any environment. Forces Command strives to maintain an atmosphere of discipline, nobility, and fortitude throughout all divisions beneath the unit.
                </p>
            </div>

            {/* Static Unit Buttons */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 1st Infantry Division */}
                <a href="/units/1id" className="block p-6 border-2 border-green-700 rounded-lg bg-black/60 hover:bg-green-700 hover:text-white transition-colors text-center shadow-lg">
                    <div className="text-2xl font-bold mb-2">1st Infantry Division</div>
                    <div className="mb-2 text-green-400">"The Big Red One"</div>
                    <div className="mb-2 text-sm">Ground operations, discipline, tradition, and excellence.</div>
                    <div className="text-xs text-green-300 underline">Learn more</div>
                </a>
                {/* 82nd Airborne Division */}
                <a href="/units/82nd" className="block p-6 border-2 border-red-700 rounded-lg bg-black/50 hover:bg-red-700 hover:text-white transition-colors text-center shadow-lg">
                    <div className="text-2xl font-bold mb-2">82nd Airborne Division</div>
                    <div className="mb-2 text-red-400">"All American"</div>
                    <div className="mb-2 text-sm">Rapid deployment, airborne assaults, high-risk ops.</div>
                    <div className="text-xs text-red-300 underline">Learn more</div>
                </a>
                {/* 101st Airborne Division */}
                <a href="/units/101st" className="block p-6 border-2 border-blue-700 rounded-lg bg-black/60 hover:bg-blue-500 hover:text-white transition-colors text-center shadow-lg">
                    <div className="text-2xl font-bold mb-2">101st Airborne Division</div>
                    <div className="mb-2 text-blue-400">"Screaming Eagles"</div>
                    <div className="mb-2 text-sm">Air assault, mobility, precision, and coordination.</div>
                    <div className="text-xs text-blue-600 underline">Learn more</div>
                </a>
                {/* 1st Cavalry Division */}
                <a href="/units/1cav" className="block p-6 border-2 border-yellow-500 rounded-lg bg-black/50 hover:bg-yellow-500 hover:text-white transition-colors text-center shadow-lg">
                    <div className="text-2xl font-bold mb-2">1st Cavalry Division</div>
                    <div className="mb-2 text-yellow-400">"First Team"</div>
                    <div className="mb-2 text-sm">Versatility, speed, and armored dominance.</div>
                    <div className="text-xs text-yellow-300 underline">Learn more</div>
                </a>
            </div>

            
        </div>
    );
}

export default Units;