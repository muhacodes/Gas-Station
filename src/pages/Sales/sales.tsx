import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { sales } from '../../types/sales';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';

const Sales = () => {
  const Data = useAppSelector((state) => state.sales.sales);
  const [query, setQuery] = useState(''); // State to manage the search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof sales | string)[] = [
    'date',
    'product.name',
    'shift',
    'Meter.name',
    'opening',
    'closing',
    'litres',
    // 'rtt_litres',
    'rtt_amount',
    'unit_price',
    'amount',
    'cash',
    'difference',
    // 'credit',
    'creditamount',
    'agent',
  ];
  const customTitles = {
    rtt_litres: 'Rtt Litres',
    rtt_amount: 'Rtt Amount',
    creditamount: 'Credit Amount',
    unit_price: 'Price',
    difference: 'Short',
    'product.name': 'Product',
    'Meter.name' : 'Meter'
  };
  const moneyFields: (keyof sales)[] = [
    'amount',
    'creditamount',
    'unit_price',
    'difference',
    'cash',
  ]; // Money-related fields

  const handleEdit = (record: sales) => {
    console.log('Edit record', record);
    alert(record.Meter?.station);
    // Logic for editing the record
  };

  // Handle the delete action
  const handleDelete = (record: sales) => {
    console.log('Delete record', record);
    // Logic for deleting the record
  };

  const filterData = (query: string) => {
    setQuery(query); // Update search query state
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const getFilteredData = () => {
    // Step 1: Filter sales based on the query
    let filtered = Data;
    if (query) {
      filtered = Data.filter((data) => {
        return (
          data.date.includes(query) ||
          data.Meter?.pump?.name
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          data.Meter?.name
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())
        );
      });
    }

    // Step 2: Apply pagination to the filtered data
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentData = filtered.slice(indexOfFirstData, indexOfLastData);

    return currentData;
  };

  const renderActions = (item: any) => (
    <div className="flex gap-4">
      <button
        onClick={() => handleEdit(item)}
        className="text-blue-500 hover:text-blue-700 p-2 bg-blue-100 rounded"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(item.id)}
        className="text-red-500 hover:text-red-700 p-2 bg-red-100 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Sales " />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          onEdit={handleEdit}
          onDelete={handleDelete}
          filterDataBy="Date, Pump, Meter"
          // renderActions={renderActions}
          filterData={filterData}
          newEntryUrl="sales/add"
          Pagination={
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          }
        />
      </DefaultLayout>
    </>
  );
};

export default Sales;
