import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { addProduct, fetchStock } from '../../store/Slice/ProductSlice';
import {
  Meter as MeterType,
  Stock as Stocktype,
  Tank as TankType,
} from '../../types/productType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import TankAddForm from './TankAdd';
import MeterAdd from './MeterAdd';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';

const Meter = () => {
  const [meterModal, setmeterModal] = useState(false);
  const Data = useAppSelector((state) => state.tank.Meter);

  const dispatch = useAppDispatch();

  const [query, setQuery] = useState(''); // State to manage the search query

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof MeterType | string)[] = [
    'name',
    'product.name',
    'tank.name',
  ];
  const customTitles = {
    name : 'Name',
    'tank.name' : 'Tank',
    'product.name' : 'Product',
  };

  const ModalComponent = () => (
    <Modal
      isOpen={meterModal}
      onClose={() => setmeterModal(false)}
      title="Add Meter"
    >
      <MeterAdd onClose={() => setmeterModal(false)} />
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
          setNewEntryModal={setmeterModal}
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

export default Meter;
