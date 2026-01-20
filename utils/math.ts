const G = 9.8 * 1.8;
const P = 1.2;
import type { Vector } from '../src/Components/templates/Canvas';


export function calculateDistance(xa: number, ya: number, xb: number, yb: number) {
    const dx = xb - xa;
    const dy = yb - ya;
    return Math.sqrt(dx * dx + dy * dy);
}

export function calculateElevation(d: number, v: number, h: number = 0,): number {
    const squareRoot = Math.sqrt(v ** 4 - G * (G * d ** 2 + 2 * h * v ** 2));
    const radians = Math.atan((v ** 2 + squareRoot) / (G * d));
    return radians * (180 / Math.PI);
      
}    

export function calculateTimeOfFlight(e: number, v: number, d: number): number {
    const radians = (e * Math.PI) / 180;
    return d / (v * Math.cos(radians));
}

export function calculateAzimuth(x1: number, y1: number, x2: number, y2: number, offset: number): number {
    const radians = Math.atan2(y2 - y1, x2 - x1);
    return Math.abs(
      
      (offset + (radians * 180) / Math.PI + 360) % 360,
    );
}

export function studsToMeters(s: number): number {
    return s / (5 / 1.8);
}
  
/**
  * @param m Meters
  * @returns Studs
  */
export function metersToStuds(m: number): number {
  return m * (5 / 1.8);
}

export function drawLine(x1: number, y1: number, x2: number, y2: number): void {
  calculateDistance(x1, y1, x2, y2);
  const canvas = document.getElementById('map-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const distance = calculateDistance(x1, y1, x2, y2);
  console.log("Distance:", distance);

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

}
export function calculateMaxRangeDiameter(v: number, h: number = 0): number {
  const a = -0.5 * G;
  const b = (v * Math.sqrt(2)) / 2;

  const discriminant = b ** 2 - 4 * a * h;
  const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

  return ((v * Math.sqrt(2)) / 2) * Math.max(t1, t2);
}

export default async function drawRad(
  context: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  maxRadius: number,
  scaledDimension: number,
) {
  const gunX = x1 * scaledDimension;
  const gunY = x1 * scaledDimension;

  context.lineWidth = 20;
  context.strokeStyle = 'rgba(0, 50, 255, 0.5)';
  context.beginPath();
  context.arc(gunX, gunY, maxRadius, 0, Math.PI * 2);
  context.stroke();

}