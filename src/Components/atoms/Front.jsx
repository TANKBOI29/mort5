import React, { useState, useRef, useEffect } from 'react';
import { FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { calculationStore } from '../../stores/calculations';

const Front = () => {
  const mortarLoc = "B2";

  // State for calculated results (from LeafletMap)
  const [results, setResults] = useState(calculationStore.getResults());

  // Add pulse animation CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.8;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.2);
          opacity: 0.6;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.8;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleClick = (event) => {
    if (!imageRef.current || isDragging) {
      return;
    }

    const containerRect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    // Get the image's actual position and size in the container
    const imageRect = imageRef.current.getBoundingClientRect();
    const containerImageRect = {
      left: panX,
      top: panY,
      width: imageRef.current.naturalWidth * zoomLevel,
      height: imageRef.current.naturalHeight * zoomLevel
    };

    // Check if click is within the image bounds
    if (mouseX >= containerImageRect.left && 
        mouseX <= containerImageRect.left + containerImageRect.width &&
        mouseY >= containerImageRect.top && 
        mouseY <= containerImageRect.top + containerImageRect.height) {
      
      // Calculate position relative to the image
      const imageX = (mouseX - containerImageRect.left) / zoomLevel;
      const imageY = (mouseY - containerImageRect.top) / zoomLevel;
      
      // Convert to percentage of original image
      const xPercent = (imageX / imageRef.current.naturalWidth) * 100;
      const yPercent = (imageY / imageRef.current.naturalHeight) * 100;

      // Add marker to state (replace existing marker)
      setMarkers([{ xPercent, yPercent }]);

      console.log("Clicked at:", { mouseX, mouseY, xPercent, yPercent });
      console.log("Marker placed at:", { xPercent, yPercent });
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanX(0);
    setPanY(0);
    setTimeout(centerImage, 100);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoom);
    
    // Auto-center when zooming out
    setTimeout(() => {
      centerImage();
    }, 50);
  };

  const handleMouseDown = (event) => {
    if (event.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: event.clientX - panX, y: event.clientY - panY });
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      setPanX(event.clientX - dragStart.x);
      setPanY(event.clientY - dragStart.y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Only center if we're at 100% zoom or below
    if (zoomLevel <= 1) {
      setTimeout(centerImage, 50);
    }
  };

  const centerImage = () => {
    if (!imageRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const imageWidth = imageRef.current.naturalWidth;
    const imageHeight = imageRef.current.naturalHeight;
    
    // Calculate center position for the scaled image
    const scaledWidth = imageWidth * zoomLevel;
    const scaledHeight = imageHeight * zoomLevel;
    
    const centerX = (containerRect.width - scaledWidth) / 2;
    const centerY = (containerRect.height - scaledHeight) / 2;
    
    // Only center if the image is smaller than the container
    if (scaledWidth < containerRect.width) {
      setPanX(centerX);
    } else {
      setPanX(0);
    }
    
    if (scaledHeight < containerRect.height) {
      setPanY(centerY);
    } else {
      setPanY(0);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // Subscribe to calculation results from LeafletMap
  useEffect(() => {
    const updateResults = () => {
      const newResults = calculationStore.getResults();
      console.log('Front.jsx: Received new results from store:', newResults);
      setResults(newResults);
    };
    
    const unsubscribe = calculationStore.subscribe(updateResults);
    
    // Initial load
    updateResults();
    
    return unsubscribe;
  }, []);
  
  return (
      <div className='w-3/4 mx-auto pb-12.25 flex items-center justify-center' id='container'>
        <div className='w-3/5 h-full flex items-center justify-center' id='map-container'>
          <div 
            ref={containerRef}
            className='rounded-xl mx-auto relative overflow-hidden cursor-grab active:cursor-grabbing' 
            id='map' 
            aria-hidden="false" 
            onClick={handleClick}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas 
              id="map-canvas"
              className='relative'
              style={{ 
                transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
                transformOrigin: '0 0'
              }}
            >
              <img 
                ref={imageRef} 
                className='rounded-t-xl' 
                src='https://i.postimg.cc/cLKqFncw/WGRV-NEW.png' 
                alt='404: Error Not Found'
                draggable={false}
              />
              {markers.map((marker, index) => {
                // Calculate marker position in container coordinates
                const markerX = (marker.xPercent / 100) * imageRef.current?.naturalWidth * zoomLevel || 0;
                const markerY = (marker.yPercent / 100) * imageRef.current?.naturalHeight * zoomLevel || 0;
                
                // Calculate scale based on zoom level (markers get bigger as you zoom in)
                const scale = Math.max(0.8, 1 + (zoomLevel - 1) * 0.4); // min scale 0.8, more responsive scaling
                
                return (
                  <div
                    key={index}
                    style={{
                    position: "absolute",
                    left: `${markerX}px`,
                    top: `${markerY}px`,
                    width: "400px",
                    height: "400px",
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    pointerEvents: "none",
                    zIndex: 10
                  }}
                >
                  {/* HUGE blast radius background */}
                  <div
                    style={{
                      position: "absolute",
                      width: "400px",
                      height: "400px",
                      background: "radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(239, 68, 68, 0.4) 15%, rgba(239, 68, 68, 0.2) 30%, rgba(239, 68, 68, 0.1) 50%, transparent 70%)",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                      top: "50%",
                      left: "50%",
                      animation: "pulse 2s infinite"
                    }}
                  />
                  {/* Small center dot */}
                  <div
                    style={{
                      position: "absolute",
                      width: "12px",
                      height: "12px",
                      background: "red",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                      top: "50%",
                      left: "50%",
                      zIndex: 2
                    }}
                  />
                </div>
              );
        })}
            </canvas>
            <div className='w-full h-10 bg-neutral-900 border border-neutral-800 rounded-b-xl justify-center items-center flex' id='map-text'>
              <div className='flex items-center'>
                <span className='text-sm text-neuxsal-400 ml-2 hidden sm:inline'>Mortar Location Selected:</span>
                <button type='button' aria-label='language' aria-expanded='false' className='ml-2 h-5 px-2.5 inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-sm'>
                  <span>{mortarLoc}</span>
                  <FaChevronDown size={12} className='opacity-80' />
                </button>
              </div>
              <div className='flex items-center gap-2 ml-auto mr-4'>
                <button 
                  onClick={handleZoomOut}
                  className='h-6 w-6 flex items-center justify-center rounded border border-white/10 bg-white/5 hover:bg-white/10 text-xs'
                  title='Zoom Out'
                >
                  -
                </button>
                <span className='text-xs text-neutral-400 min-w-[3rem] text-center'>
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button 
                  onClick={handleZoomIn}
                  className='h-6 w-6 flex items-center justify-center rounded border border-white/10 bg-white/5 hover:bg-white/10 text-xs'
                  title='Zoom In'
                >
                  +
                </button>
                <button 
                  onClick={handleResetZoom}
                  className='h-6 px-2 flex items-center justify-center rounded border border-white/10 bg-white/5 hover:bg-white/10 text-xs'
                  title='Reset Zoom'
                >
                  Reset
                </button>
              </div>
              {/* <p className='ml-2 text-sm font-mono text-slate-300'>Created by, TANKBOI29. Inspired by <a href='https://artillery-calculator.com/' className='font-mono text-indigo-700 underline'>MTC Artillery Calculator</a></p> */}
            </div>
          </div>
        </div>

        <div className='w-2/6 h-full rounded-xl mx-auto my-auto flex items-center justify-center' id='results-container'>
          <div className='bg-neutral-900 h-119 max-h-screen w-full rounded-xl border border-neutral-800 flex flex-col-reverse justify-end items-stretch mx-5' id='results-tab'>
            
            <div className='w-full h-1/12 flex flex-row justify-between items-start '>
                <p href='#' aria-label='Updates' className='hover:text-white transition-colors w-1/3 text-left ml-10 text-xl'>Distance</p>
                <span className='text-neutral-500 w-1/3 text-right mr-10 text-xl' id='distance-result'>
                  {results.distance !== null ? `${results.distance.toFixed(2)} studs` : '1754 studs'}
                </span>
            </div>
            <div className='w-full h-1/12 flex flex-row justify-between items-start '>
                <p href='#' aria-label='Updates' className='hover:text-white transition-colors w-1/3 text-left ml-10 text-xl'>Time of flight</p>
                <span className='text-neutral-500 w-1/3 text-right mr-10 text-xl' id='timeofflight-result'>
                  {results.timeOfFlight !== null ? `${results.timeOfFlight.toFixed(2)}s` : '4.32s'}
                </span>
            </div>
            <div className='w-full h-1/12 flex flex-row justify-between items-start '>
                <p href='#' aria-label='Updates' className='hover:text-white transition-colors w-1/3 text-left ml-10 text-xl'>Azimuth</p>
                <span className='text-neutral-500 w-1/3 text-right mr-10 text-xl' id='azimuth-result'>
                  {results.azimuth !== null ? results.azimuth.toFixed(2) : 'hi'}
                </span>
            </div>
            <div className='w-full h-1/12 flex flex-row justify-between items-start mt-5'>
                <p href='#' aria-label='Updates' className='hover:text-white transition-colors w-1/3 text-left ml-10 text-xl'>Elevation</p>
                <span className='text-neutral-500 w-1/3 text-right mr-10 text-xl' id='elevation-result'>
                  {results.elevation !== null ? results.elevation.toFixed(2) : 'hi'}
                </span>
            </div>
          </div>
        </div>
      </div>
    
  )
};

export default Front;
