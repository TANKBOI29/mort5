const G = 9.8 * 1.8;
const P = 1.2;



export function calculateDistance(xa: number, ya: number, xb: number, yb: number) {
    const dx = xb - xa;
    const dy = yb - ya;
    return dx * dx + dy * dy;
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