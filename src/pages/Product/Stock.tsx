import { useState } from 'react';
import { useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Stock as StockType } from '../../types/productType';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';

const Stock = () => {
  const Data = useAppSelector((state) => state.product.stocks);
  const [query, setQuery] = useState(''); // State to manage the search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof StockType | string)[] = [
    'date',
    'product.name',
    'company',
    'litres',
    'price',
    'taxes',
    'Transport',
    'cost_price',
  ];
  // const customTitles = {
  //   'product.name': 'Product',
  // };
  const customTitles = {
    cost_price: 'Cost Price',
    price: 'Unit Price',
    // litres : 'Litres',
    'product.name': 'Product',
  };
  const moneyFields: (keyof StockType)[] = [
    'cost_price',
    'litres',
    'price',
    'Transport',
    'taxes',
  ]; // Money-related fields

  // Handle the delete action

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
          data.company
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

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Stock / Purchases " />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          filterData={filterData}
          filterDataBy='Date, Company'
          newEntryUrl="stock/add"
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

export default Stock;
