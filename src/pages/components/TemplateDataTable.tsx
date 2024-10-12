import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faMoneyBill,
  faMoneyBillWaveAlt,
  faPlus,
  faReceipt,
  faRemove,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Modal from '../../components/Modal';
import TableComponent from '../components/TableComponent';
import { Creditor } from '../../types/finance';
import Pagination from '../components/PaginationComponent';

const Creditors = () => {
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state) => state.sales.creditors);
  const [OffLoadFuelModal, setOffLoadFuelModal] = useState(false);
  const [query, setQuery] = useState(''); // State to manage the search query

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof Creditor)[] = [
   
  ];
  const customTitles = {
    
  };

  const moneyFields: (keyof Creditor)[] = ['amount',];
  const filterData = (query: string) => {
    setQuery(query); // Update search query state
    setCurrentPage(1); // Reset to page 1 on new search
  };
  const getFilteredData = () => {
    // Step 1: Filter sales based on the query
    let filtered = Data;
    if (query) {
      filtered = Data.filter((data) => {
        return data
        // return data.company?.includes(query) || data.customer.includes(query);
      });
      // filtered = Data.filter((sale) => Data.date.includes(query));
    }

    // Step 2: Apply pagination to the filtered data
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentData = filtered.slice(indexOfFirstData, indexOfLastData);

    return currentData;
  };

  const newAction = (data : Creditor) => {

  }
  const deleteAction = (creditor : Creditor) => {

  }

  const renderActions = (item: Creditor) => (
    <div className="flex gap-4">
      <button
        onClick={() => newAction(item)}
        className=""
      >
        <FontAwesomeIcon icon={faMoneyBill} />
      </button>
      <button
        onClick={() => deleteAction(item)}
        className=""
      >
        <FontAwesomeIcon color='red' icon={faTrash} />
      </button>
    </div>
  );

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Creditors " />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          renderActions={renderActions}
          filterData={filterData}
          newEntryUrl="creditor/add"
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

export default Creditors;
