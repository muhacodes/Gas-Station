import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { fetchFuelDelivery } from '../../store/Slice/Tank';
import { fuelDelivery } from '../../types/productType';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Modal from '../../components/Modal';
import FuelDeliveryAdd from './fuel-offload-add';
import { ProductActions } from '../../store/Slice/ProductSlice';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';

const FuelDelivery = () => {
  const [OffLoadModal, setOffLoadModal] = useState(false);
  const Data = useAppSelector((state) => state.tank.fuelDelivery);
  const [query, setQuery] = useState(''); // State to manage the search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof fuelDelivery | string)[] = [
    'date',
    'tank.name',
    'stock.company',
    'stock.cost_price',
    'litres_remaining',
  ];
  const customTitles = {
    date: 'Date',
    'tank.name': 'Tank',
    'stock.cost_price': 'Cost Price',
    litres_remaining: 'Left',
  };

  const moneyFields: (keyof fuelDelivery | string)[] = [
    'litres_remaining',
    'stock.cost_price',
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
        return (
          data.stock?.company
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) || data.date.includes(query)
        );
      });
    }

    // Step 2: Apply pagination to the filtered data
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentData = filtered.slice(indexOfFirstData, indexOfLastData);

    return currentData;
  };
  const ModalComponent = () => (
    <Modal
      isOpen={OffLoadModal}
      onClose={() => setOffLoadModal(false)}
      title="Fuel Delivery"
    >
      <FuelDeliveryAdd onClose={() => setOffLoadModal(false)} />
    </Modal>
  );


  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Fuel Delivery " />
        <ModalComponent />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          setNewEntryModal={setOffLoadModal}
          filterData={filterData}
          filterDataBy="Date, Company"
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

export default FuelDelivery;
// Date
// Product
// 'landing price'
// 'tank'
// left
