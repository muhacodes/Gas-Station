import React from 'react';

type TableRowProps<T> = {
  data: T[];
  fields: (keyof T | string)[]; // Including 'actions' as string in fields
  moneyFields?: (keyof T | string)[]; // Fields that represent money
  onEdit?: (item: T) => void; // Optional edit callback
  onDelete?: (item: T) => void; // Optional delete callback
};

// Helper function to access nested properties safely
const getValue = <T extends object>(item: T, field: string) => {
  return field.split('.').reduce((acc, part) => acc && acc[part], item as any);
};

// Helper function to check if a string contains a valid number
const isNumericString = (value: string) => {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
};

const TableRow = <T extends object>({
  data,
  fields,
  moneyFields = [],
  onEdit,
  onDelete,
}: TableRowProps<T>) => {
  return (
    <>
      {data.map((item, index) => (
        <tr key={index}>
          {fields.map((field) => {
            if (field === 'actions') {
              return (
                <td
                  key="actions"
                  className="border-b border-[#eee] py-2 px-2 dark:border-strokedark"
                >
                  <button
                    onClick={() => onEdit?.(item)} // Use the onEdit callback if provided
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(item)} // Use the onDelete callback if provided
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              );
            }
            const value = getValue(item, String(field));

            if (typeof value === 'string' && isNumericString(value)) {
              const parsedValue = parseFloat(value);

              // Check if the field is in moneyFields to format as currency
              if (moneyFields.includes(field)) {
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
                  {parsedValue.toLocaleString()}{' '}
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
        </tr>
      ))}
    </>
  );
};

export default TableRow;
