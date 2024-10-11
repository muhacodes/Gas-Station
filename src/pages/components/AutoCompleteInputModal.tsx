import React, { useState, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface AutocompleteInputProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  options,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Option[]>([]);

  useEffect(() => {
    // Update inputValue when the value prop changes
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setInputValue(selectedOption.label);
    } else {
      setInputValue('');
    }
  }, [value, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);

    // Update suggestions based on input
    if (newInputValue === '') {
      setSuggestions([]);
      onChange(''); // Clear the selected value
    } else {
      setSuggestions(
        options.filter((option) =>
          option.label.toLowerCase().includes(newInputValue.toLowerCase())
        )
      );
    }
  };

  const handleSuggestionClick = (suggestion: Option) => {
    setInputValue(suggestion.label);
    setSuggestions([]);
    onChange(suggestion.value); // Pass the value (stock ID) to the parent
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow click event to fire
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

  return (
    <div className="relative">
      <input
        type="text"
        required
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full h-[75px] overflow-y-scroll bg-white border border-gray-300">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.value}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="p-2 dark:bg-slate-700 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
