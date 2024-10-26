import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faEdit,
  faEye,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Modal from '../../components/Modal';
import ProductAddForm from './ProductAdd';
import { Product } from '../../types/productType';
import TableComponent from '../components/TableComponent';
import Pagination from '../components/PaginationComponent';

const ProductComponent = () => {
  const Data = useAppSelector((state) => state.product.products);
  const [productModal, setproductModal] = useState(false);
  const [productBeingUpdated, setProductBeingUpdated] =
    useState<Product | null>(null);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState(''); // State to manage the search query

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof Product)[] = ['name', 'unit_price'];
  const customTitles = {
    unit_price : 'Price'
  };

  const moneyFields: (keyof Product)[] = ['unit_price'];
  const filterData = (query: string) => {
    setQuery(query); // Update search query state
    setCurrentPage(1); // Reset to page 1 on new search
  };
  const getFilteredData = () => {
    // Step 1: Filter sales based on the query
    let filtered = Data;
    if (query) {
      filtered = Data.filter((data) => {
        return data;
        // return data.company?.includes(query) || data.customer.includes(query);
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
      isOpen={productModal}
      onClose={() => setproductModal(false)}
      title="Add Tank"
    >
      {/* existingProduct={productBeingUpdated!} isEdit={productBeingUpdated ? true : false} */}
      <ProductAddForm existingProduct={productBeingUpdated} isEdit={productBeingUpdated ? true : false}  onClose={() => setproductModal(false)} />
    </Modal>
  );
  const newAction = (data: Product) => {
    setProductBeingUpdated(data);
    setproductModal(true);
  };

  const renderActions = (item: Product) => (
    <div className="flex gap-4">
      <button onClick={() => newAction(item)} className="">
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </div>
  );

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Products " />
        <ModalComponent     />
        <TableComponent
          data={getFilteredData()}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          renderActions={renderActions}
          filterData={filterData}
          setNewEntryModal={setproductModal}
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

export default ProductComponent;
