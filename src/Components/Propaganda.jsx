import React from 'react';
import { FaInfoCircle, FaUsers, FaImage } from 'react-icons/fa';
import '/src/index.css'
import IDProp from './Assets/img/infantry.png';
import ParaProp from './Assets/img/parachute-prop.png';
import CavProp from './Assets/img/cavarly.png';
import SkyProp from './Assets/img/sky-prop.jpg';

function Propaganda() {
    return (
        <div className="max-h-screen h-full w-full bg-transparent py-12 px-4 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Propaganda</h2>
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-black/70 border-2 border-yellow-400 rounded-lg overflow-hidden shadow-lg flex flex-col">
                    <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/1ZLQQQVZrYs?si=Sf11zw50lv5wvUuH" title="1CAV Propaganda" allowFullScreen></iframe>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="text-white font-bold text-lg mb-1">1CAV Propaganda</div>
                        <div className="text-yellow-300 font-bold text-base">Greywolf Brigade, 1st Cavarly Division</div>
                    </div>
                </div>
                <div className="bg-black/70 border-2 border-yellow-400 rounded-lg overflow-hidden shadow-lg flex flex-col">
                    <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/sSag0PRdMtk?si=PKwLa7cnNYQqZnXT" title="Longknife Propaganda" allowFullScreen></iframe>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="text-white font-bold text-lg mb-1">Longknife Propaganda</div>
                        <div className="text-yellow-300 font-bold text-base">Longknife Company, 1st Infantry Division</div>
                    </div>
                </div>
                <div className="bg-black/70 border-2 border-yellow-400 rounded-lg overflow-hidden shadow-lg flex flex-col">
                    <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/VIDEO_ID3" title="FORSCOM propaganda" allowFullScreen></iframe>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="text-white font-bold text-lg mb-1">FORSCOM propaganda</div>
                        <div className="text-yellow-300 font-bold text-base">Forces Command</div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-black/70 border-2 border-green-700 rounded-lg overflow-hidden shadow-lg flex flex-col">
                    <img className="w-full h-40 object-cover" src={IDProp} alt="1ID" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="text-green-700 font-bold text-base">1st Infantry Division</div>
                    </div>
                </div>
                <div className="bg-black/70 border-2 border-yellow-500 rounded-lg overflow-hidden shadow-lg flex flex-col">
                    <img className="w-full h-40 object-cover" src={CavProp} alt="1CAV" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="text-yellow-500 font-bold text-base">1st Cavarly Division</div>
                    </div>
                </div>
                <div className="bg-black/70 border-2 border-blue-700 rounded-lg overflow-hidden shadow-lg flex flex-col">
                    <img className="w-full h-40 object-cover" src={SkyProp} alt="101ST" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="text-blue-700 font-bold text-base">101st Airborne Division</div>
                    </div>
                </div>
                <div className="bg-black/70 border-2 border-red-700 rounded-lg overflow-hidden shadow-lg flex flex-col">
                    <img className="w-full h-40 object-cover" src={ParaProp} alt="82ND" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="text-red-700 font-bold text-base">82nd Airborne Division</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Propaganda
