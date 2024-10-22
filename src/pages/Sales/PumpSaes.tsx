import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { pump_sales_type } from '../../types/sales';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';

const PumpSalesSummary = () => {
  const Data = useAppSelector((state) => state.sales.pump_sales);
  const [query, setQuery] = useState(''); // State to manage the search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof pump_sales_type)[] = [
    'date',
    'pump',
    'shift',
    'total_sales',
    'total_credit',
    'total_drop',
    'total_sales_payment',
    'total_expenses',
    'short',
  ];
  const customTitles = {
    shift: 'Shift',
    total_sales: 'Total Sales',
    total_sales_payment: 'Other Payments',
    total_drop: 'Drop',
    total_expenses: 'expenses',
    'total_credit'  : 'Total Credit'
  };
  const moneyFields: (keyof pump_sales_type)[] = [
    'total_drop',
    'total_sales',
    'total_sales_payment',
    'total_credit',
    'total_expenses',
    'short',
  ]; // Money-related fields

  const filterData = (query: string) => {
    setQuery(query.toLocaleLowerCase()); // Update search query state
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const getFilteredData = () => {
    // Step 1: Filter sales based on the query
    let filtered = Data;

    if (query) {
      filtered = Data.filter((data) => {
        return (
          data.date.includes(query) ||
          data.shift.toLocaleLowerCase().includes(query) ||
          data.pump.toLocaleLowerCase().includes(query)
        );
      });
    }

    // Step 2: Apply pagination to the filtered data
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentData = filtered.slice(indexOfFirstData, indexOfLastData);

    return currentData;
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Pump Summary" />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          filterDataBy="Date, Shift, Pump"
          filterData={filterData}
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

export default PumpSalesSummary;
