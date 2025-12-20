# Front Component - Scalable Artillery Calculator

The Front component has been refactored to be highly scalable, maintainable, and responsive across all device sizes.

## Features

### 🎯 **Scalability**
- **Component-based architecture** - Broken down into reusable sub-components
- **Configuration-driven** - Easy to customize without code changes
- **Responsive design** - Works seamlessly on mobile, tablet, and desktop
- **CSS custom properties** - Consistent theming and easy customization

### 📱 **Responsive Design**
- **Mobile-first approach** - Optimized for small screens
- **CSS Grid layout** - Flexible and adaptive grid system
- **Breakpoint system** - Smooth transitions between screen sizes
- **Touch-friendly** - Optimized for mobile interactions

### ⚙️ **Configuration**
- **External config file** - All settings in one place
- **Merge system** - Combine default and custom configurations
- **Helper functions** - Utility functions for common operations
- **Type-safe** - Clear structure for configuration objects

## Usage

### Basic Usage
```jsx
import Front from './Components/Front';

function App() {
  return <Front />;
}
```

### Custom Configuration
```jsx
import Front from './Components/Front';

const customConfig = {
  defaultMortarLocation: "C3",
  results: {
    defaultValues: {
      distance: "2000 studs",
      timeOfFlight: "5.2s",
      azimuth: "180.00",
      elevation: "45.00"
    }
  },
  map: {
    defaultImage: '/custom-map.png'
  }
};

function App() {
  return <Front customConfig={customConfig} />;
}
```

## Component Structure

```
Front/
├── Front.jsx          # Main component
├── Front.css          # Component-specific styles
├── Front.config.js    # Configuration file
└── README.md          # This documentation
```

### Sub-components
- **MapDisplay** - Handles map rendering and mortar location selection
- **ResultsDisplay** - Displays calculation results
- **ResultRow** - Individual result row with label and value

## Configuration Options

### Layout Configuration
```javascript
layout: {
  container: {
    maxWidth: '80rem',
    padding: { horizontal: '1.5rem', bottom: '3rem' }
  },
  grid: {
    gap: { mobile: '1.5rem', desktop: '2rem' },
    columns: { mobile: 1, desktop: 5, mapSpan: 3, resultsSpan: 2 }
  }
}
```

### Results Configuration
```javascript
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
}
```

### Accessibility Configuration
```javascript
accessibility: {
  labels: {
    mortarLocation: 'Change mortar location',
    map: 'Artillery calculation map'
  },
  descriptions: {
    mortarLocation: 'Click to change the selected mortar location on the map'
  }
}
```

## CSS Custom Properties

The component uses CSS custom properties for consistent theming:

```css
:root {
  --front-bg-primary: #171717;
  --front-bg-secondary: #262626;
  --front-border-color: #404040;
  --front-text-primary: #d4d4d4;
  --front-text-secondary: #a3a3a3;
  --front-accent: #3b82f6;
  
  --front-spacing-xs: 0.5rem;
  --front-spacing-sm: 1rem;
  --front-spacing-md: 1.5rem;
  --front-spacing-lg: 2rem;
  --front-spacing-xl: 3rem;
}
```

## Responsive Breakpoints

- **Mobile**: < 640px
- **Small**: 640px - 768px
- **Medium**: 768px - 1024px
- **Large**: 1024px - 1280px
- **Extra Large**: > 1280px

## Accessibility Features

- **ARIA labels** - Proper labeling for screen readers
- **Keyboard navigation** - Full keyboard support
- **High contrast mode** - Support for high contrast preferences
- **Reduced motion** - Respects user's motion preferences
- **Semantic HTML** - Proper heading and structure

## Performance Optimizations

- **CSS Grid** - Efficient layout system
- **CSS custom properties** - Fast theme switching
- **Component memoization** - Prevents unnecessary re-renders
- **Efficient animations** - Hardware-accelerated transforms

## Browser Support

- **Modern browsers** - Chrome 88+, Firefox 85+, Safari 14+
- **CSS Grid** - Full support in all modern browsers
- **CSS custom properties** - Supported in all modern browsers
- **Fallbacks** - Graceful degradation for older browsers

## Future Enhancements

- **Theme system** - Multiple color schemes
- **Internationalization** - Multi-language support
- **Animation library** - Advanced animation options
- **State management** - Integration with Redux/Zustand
- **Testing** - Unit and integration tests

## Contributing

When modifying the Front component:

1. **Update configuration** - Add new options to `Front.config.js`
2. **Maintain responsiveness** - Test on all screen sizes
3. **Follow naming conventions** - Use consistent class naming
4. **Update documentation** - Keep this README current
5. **Test accessibility** - Ensure screen reader compatibility
