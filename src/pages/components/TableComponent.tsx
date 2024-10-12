import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
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
  filterData: (query: string) => void;
  filterDataBy?: string;
  newEntryUrl?: string;
  newEntryModal?: React.ReactNode;
  setProductModal?: (isOpen: boolean) => void;
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
  newEntryModal,
  setProductModal,
}: TableComponentProps<T>) => {
  return (
    <div className="w-full max-w-full py-2 ">
      {/* {error} */}
      <div className="rounded-sm mt-10 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto lg:overflow-">
          <div className="flex my-5 justify-between">
            <div className="w-90">
              {/* Whenever a user enters search here, filter the students based on firstname, lastname, dob */}
              <input
                type="text"
                placeholder={`${
                  filterDataBy ? filterDataBy : 'Filter By Date'
                }`}
                onChange={(e) => filterData(e.target.value)}
                className="w-full p-4 text-gray-700 bg-transparent border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            {!newEntryUrl ? (
              <button
                onClick={() => {
                  setProductModal!(true)
                }} // Call setProductModal to open the modal
                className="flex bg-slate-700 text-white p-2 items-center gap-2"
              >
                New Entry <FontAwesomeIcon icon={faPlus} />
              </button>
            ) : (
              <Link to={`/${newEntryUrl}`}>
                <button className="flex bg-slate-700 text-white p-2 items-center gap-2">
                  New Entry <FontAwesomeIcon icon={faPlus} />
                </button>
              </Link>
            )}
            {/* <Link to={`/${newEntryUrl}`}>
              <button className="flex bg-slate-700 text-white p-2 items-center gap-2">
                New Entry <FontAwesomeIcon icon={faPlus} />
              </button>
            </Link> */}
          </div>
          <table className="w-full table-auto">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-700 text-white text-left dark:bg-meta-4">
                {fields.map((field) => (
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
                )}{' '}
                {/* Render Actions column if provided */}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {fields.map((field) => {
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

                      // Otherwise, format as a general numeric value (e.g., liters)
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
