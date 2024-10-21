import { useState } from 'react';
import {useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';
import { TankDipping as TankDippingType } from '../../types/productType';

const TankDipping = () => {
  const Data = useAppSelector((state) => state.tank.TankDipping);
  const [query, setQuery] = useState(''); // State to manage the search query

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof TankDippingType)[] = [
    'date',
    'Tank',
    'opening',
    'closing',
    'expected_sales',
    'metre_sales',
    'variance',
  ];
  const customTitles = {
    expected_sales : 'Expected Sales',
    metre_sales : 'Meter Sales',
    'tank.name' : 'Tank',
  };

  const moneyFields: (keyof TankDippingType)[] = ['closing', 'expected_sales', 'metre_sales', ];
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
        return data.date.includes(query.toLocaleLowerCase());
      });
      // filtered = Data.filter((sale) => Data.date.includes(query));
    }

    // Step 2: Apply pagination to the filtered data
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentData = filtered.slice(indexOfFirstData, indexOfLastData);

    return currentData;
  }
  
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Tank Dipping " />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          filterData={filterData}
          newEntryUrl="tank-dipping-add"
          filterDataBy="Date"
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

export default TankDipping;
