import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LoaderIcon } from 'react-hot-toast';
import Loading from '../../components/Loading';

type Option = {
  value: string;
  label: string;
};

type TableComponentProps<T> = {
  data: T[];
  fields: (keyof T | string)[]; // Including 'actions' as string in fields
  customTitles?: Partial<Record<keyof T, string>>; // Optional mapping of field names to custom titles
  moneyFields?: (keyof T | string)[]; // Fields that represent money

  actions?: boolean;
  Pagination?: React.ReactNode; // Add pagination as a ReactNode
  renderActions?: (item: T) => React.ReactNode; // Add renderActions prop
  filterData?: (query: string) => void;
  filterDataBy?: string;
  newEntryUrl?: string;
  setNewEntryModal?: (isOpen: boolean) => void;
  ExtraOptions?: React.FC; // Define the prop as a React component
  tableHeading?: string;
  isLoading?: Boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  dateRange?: Date | null;
  filterByDate?: (date: any) => void;
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
  Pagination, // Accept the pagination prop
  renderActions,
  filterData,
  filterDataBy,
  newEntryUrl,
  setNewEntryModal: setProductModal,
  ExtraOptions,
  tableHeading,
  endDate,
  startDate,
  filterByDate,
  isLoading,
}: TableComponentProps<T>) => {
  const [visibleFields, setVisibleFields] =
    useState<(keyof T | string)[]>(fields);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
  //   null,
  //   null,
  // ]);
  // const [startDate, endDate] = dateRange;

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
          {tableHeading ? <strong> {tableHeading} </strong> : ''}
          <div className="flex my-5 justify-between">
            <div className="flex items-center gap-10">
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
              {filterByDate ? (
                <DatePicker
                  className="border bg-white dark:bg-boxdark p-4 rounded-lg"
                  placeholderText="Filter by Date"
                  selectsRange={true}
                  startDate={startDate!}
                  endDate={endDate!}
                  onChange={(update) => {
                    // // setDateRange(update);
                    // setDateRange(update as [Date | null, Date | null]);
                    // const [newStartDate, newEndDate] = update as [
                    //   Date | null,
                    //   Date | null,
                    // ];
                    // console.log('Start Date:', newStartDate);
                    // console.log('End Date:', newEndDate);
                    filterByDate!(update);
                  }}
                />
              ) : (
                ''
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
            </div>
          </div>
          <div className="relative">
            {isLoading ? <Loading /> : ''}
            <table className={`w-full table-auto`}>
              {/* {isLoading ? <FontAwesomeIcon className='absolute top-0 bg-red-800 '  icon={faSpinner} spin={true} /> : ''} */}
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
              <tbody className={`${isLoading ? 'opacity-25' : ''}`}>
                {data.map((item, index) => (
                  <tr
                    className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    key={index}
                  >
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
          </div>
          {Pagination && Pagination}
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
