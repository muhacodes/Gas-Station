import {  useState } from 'react';

import {  useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';
import { Discount as DiscountType } from '../../types/finance';

const Discount = () => {
  const Data = useAppSelector((state) => state.sales.discount);
  const [query, setQuery] = useState(''); // State to manage the search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof DiscountType | string)[] = [
    'date',
    'product.name',
    'customer',
    'litres',
    'unit_price',
    'amount',
    'total_amount',
  ];
  const customTitles = {
    total_amount : 'total amount',
    unit_price : 'Unit Price',
    'product.name' : 'Product'

  };

  const moneyFields: (keyof DiscountType)[] = ['amount', 'total_amount', 'unit_price'];
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
          data.customer.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || data.date.includes(query)
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

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Discount " />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          filterData={filterData}
          newEntryUrl="discount/add"
          filterDataBy="Date, customer"
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

export default Discount;
