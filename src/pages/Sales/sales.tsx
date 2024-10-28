import { useState } from 'react';


import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { sales } from '../../types/sales';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';
import { fetchSales } from '../../store/Slice/Sales';

const Sales = () => {
  const Data = useAppSelector((state) => state.sales.sales);
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

  const tableRow: (keyof sales | string)[] = [
    'date',
    'product.name',
    'shift',
    'Meter.name',
    'opening',
    'closing',
    'litres',
    'unit_price',
    'amount',
    'agent',
  ];
  const customTitles = {
    unit_price: 'Price',
    'product.name': 'Product',
    'Meter.name': 'Meter',
  };
  const moneyFields: (keyof sales)[] = ['amount', 'unit_price']; // Money-related fields

  const handleEdit = (record: sales) => {
    console.log('Edit record', record);
    alert(record.Meter?.station);
    // Logic for editing the record
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
      setLoading(true)

      await dispatch(fetchSales({startDate : StartDate, endDate : EndDate})).unwrap();
      setLoading(false)
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Sales " />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          
          filterByDate={onDateChange}
          isLoading={loading}
          startDate={startDate}
          endDate={endDate}
          filterDataBy="Date, Pump, Meter"
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
