import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faMoneyBill,
  faMoneyBillWaveAlt,
  faPerson,
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
import { staff_type } from '../../types/client';
import InviteUserForm from './InviteUser';

const Staff = () => {
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state) => state.client.staff);
  const [inviteUserModal, setInviteUserModal] = useState(false);
  const [query, setQuery] = useState(''); // State to manage the search query
  const [selectedStaff, setSelectedStaff] = useState<staff_type | null>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof staff_type)[] = ['name', 'designation', 'address'];
  const customTitles = {};

  const filterData = (query: string) => {
    setQuery(query); // Update search query state
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const getFilteredData = () => {
    // Step 1: Filter sales based on the query
    let filtered = Data;
    if (query) {
      filtered = Data.filter((data) => {
        // return data.company?.toLocaleLowerCase?.includes(query) || data.customer.includes(query);
        return (
          data.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          (data.designation &&
            data.designation
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()))
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

  const ModalComponent = () => (
    <Modal
      isOpen={inviteUserModal}
      onClose={() => setInviteUserModal(false)}
      title="Invite User"
    >
     <InviteUserForm  onClose={() => setInviteUserModal(false)}/>
    </Modal>
  );


  const InviteUser: React.FC = () => {
    return (
      <button
        className="flex bg-slate-800 text-white p-2 items-center gap-2"
        onClick={() => setInviteUserModal(true)}
      >
        <FontAwesomeIcon icon={faPerson} /> Invite User
      </button>
    );
  };

  return (
    <>
      <ModalComponent />
      <DefaultLayout>
        <Breadcrumb pageName="Staff " />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          filterData={filterData}
          newEntryUrl="staff/add"
          filterDataBy="name, designation"
          ExtraOptions={InviteUser}
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

export default Staff;
