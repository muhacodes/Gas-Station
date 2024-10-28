import {useEffect, useState } from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Modal from '../../components/Modal';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';
import {payment_drop_type} from '../../types/sales';
import DropAddModalForm from './SalesPaymentDropAdd';
import { fetchDrop } from '../../store/Slice/Sales';

const SalesPaymentDrop = () => {
  const [dropModa, setDropModal] = useState(false);
  const Data = useAppSelector((state) => state.sales.drop);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(false);


  const [query, setQuery] = useState(''); // State to manage the search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const dispatch = useAppDispatch();

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof payment_drop_type | string)[] = [
    'date',
    'pump.name',
    'shift',
    'amount',
    // 'supervisor',
    // 'agent',
  ];
  const customTitles = {
    date: 'Date',
    'pump.name': 'Pump',
  };

  const moneyFields: (keyof payment_drop_type)[] = ['amount'];
  const filterData = (query: string) => {
    setQuery(query); // Update search query state
    setCurrentPage(1); // Reset to page 1 on new search
  };
  const getFilteredData = () => {
    // Step 1: Filter sales based on the query
    let filtered = Data;
    if (query) {
      filtered = Data.filter((data) => {
        return data.date.includes(query) || data.pump?.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      });
    }
    
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentData = filtered.slice(indexOfFirstData, indexOfLastData);

    return currentData;
  };

  const ModalComponent = () => (
    <Modal
      isOpen={dropModa}
      onClose={() => setDropModal(false)}
      title="Add Drop Entry"
    >
     <DropAddModalForm  onClose={() => setDropModal(false)}/>
    </Modal>
  );

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

      await dispatch(fetchDrop({startDate : StartDate, endDate : EndDate})).unwrap();
      setLoading(false)
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Drop Add" />
        <ModalComponent />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          setNewEntryModal={setDropModal}
          customTitles={customTitles}
          isLoading={loading}
          filterByDate={onDateChange}
          startDate={startDate}
          endDate={endDate}
          moneyFields={moneyFields}
          filterData={filterData}
          filterDataBy="date"
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

export default SalesPaymentDrop;
