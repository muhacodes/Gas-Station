import React, { useState, useEffect } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type: 'text' | 'select' | 'autocomplete' | 'date';
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: Array<{ id: string | number; name: string }>; // For select/autocomplete
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, type, value, onChange, options = [], error }) => {
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState(options);

  const handleAutocomplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredOptions = options.filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setAutocompleteSuggestions(filteredOptions);
    onChange(e); // Pass the change back to parent
  };

  return (
    <div className="w-full sm:w-1/2 mb-4">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">{label}</label>
      <div className="relative">
        {type === 'text' && (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full pl-4 py-3 rounded border border-stroke bg-gray text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
          />
        )}
        {type === 'date' && (
          <input
            type="date"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full pl-4 py-3 rounded border border-stroke bg-gray text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
          />
        )}
        {type === 'select' && (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full pl-4 py-3 rounded border border-stroke bg-gray text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
          >
            <option value="">Select --</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        )}
        {type === 'autocomplete' && (
          <>
            <input
              type="text"
              name={name}
              value={value}
              onChange={handleAutocomplete}
              className="w-full pl-4 py-3 rounded border border-stroke bg-gray text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
            />
            {autocompleteSuggestions.length > 0 && (
              <ul className="absolute left-0 top-12 w-full bg-white dark:bg-meta-4 border border-stroke dark:border-strokedark rounded z-10">
                {autocompleteSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() =>
                      onChange({
                        target: { name, value: suggestion.id },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        {error && <span className="text-sm text-red-500 font-bold ">{error}</span>}
      </div>
    </div>
  );
};

export default FormInput;

// import React, { useState } from 'react';

// interface FormInputProps {
//   label: string;
//   name: string;
//   type: 'text' | 'select' | 'date' | 'number';
//   value: any;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//   options?: Array<{ id: string | number; name: string }>;
//   error?: string;
// }

// const FormInputModal: React.FC<FormInputProps> = ({ label, name, type, value, onChange, options = [], error }) => {
//   return (
//     <div className="w-full sm:w-1/2 mb-4">
//       <label className="mb-3 block text-sm font-medium text-black dark:text-white">{label}</label>
//       {type === 'text' && (
//         <input
//           className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//           type="text"
//           name={name}
//           value={value}
//           onChange={onChange}
//         />
//       )}
//       {type === 'number' && (
//         <input
//           className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//           type="number"
//           name={name}
//           value={value}
//           onChange={onChange}
//         />
//       )}
//       {type === 'select' && (
//         <select
//           className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//           name={name}
//           value={value}
//           onChange={onChange}
//         >
//           <option value="">Select --</option>
//           {options.map((option) => (
//             <option key={option.id} value={option.id}>
//               {option.name}
//             </option>
//           ))}
//         </select>
//       )}
//       {error && <span className="text-sm text-red-500 font-bold">{error}</span>}
//     </div>
//   );
// };

// export default FormInputModal;
