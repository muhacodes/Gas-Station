import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Option = {
  value: string;
  label: string;
};

type TableComponentProps<T> = {
  data: T[];
  fields: (keyof T | string)[]; // Including 'actions' as string in fields
  customTitles?: Partial<Record<keyof T, string>>; // Optional mapping of field names to custom titles
  moneyFields?: (keyof T | string)[]; // Fields that represent money
  onEdit?: (item: T) => void; // Optional edit callback
  onDelete?: (item: T) => void; // Optional delete callback
  actions?: boolean;
  Pagination?: React.ReactNode; // Add pagination as a ReactNode
  renderActions?: (item: T) => React.ReactNode; // Add renderActions prop
  filterData?: (query: string) => void;
  filterDataBy?: string;
  newEntryUrl?: string;
  setNewEntryModal?: (isOpen: boolean) => void;
  ExtraOptions?: React.FC; // Define the prop as a React component
};

// Helper function to access nested properties safely
const getValue = <T extends object>(item: T, field: string) => {
  return field.split('.').reduce((acc, part) => acc && acc[part], item as any);
};

// Helper function to check if a string contains a valid number
const isNumericString = (value: string) => {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
};

const TableComponent = <T extends object>({
  data,
  fields,
  customTitles = {},
  moneyFields = [],
  onEdit,
  onDelete,
  Pagination, // Accept the pagination prop
  renderActions,
  filterData,
  filterDataBy,
  newEntryUrl,
  setNewEntryModal: setProductModal,
  ExtraOptions,
}: TableComponentProps<T>) => {
  const [visibleFields, setVisibleFields] =
    useState<(keyof T | string)[]>(fields);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };

  const handleFieldVisibilityChange = (field: keyof T | string) => {
    setVisibleFields(
      (prev) =>
        prev.includes(field)
          ? prev.filter((f) => f !== field) // Remove field if it's visible
          : [...prev, field], // Add field if it's hidden
    );
  };
  return (
    <div className="w-full max-w-full py-2 ">
      {/* {error} */}
      <div className="rounded-sm mt-10 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto lg:overflow-">
          <div className="flex my-5 justify-between">
            <div className="w-90">
              {/* Whenever a user enters search here, filter the students based on firstname, lastname, dob */}
              {filterDataBy && (
                <input
                  type="text"
                  placeholder={`${
                    filterDataBy ? filterDataBy : 'Filter By Date'
                  }`}
                  onChange={(e) => filterData!(e.target.value)}
                  className="w-full p-4 text-gray-700 bg-transparent border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
                />
              )}
            </div>
            <div className="flex items-center gap-4">
              {!newEntryUrl ? (
                <button
                  onClick={() => {
                    setProductModal!(true);
                  }} // Call setProductModal to open the modal
                  className="flex bg-slate-800 text-white p-2 items-center gap-2"
                >
                  New Entry <FontAwesomeIcon icon={faPlus} />
                </button>
              ) : (
                <Link to={`/${newEntryUrl}`}>
                  <button className="flex bg-slate-800 text-white p-2 items-center gap-2">
                    New Entry <FontAwesomeIcon icon={faPlus} />
                  </button>
                </Link>
              )}
              {ExtraOptions ? <ExtraOptions /> : <p></p>}
              {/* <select className=''>
                <div className='w-1/2 h-20 bg-red-400'></div>
              </select> */}
              {/* Button to toggle column hide/show options */}
            

              {/* Dropdown to toggle column visibility */}
              {/* <div className="relative">
                <button className="bg-gray-200 text-black p-2 rounded-lg">
                  Hide Columns
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
                  {fields.map((field) => (
                    <label key={String(field)} className="block mb-2">
                      <input
                        type="checkbox"
                        checked={visibleFields.includes(field)}
                        onChange={() => handleFieldVisibilityChange(field)}
                        className="mr-2"
                      />
                      {customTitles[field as keyof T] ||
                        String(field).charAt(0).toUpperCase() +
                          String(field).slice(1)}
                    </label>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
          <table className="w-full table-auto">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-700 text-white text-left dark:bg-meta-4">
                {visibleFields.map((field) => (
                  <th
                    key={String(field)}
                    className="min-w-[50px] py-3 px-2 font-medium dark:text-white"
                  >
                    {customTitles[field as keyof T] ||
                      String(field).charAt(0).toUpperCase() +
                        String(field).slice(1)}{' '}
                  </th>
                ))}
                {renderActions && (
                  <th className="min-w-[50px] py-3 px-2 font-medium dark:text-white">
                    Actions
                  </th>
                )}
                {/* Render Actions column if provided */}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {visibleFields.map((field) => {
                    const value = getValue(item, String(field));
                    if (typeof value === 'string' && isNumericString(value)) {
                      // Check if the field is in moneyFields to format as currency
                      if (moneyFields.includes(field)) {
                        const parsedValue = parseFloat(value);
                        return (
                          <td
                            key={String(field)}
                            className="border-b border-[#eee] py-2 px-2 dark:border-strokedark"
                          >
                            {parsedValue.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{' '}
                            {/* Format as currency with 2 decimal places */}
                          </td>
                        );
                      }
                      return (
                        <td
                          key={String(field)}
                          className="border-b border-[#eee] py-2 px-2 dark:border-strokedark"
                        >
                          {/* {parsedValue.toLocaleString()}{' '} */}
                          {value}
                          {/* Format as general numeric value */}
                        </td>
                      );
                    }

                    return (
                      <td
                        key={String(field)}
                        className="border-b border-[#eee] py-2 px-2 dark:border-strokedark"
                      >
                        {typeof value === 'object' && value !== null
                          ? JSON.stringify(value) // Handle objects
                          : String(value)}{' '}
                        {/* Handle other types */}
                      </td>
                    );
                  })}
                  {renderActions && (
                    <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                      {renderActions(item)} {/* Render action buttons */}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {Pagination && Pagination}
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
