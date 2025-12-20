import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select...", 
  className = "",
  icon = null,
  disabled = false,
  zIndex = 1000
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef} style={{ zIndex: zIndex }}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          h-full px-2.5 inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-sm
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex-1 text-left">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FaChevronDown 
          size={12} 
          className={`opacity-80 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-1 left-0 right-0 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg max-h-60 overflow-y-auto" style={{ zIndex: zIndex + 1 }}>
          {options.map((option, index) => (
            <button
              key={option.value || index}
              onClick={() => handleSelect(option)}
              className={`
                w-full px-3 py-2 text-left text-sm hover:bg-white/5 transition-colors
                ${value === option.value ? 'bg-white/10 text-white' : 'text-neutral-300'}
                ${index === 0 ? 'rounded-t-md' : ''}
                ${index === options.length - 1 ? 'rounded-b-md' : ''}
              `}
              role="option"
              aria-selected={value === option.value}
            >
              <div className="flex items-center gap-2">
                {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
