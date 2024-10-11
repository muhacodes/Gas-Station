import React from 'react';

type TableHeaderProps<T> = {
  fields: (keyof T | string)[];
  customTitles?: Partial<Record<keyof T, string>>; // Optional mapping of field names to custom titles
};

const TableHeader = <T extends object>({ fields, customTitles = {} }: TableHeaderProps<T>) => {
  return (
    <thead>
      <tr className="bg-slate-700 text-white text-left dark:bg-meta-4">
        {fields.map((field) => (
          <th
            key={String(field)}
            className="min-w-[50px] py-3 px-2 font-medium dark:text-white"
          >
            {customTitles[field] || String(field).charAt(0).toUpperCase() + String(field).slice(1)}{' '}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
