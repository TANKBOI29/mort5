// Simple store for calculation results
type CalculationResults = {
  distance: number | null;
  azimuth: number | null;
  elevation: number | null;
  timeOfFlight: number | null;
};

let calculationResults: CalculationResults = {
  distance: null,
  azimuth: null,
  elevation: null,
  timeOfFlight: null,
};

const listeners = new Set<() => void>();

export const calculationStore = {
  getResults: (): CalculationResults => ({ ...calculationResults }),
  
  setResults: (results: CalculationResults) => {
    calculationResults = { ...results };
    console.log('Store: Setting results:', calculationResults);
    console.log('Store: Number of listeners:', listeners.size);
    // Call all listeners to trigger re-renders
    listeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        console.error('Error in store listener:', error);
      }
    });
  },
  
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

