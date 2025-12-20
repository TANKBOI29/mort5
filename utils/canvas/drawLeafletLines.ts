import type L from 'leaflet';
import drawLine from './drawLine';

interface Marker {
  id: number | string;
  position: [number, number]; // [lat, lng]
  color?: string;
}

interface DrawLinesParams {
  canvas: HTMLCanvasElement;
  map: L.Map;
  markers: Marker[];
  mortarPosition: [number, number]; // [lat, lng]
  canvasScale?: number;
}

/**
 * Draws lines from the mortar position to each target marker on the Leaflet map canvas
 */
export default function drawLeafletLines({
  canvas,
  map,
  markers,
  mortarPosition,
  canvasScale = 1,
}: DrawLinesParams): void {
  const context = canvas.getContext('2d');
  if (!context || markers.length === 0) return;

  // Set canvas size to match map container
  const mapContainer = canvas.parentElement;
  if (mapContainer) {
    const rect = mapContainer.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Get mortar position in container pixels
  const mortarPixel = map.latLngToContainerPoint(mortarPosition);
  const zoom = map.getZoom();
  const scaledDimension = Math.max(canvas.width, canvas.height);

  // Draw line for each marker
  markers.forEach((marker) => {
    const targetPixel = map.latLngToContainerPoint(marker.position);

    // Convert container pixels to normalized coordinates (0-1 range)
    // drawLine expects normalized coords and multiplies by scaledDimension
    const gun = {
      x: mortarPixel.x / scaledDimension,
      y: mortarPixel.y / scaledDimension,
    };
    const target = {
      x: targetPixel.x / scaledDimension,
      y: targetPixel.y / scaledDimension,
    };

    // Use drawLine utility
    drawLine(context, canvasScale, zoom, gun, target, scaledDimension);
  });
}

