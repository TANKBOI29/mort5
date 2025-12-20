import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MapContainer, Marker, Popup, Tooltip, useMapEvents, ImageOverlay, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Dropdown from './Dropdown';
import { calculateDistance, calculateAzimuth, calculateElevation, calculateTimeOfFlight } from '../../../utils/math';
import { calculationStore } from '../../stores/calculations';





const mapStyles = `
  .leaflet-container {
    background-color: #171717 !important; /* neutral-900 */
  }
  .leaflet-tile-pane {
    background-color: #171717 !important;
  }
  .leaflet-control-container {
    background-color: transparent;
  }
  .custom-marker {
    transform-origin: center center;
    pointer-events: none;
  }
  .custom-marker .marker-wrapper {
    width: 10px;
    height: 10px;
    transform-origin: center center;
  }
  .custom-marker .marker-container {
    width: 20px;
    height: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: center center;
    /* Container will be inverse-scaled to maintain constant screen size */
  }
  .custom-marker .marker-container::before {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    background: radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0.2) 30%, transparent 10%);
    border-radius: 100px;
    animation: pulse 2s infinite;
  }
  .custom-marker .marker-container::after {
    content: '';
    position: relative;
    width: 8px;
    height: 8px;
    background-color: #ef4444;
    border-radius: 16px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    z-index: 2;
  }
  .custom-marker-blue .marker-container {
    width: 20px;
    height: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: center center;
  }
  .custom-marker-blue .marker-container::after {
    content: '';
    position: relative;
    width: 8px;
    height: 8px;
    background-color: #3b82f6;
    border-radius: 16px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    z-index: 2;
  }
  @keyframes pulse {
   0% {
     opacity: 1;
   }
   50% {
     opacity: 0.7;
   }
   100% {
     opacity: 1;
   }
 }
`;

