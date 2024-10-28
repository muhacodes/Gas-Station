import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { cash_book_type } from '../../types/finance';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';
import React from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { fetchCashBook, FilterCashBookByDate } from '../../store/Slice/Client';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const CashBook = () => {
  const Data = useAppSelector((state) => state.client.cash_book);
  const dispatch = useAppDispatch();

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState(''); // State to manage the search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof cash_book_type)[] = [
    'date',
    'total_sales',
    'total_credit',
    'total_expense',
    'net_cash',
  ];
  const customTitles = {
    date: 'Date',
  };

  const moneyFields: (keyof cash_book_type)[] = [
    'net_cash',
    'total_credit',
    'total_sales',
    'total_expense',
  ];
  const filterData = (query: string) => {
    setQuery(query); // Update search query state
    setCurrentPage(1); // Reset to page 1 on new search
  };
  const getFilteredData = () => {
    // Step 1: Filter sales based on the query
    let filtered = Data;
    if (query) {
      filtered = Data.filter((data) => {
        return data.date.includes(query);
      });
      // filtered = Data.filter((sale) => Data.date.includes(query));
    }

    // Step 2: Apply pagination to the filtered data
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentData = filtered.slice(indexOfFirstData, indexOfLastData);

    return currentData;
  };

  const onDateChange = (update: [Date | null, Date | null]) => {
    // onChange={(update) => {
    //   setDateRange(update);
    // }}
    setDateRange(update);
    const [newStartDate, newEndDate] = update;
    console.log('Starting Date:', newStartDate);
    console.log('Ending Date:', newEndDate);

    if (newStartDate && newEndDate) {
      // Call fetch when both dates are selected
      FilterDataByDate(newStartDate, newEndDate);
    }
  };

  const FilterDataByDate = async (startDate: Date, endDate: Date) => {
    // Format dates as YYYY-MM-DD in local time
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const StartDate = formatDate(startDate);
    const EndDate = formatDate(endDate);

    try {
      console.log('start Date ', StartDate);
      console.log('End Date ', EndDate);
      setLoading(true)

      await dispatch(fetchCashBook({startDate : StartDate, endDate : EndDate})).unwrap();
      setLoading(false)
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Cash Book " />

        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          isLoading={loading}
          filterData={filterData}
          startDate={startDate}
          endDate={endDate}
          filterByDate={onDateChange}
          filterDataBy="Date"
          Pagination={
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          }
        />
        <div></div>
      </DefaultLayout>
    </>
  );
};

export default CashBook;
