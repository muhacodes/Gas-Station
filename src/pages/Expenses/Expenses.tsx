import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { addProduct, fetchStock } from '../../store/Slice/ProductSlice';
import { Stock as Stocktype, Tank as TankType } from '../../types/productType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import TableHeader from '../components/tableHeader';
import TableBody from '../components/tableBody';
import { CreditSale, ExpenseType } from '../../types/finance';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';

const Expenses = () => {
  const [ExpenseModal, setExpenseModal] = useState(false);
  const Data = useAppSelector((state) => state.expenses.expense);
  const [query, setQuery] = useState(''); // State to manage the search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof ExpenseType | string)[] = [
    'date',
    'shift',
    'name',
    'description',
    'pump.name',
    'amount',
    'agent.name',
  ];
  const customTitles = {
    date: 'Date',
    'pump.name' : 'Pump',
    'agent.name' : 'Supervisor'
  };

  const moneyFields: (keyof ExpenseType)[] = ['amount'];
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
          data.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
      });
      // filtered = Data.filter((sale) => Data.date.includes(query));
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
        <Breadcrumb pageName="Expenses " />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          filterData={filterData}
          newEntryUrl="expenses/add"
          filterDataBy="date, name"
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

export default Expenses;
