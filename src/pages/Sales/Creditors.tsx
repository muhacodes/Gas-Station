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
import { ProductActions } from '../../store/Slice/ProductSlice';
import { DeleteCreditors, fetchCreditSales } from '../../store/Slice/Sales';

const Creditors = () => {
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state) => state.sales.creditors);
  const [query, setQuery] = useState(''); // State to manage the search query
  const [selectedCreditor, setSelectedCreditor] = useState<Creditor | null>(
    null,
  );

  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof Creditor)[] = [
    'customer',
    'company',
    'address',
    'contact',
    'amount',
  ];
  const customTitles = {};

  const moneyFields: (keyof Creditor)[] = ['amount'];
  const filterData = (query: string) => {
    setQuery(query); // Update search query state
    setCurrentPage(1); // Reset to page 1 on new search
  };

  interface ModalComponentProps {
    onDelete: () => void;
    onCancel: () => void;
  }
  const ModalComponent: React.FC<ModalComponentProps> = ({
    onDelete,
    onCancel,
  }) => (
    <Modal
      isOpen={deleteModal}
      onClose={() => setDeleteModal(false)}
      title="Are you sure you want to Delete"
    >
      <div>
        <p className="px-10">
          {' '}
          Note: Deleting this Creditor will also delete all of their credit
          sales{' '}
        </p>
      </div>
      <div className={`p-5 flex gap-4`}>
        <button
          onClick={onDelete}
          className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );

  const getFilteredData = () => {
    // Step 1: Filter sales based on the query
    let filtered = Data;
    if (query) {
      filtered = Data.filter((data) => {
        // return data.company?.toLocaleLowerCase?.includes(query) || data.customer.includes(query);
        return (
          data.company
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          data.customer.toLocaleLowerCase().includes(query.toLocaleLowerCase())
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

  const newCreditPayment = (data: Creditor) => {};
  const deleteCreditor = (creditor: Creditor) => {
    setSelectedCreditor(creditor);
    setDeleteModal(true);
  };

  const handleDeleteCreditor = async () => {
    if (selectedCreditor) {
      try {
        
        await dispatch(DeleteCreditors(selectedCreditor)).unwrap(),
        await dispatch(fetchCreditSales({})).unwrap();
      } catch (Error: any) {
        console.log('Error returned is ', Error);
      }
    }
    setDeleteModal(false);
  };

  const renderActions = (item: Creditor) => (
    <div className="flex gap-4">
      <button onClick={() => newCreditPayment(item)} className="">
        <FontAwesomeIcon icon={faMoneyBill} />
      </button>
      <button onClick={() => deleteCreditor(item)} className="">
        <FontAwesomeIcon color="red" icon={faTrash} />
      </button>
    </div>
  );

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Creditors " />
        <ModalComponent
          onCancel={() => setDeleteModal(false)}
          onDelete={handleDeleteCreditor}
        />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          renderActions={renderActions}
          filterData={filterData}
          newEntryUrl="creditor/add"
          filterDataBy="company, customer"
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