// marker icon
const createCustomIcon = (color = 'red', markerId, hasBlastRadius = true) => {
  const className = (color === 'blue' && !hasBlastRadius) ? 'custom-marker-blue' : 'custom-marker';
  return L.divIcon({
    className: className,
    html: `<div class="marker-wrapper" data-marker-id="${markerId}"><div class="marker-container"></div></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};




// Component to handle map events
function MapEvents({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

// Component to handle marker scaling based on zoom
function MarkerScaleHandler({ markers }) {
  const map = useMapEvents({});
  
  const updateScale = () => {
    const zoom = map.getZoom();
    // Base zoom is -1, so markers scale from 0.7x at min zoom to 1.3x at max zoom
    const baseZoom = -1;
    const scale = 0.7 + (zoom - baseZoom) * 0.15; // 0.7 - 1.3
    // i fucking hate this so much
    // Apply scaling to all markers with a small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      markers.forEach((marker) => {
        const markerElement = document.querySelector(`[data-marker-id="${marker.id}"]`);
        if (markerElement) {
          // Apply scale
          markerElement.style.transform = `scale(${scale})`;
          markerElement.style.transformOrigin = 'center center';
          
          // Apply inverse scale
          const container = markerElement.querySelector('.marker-container');
          if (container) {
            const inverseScale = 1 / scale;
            container.style.transform = `scale(${inverseScale})`;
            container.style.transformOrigin = 'center center';
          }
        }
      });
    });
  };

  // Update scale when markers change or on zoom
  useEffect(() => {
    
    const handleZoom = () => {
      updateScale();
    };
    
    map.on("zoomend", handleZoom);
    map.whenReady(() => {
      updateScale();
    });
    
    // Also update when markers change
    const timer = setTimeout(() => {
      updateScale();
    }, 100);
    
    return () => {
      map.off("zoomend", handleZoom);
      clearTimeout(timer);
    };
  }, [markers]);

  // no idea what this even does but apparently it's needed for some fucking reason
  return null;
}

const LeafletMap = () => {
  const mortarOptions = [
    { value: 'b2', label: 'B2' },
    { value: 'd3', label: 'D3' },
    { value: 'e2', label: 'E2' },
  ];
  const [selectedMortar, setSelectedMortar] = useState('b2');


  // Permanent markers
  const permanentMarkerB2 = {
    id: 'permanent-marker-b2',
    position: [230.25, -80.25],
    color: 'blue',
    isPermanent: true
  };

  const permanentMarkerD3 = {
    id: 'permanent-marker-d3',
    position: [-40.75, -9.25],
    color: 'blue',
    isPermanent: true
  };

  const [markers, setMarkers] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({ width: 1200, height: 1200 }); // Default dimensions
  const [results, setResults] = useState({
    distance: null,
    azimuth: null,
    elevation: null,
    timeOfFlight: null
  });

  // Variable to track current permanent marker and its position
  const currentPermanentMarker = useMemo(() => {
    if (selectedMortar === 'b2') {
      return {
        id: 'permanent-marker-b2',
        name: 'B2',
        position: permanentMarkerB2.position,
        lat: permanentMarkerB2.position[0],
        lng: permanentMarkerB2.position[1]
      };
    } else if (selectedMortar === 'd3') {
      return {
        id: 'permanent-marker-d3',
        name: 'D3',
        position: permanentMarkerD3.position,
        lat: permanentMarkerD3.position[0],
        lng: permanentMarkerD3.position[1]
      };
    }
    return null;
  }, [selectedMortar]);

  // Update markers when selectedMortar changes - show permanent marker based on selection
  useEffect(() => {
    setMarkers(prev => {
      const nonPermanentMarkers = prev.filter(m => !m.isPermanent);
      
      if (selectedMortar === 'b2') {
        // Include B2 permanent marker if B2 is selected
        const hasB2Marker = prev.some(m => m.id === 'permanent-marker-b2');
        return hasB2Marker ? prev : [...nonPermanentMarkers, permanentMarkerB2];
      } else if (selectedMortar === 'd3') {
        // Include D3 permanent marker if D3 is selected
        const hasD3Marker = prev.some(m => m.id === 'permanent-marker-d3');
        return hasD3Marker ? prev : [...nonPermanentMarkers, permanentMarkerD3];
      } else {
        // Remove all permanent markers if neither B2 nor D3 is selected
        return nonPermanentMarkers;
      }
    });
  }, [selectedMortar]);

  // Inject custom style
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = mapStyles;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);



  // Load image to get dimensions
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = 'https://i.postimg.cc/cLKqFncw/WGRV-NEW.png';
  }, []);

  const imageUrl = 'https://i.postimg.cc/cLKqFncw/WGRV-NEW.png';
  const imageWidth = imageDimensions.width;
  const imageHeight = imageDimensions.height;
  const imageBounds = [[-imageHeight/2, -imageWidth/2], [imageHeight/2, imageWidth/2]];
  
  const mapCenter = [0, 0];
  const mapZoom = -1;

  // hmm, wonder what this does
  const handleMapClick = (latlng) => {
    const newMarker = {
      id: Date.now(),
      position: [latlng.lat, latlng.lng],
      color: 'red'
    };
    // Keep permanent markers and add the new one
    setMarkers(prev => {
      const permanentMarkers = prev.filter(m => m.isPermanent);
      return [...permanentMarkers, newMarker];
    });
    console.log('Marker added at:', latlng);
  };

  // Get the line coordinates for drawing between permanent marker and clicked marker
  const lineCoordinates = useMemo(() => {
    if (currentPermanentMarker) {
      const clickedMarker = markers.find(m => !m.isPermanent);
      if (clickedMarker) {
        return [
          [currentPermanentMarker.lat, currentPermanentMarker.lng],
          [clickedMarker.position[0], clickedMarker.position[1]]
        ];
      }
    }
    return null;
  }, [markers, currentPermanentMarker]);

  // Calculate and print math results when both markers are present
  useEffect(() => {
    if (currentPermanentMarker) {
      const clickedMarker = markers.find(m => !m.isPermanent);
      if (clickedMarker) {
        const x1 = currentPermanentMarker.lat;
        const y1 = currentPermanentMarker.lng;
        const x2 = clickedMarker.position[0];
        const y2 = clickedMarker.position[1];

        // Calculate distance (returns squared distance, so take square root)
        const squaredDistance = calculateDistance(x1, y1, x2, y2);
        const distance = Math.sqrt(squaredDistance);

        // Set offset based on selected mortar
        // B2: 32.5, D3: 64, E2: 50
        let offset = 0;
        if (selectedMortar === 'b2') {
          offset = 32.52;
        } else if (selectedMortar === 'd3') {
          offset = 189;
        } else if (selectedMortar === 'e2') {
          offset = 50;
        }
        
        // Calculate azimuth
        const azimuth = calculateAzimuth(x1, y1, x2, y2, offset);

        // For elevation and time of flight, we need velocity
        // Using a default velocity value (you may want to adjust this)
        const velocity = 729 / 10; // Default velocity value
        const height = 0; // Default height

        // Calculate elevation
        const elevation = calculateElevation(distance, velocity, height);

        // Calculate time of flight
        const timeOfFlight = calculateTimeOfFlight(elevation, velocity, distance);

        
        // Store results in shared store
        const newResults = {
          distance: distance,
          azimuth: azimuth,
          elevation: elevation,
          timeOfFlight: timeOfFlight
        };
        calculationStore.setResults(newResults);
        setResults(newResults);

        // Print all results
        console.log('=== Marker Calculations ===');
        console.log('Permanent Marker Position:', { lat: x1, lng: y1 });
        console.log('Clicked Marker Position:', { lat: x2, lng: y2 });
        console.log('Distance (squared):', squaredDistance);
        console.log('Distance:', distance);
        console.log('Azimuth:', azimuth);
        console.log('Elevation:', elevation);
        console.log('Time of Flight:', timeOfFlight);
        console.log('Velocity used:', velocity);
        console.log('==========================');
      } else {
        // Reset results when no marker
        const resetResults = {
          distance: null,
          azimuth: null,
          elevation: null,
          timeOfFlight: null
        };
        calculationStore.setResults(resetResults);
        setResults(resetResults);
      }
    } else {
      // Reset results when no permanent marker
      const resetResults = {
        distance: null,
        azimuth: null,
        elevation: null,
        timeOfFlight: null
      };
      calculationStore.setResults(resetResults);
      setResults(resetResults);
    }
  }, [markers, currentPermanentMarker, selectedMortar]); 
  // self explanatory
  const removeMarker = (id) => {
    setMarkers(prev => prev.filter(marker => marker.id !== id && marker.isPermanent !== true));
  };
  return (
    <div className="w-3/4 mx-auto pb-12.25 flex items-center justify-center">
      <div className="w-3/5 h-full flex items-center justify-center">
        <div className="rounded-xl mx-auto relative overflow-hidden border border-neutral-800" style={{ height: '500px', width: '100%' }}>
          <div className="rounded-t-xl overflow-hidden" style={{ height: '460px', width: '100%' }}>
            <MapContainer
              key="leaflet-map"
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
              crs={L.CRS.Simple}
              minZoom={-1}
              maxZoom={3}
              maxBounds={imageBounds}
              maxBoundsViscosity={1.0}
            >
              <ImageOverlay
                url={imageUrl}
                bounds={imageBounds}
              />
              
              {/* event handler */}
              <MapEvents onMapClick={handleMapClick} />
              <MarkerScaleHandler markers={markers} />
              
              {/* render markers */}
              {markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  icon={createCustomIcon(marker.color, marker.id, !marker.isPermanent)}
                  interactive={false}
                >
                  {marker.label && (
                    <Tooltip permanent direction="top" offset={[0, -10]}>
                      {marker.label}
                    </Tooltip>
                  )}
                </Marker>
              ))}

              {/* Draw line from permanent marker to clicked marker */}
              {lineCoordinates && (
                <Polyline
                  positions={lineCoordinates}
                  color="#ffffff"
                  weight={2}
                  opacity={0.5}
                />
              )}

            </MapContainer>
          </div>
          
          {/* Map footer  */}
          <div className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded-b-xl justify-center items-center flex relative" style={{ zIndex: 2000 }}>
            <div className="flex items-center relative" style={{ zIndex: 2001 }}>
              <span className="text-sm text-neuxsal-400 ml-2 hidden sm:inline">Mortar Location Selected:</span>
              <Dropdown 
                options={mortarOptions} 
                value={selectedMortar} 
                onChange={(option) => setSelectedMortar(option.value)}
                placeholder="Select Mortar" 
                className="min-w-[120px] ml-3 max-h-[30px] mx-auto"
                zIndex={2002}/>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="w-2/6 h-full rounded-xl mx-auto my-auto flex items-center justify-center">
        <div className="bg-neutral-900 h-119 max-h-screen w-full rounded-xl border border-neutral-800 flex flex-col-reverse justify-end items-stretch mx-5">
          <div className="w-full h-1/12 flex flex-row justify-between items-start">
            <p className="hover:text-white transition-colors w-1/3 text-left ml-10 text-xl">Distance</p>
            <span className="text-neutral-500 w-1/3 text-right mr-10 text-xl">
              {results.distance !== null ? `${results.distance.toFixed(2)} studs` : '1754 studs'}
            </span>
          </div>
          <div className="w-full h-1/12 flex flex-row justify-between items-start">
            <p className="hover:text-white transition-colors w-1/3 text-left ml-10 text-xl">Time of flight</p>
            <span className="text-neutral-500 w-1/3 text-right mr-10 text-xl">
              {results.timeOfFlight !== null ? `${results.timeOfFlight.toFixed(2)}s` : '4.32s'}
            </span>
          </div>
          <div className="w-full h-1/12 flex flex-row justify-between items-start">
            <p className="hover:text-white transition-colors w-1/3 text-left ml-10 text-xl">Azimuth</p>
            <span className="text-neutral-500 w-1/3 text-right mr-10 text-xl">
              {results.azimuth !== null ? results.azimuth.toFixed(2) : '152.56'}
            </span>
          </div>
          <div className="w-full h-1/12 flex flex-row justify-between items-start mt-5">
            <p className="hover:text-white transition-colors w-1/3 text-left ml-10 text-xl">Elevation</p>
            <span className="text-neutral-500 w-1/3 text-right mr-10 text-xl">
              {results.elevation !== null ? results.elevation.toFixed(2) : '51.32'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;
