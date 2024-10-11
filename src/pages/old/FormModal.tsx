// import React, { useState } from 'react';
// import AutocompleteInput from './AutoCompleteInputModal';

import { useState } from 'react';
import AutocompleteInput from './AutoCompleteInputModal';
import { CreditSale } from '../../types/finance';

// interface FormProps {
//   fields: FormField[];
//   onSubmit: (data: any) => void;
//   loading?: boolean;
// }

// const FormModalComponent: React.FC<FormProps> = ({ fields, onSubmit, loading }) => {
//   const [formData, setFormData] = useState<any>({});

//   const handleChange = (name: string, value: any) => {
//     setFormData((prevData: any) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} action="#">
//       <div
//         className={`p-5 flex flex-col gap-4 ${
//           loading ? 'opacity-50 pointer-events-none ' : ''
//         }`}
//       >
//         {fields.map((field) => {
//           switch (field.type) {
//             case 'text':
//             case 'date':
//             case 'number':
//               return (
//                 <div className="mb-4.5" key={field.name}>
//                   <label className="mb-2.5 block text-black dark:text-white">
//                     {field.label}
//                   </label>
//                   <input
//                     required={field.required}
//                     type={field.type}
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={(e) => handleChange(field.name, e.target.value)}
//                     placeholder={field.label}
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   />
//                 </div>
//               );
//             case 'select':
//               return (
//                 <div className="mb-4.5" key={field.name}>
//                   <label className="mb-2.5 block text-black dark:text-white">
//                     {field.label}
//                   </label>
//                   <select
//                     required={field.required}
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={(e) => handleChange(field.name, e.target.value)}
//                     className='pl-10 w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
//                   >
//                     <option value="">Select --</option>
//                     {field.options &&
//                       field.options.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                   </select>
//                 </div>
//               );
//             case 'autocomplete':
//               return (
//                 <div className="mb-4.5" key={field.name}>
//                   <label className="mb-2.5 block text-black dark:text-white">
//                     {field.label}
//                   </label>
//                   <AutocompleteInput
//                     options={field.autocompleteOptions || []}
//                     value="1"
//                     onChange={(value) => handleChange(field.name, value)}
//                   />
//                 </div>
//               );
//             default:
//               return null;
//           }
//         })}

//         <button
//           type="submit"
//           className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
//         >
//           {loading ? 'Submitting...' : 'Submit'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FormModalComponent;
// ... (other imports)

interface FormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const FormModalComponent: React.FC<FormProps> = ({
  fields,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState<any>({
    station : '1',
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} action="#">
      <div
        className={`p-5 flex flex-col gap-4 ${
          loading ? 'opacity-50 pointer-events-none ' : ''
        }`}
      >
        {fields.map((field) => {
          switch (field.type) {
            // ... (other cases)
            case 'autocomplete':
              return (
                <div className="mb-4.5" key={field.name}>
                  <label className="mb-2.5 block text-black dark:text-white">
                    {field.label}
                  </label>
                  <AutocompleteInput
                    options={field.autocompleteOptions || []}
                    value={formData[field.name] || ''}
                    onChange={(value) => handleChange(field.name, value)}
                  />
                </div>
              );
            case 'select':
              return (
                <div className="mb-4.5" key={field.name}>
                  <label className="mb-2.5 block text-black dark:text-white">
                    {field.label}
                  </label>
                  <select
                    required={field.required}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="pl-10 w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select --</option>
                    {field.options &&
                      field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                </div>
              );
            case 'text':
            case 'date':
            case 'number':
              return (
                <div className="mb-4.5" key={field.name}>
                  <label className="mb-2.5 block text-black dark:text-white">
                    {field.label}
                  </label>
                  <input
                    required={field.required}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.label}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              );
            default:
              return null;
          }
        })}

        <button
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default FormModalComponent;
