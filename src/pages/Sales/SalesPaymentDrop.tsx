import {useState } from 'react';
import {useAppSelector} from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Modal from '../../components/Modal';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';
import {payment_drop_type} from '../../types/sales';
import DropAddModalForm from './SalesPaymentDropAdd';

const SalesPaymentDrop = () => {
  const [dropModa, setDropModal] = useState(false);
  const Data = useAppSelector((state) => state.sales.drop);
  const [query, setQuery] = useState(''); // State to manage the search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
