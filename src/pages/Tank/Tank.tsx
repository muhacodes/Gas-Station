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
import TankAddForm from './TankAdd';
import TableHeader from '../components/tableHeader';
import TableBody from '../components/tableBody';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';

const Tank = () => {
  const [TankModal, setTankModal] = useState(false);
  const Data = useAppSelector((state) => state.tank.Tank);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);


  const allFields: (keyof TankType)[] = [
    'name',
    'product',
    'capacity',
    'litres',
  ];
  const tableRow: (keyof TankType | string)[] = [
    'name',
    'product.name',
    'capacity',
    'litres',
  ];
  const customTitles = {
    name: 'Name', // Custom title for the product field
    'product.name' : 'Product'
  };
  const moneyFields: (keyof TankType)[] = ['capacity', 'litres'];

  const ModalComponent = () => (
    <Modal
      isOpen={TankModal}
      onClose={() => setTankModal(false)}
      title="Add Meter"
    >
      <TankAddForm onClose={() => setTankModal(false)} />
    </Modal>
  );
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Meter " />
        <ModalComponent />
        <TableComponent
          data={Data}
          fields={tableRow}
          customTitles={customTitles}
          setNewEntryModal={setTankModal}
          moneyFields={moneyFields}
          // newEntryModal={<ModalComponent />}
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

export default Tank;
