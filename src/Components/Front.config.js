// Front Component Configuration
// This file contains all configurable values for easy maintenance and customization

export const FRONT_CONFIG = {
  // Default mortar location
  defaultMortarLocation: "B2",
  
  // Map configuration
  map: {
    defaultImage: 'https://i.postimg.cc/cLKqFncw/WGRV-NEW.png',
    altText: 'Artillery calculation map',
    maxHeight: '70vh',
    borderRadius: '1rem'
  },
  
  // Results configuration
  results: {
    defaultValues: {
      distance: "1754 studs",
      timeOfFlight: "4.32s",
      azimuth: "152.56",
      elevation: "51.32"
    },
    labels: {
      distance: "Distance",
      timeOfFlight: "Time of flight",
      azimuth: "Azimuth",
      elevation: "Elevation"
    }
  },
  
  // Layout configuration
  layout: {
    container: {
      maxWidth: '80rem',
      padding: {
        horizontal: '1.5rem',
        bottom: '3rem'
      }
    },
    grid: {
      gap: {
        mobile: '1.5rem',
        desktop: '2rem'
      },
      columns: {
        mobile: 1,
        desktop: 5,
        mapSpan: 3,
        resultsSpan: 2
      }
    }
  },
  
  // Responsive breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  
  // Animation configuration
  animations: {
    fadeIn: {
      duration: '250ms',
      easing: 'ease-in-out'
    },
    hover: {
      duration: '150ms',
      easing: 'ease-in-out'
    }
  },
  
  // Accessibility configuration
  accessibility: {
    labels: {
      mortarLocation: 'Change mortar location',
      map: 'Artillery calculation map'
    },
    descriptions: {
      mortarLocation: 'Click to change the selected mortar location on the map'
    }
  }
};

// Helper function to get responsive values
export const getResponsiveValue = (mobileValue, desktopValue, breakpoint = 'lg') => {
  return {
    [breakpoint]: desktopValue,
    default: mobileValue
  };
};

// Helper function to merge configurations
export const mergeConfig = (baseConfig, customConfig) => {
  return {
    ...baseConfig,
    ...customConfig,
    results: {
      ...baseConfig.results,
      ...customConfig.results,
      defaultValues: {
        ...baseConfig.results.defaultValues,
        ...customConfig.results?.defaultValues
      }
    }
  };
};

export default FRONT_CONFIG;
