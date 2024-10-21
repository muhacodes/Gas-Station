import { useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../../components/Modal';
import PumpAddForm from './PumpAdd';
import { Pump as PumpType } from '../../types/productType';
import TableComponent from '../components/TableComponent';

const Pump = () => {
  const Data = useAppSelector((state) => state.product.pump);
  const [pumpModal, setpumpModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const tableRow: (keyof PumpType)[] = [
   'name',
  ];
  const customTitles = {
    
  };

  const moneyFields: (keyof PumpType)[] = [];
  
  const ModalComponent = () => (
    <Modal
      isOpen={pumpModal}
      onClose={() => setpumpModal(false)}
      title="Add Tank"
    >
      {/* existingProduct={productBeingUpdated!} isEdit={productBeingUpdated ? true : false} */}
      <PumpAddForm   onClose={() => setpumpModal(false)} />
    </Modal>
  );
  

  
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Pump " />
        <ModalComponent     />
        <TableComponent
          data={Data}
          fields={tableRow}
          customTitles={customTitles}
          moneyFields={moneyFields}
          setNewEntryModal={setpumpModal}
          // newEntryModal={<ModalComponent />}
          
        />
      </DefaultLayout>
        
    </>
  );
};

export default Pump;
