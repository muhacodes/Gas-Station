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
import TableHeader from '../components/tableHeader';
import TableBody from '../components/tableBody';
import { CreditSale } from '../../types/finance';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';

const CreditSales = () => {
  const [TankModal, setTankModal] = useState(false);
  const Data = useAppSelector((state) => state.sales.creditSales);
  const [query, setQuery] = useState(''); // State to manage the search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);


  const allFields: (keyof CreditSale)[] = [
    'date',
    'product',
    'creditor',
    'litres',
    'unit_price',
    'discount',
    'Meter',
    'shift',
    'amount',
    'discount_amount',
    'supervisor',
  ];
  const tableRow: (keyof CreditSale | string)[] = [
    'date',
    'product.name',
    'creditor.customer',
    'litres',
    'unit_price',
    'discount',
    'Meter.name',
    'shift',
    'amount',
    'discount_amount',
    'supervisor',
  ];
  const customTitles = {
    unit_price: 'Price',
    discount_amount: 'Discounted',
    'creditor.customer' : 'Customer'
  };

  const moneyFields: (keyof CreditSale)[] = ['amount', 'discount', 'discount_amount'];
  const filterData = (query: string) => {
    setQuery(query); // Update search query state
    setCurrentPage(1); // Reset to page 1 on new search
  };
  const getFilteredData = () => {
    // Step 1: Filter sales based on the query
    let filtered = Data;
    if (query) {
      filtered = Data.filter((data) => {
        return data.creditor?.customer
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())
      });
      // filtered = Data.filter((sale) => Data.date.includes(query));
    }

    // Step 2: Apply pagination to the filtered data
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentData = filtered.slice(indexOfFirstData, indexOfLastData);

    return currentData;
  };
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Creditors " />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          filterData={filterData}
          newEntryUrl="credit/sales/add"
          filterDataBy='company'
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

export default CreditSales;
