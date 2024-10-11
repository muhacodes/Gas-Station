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

const Tank = () => {
  const [TankModal, setTankModal] = useState(false);
  const ProductTank = useAppSelector((state) => state.tank);

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
    product: 'Products', // Custom title for the product field
  };
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Tank " />

        {/* <!-- ====== Calendar Section Start ====== --> */}
        <div className="w-full max-w-full py-2 ">
          {/* {error} */}
          <div className="rounded-sm mt-10 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto lg:overflow-">
              <div className="flex my-5 justify-between">
                <div className="w-90">
                  {/* Whenever a user enters search here, filter the students based on firstname, lastname, dob */}
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-4 text-gray-700 bg-transparent border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
                  />
                </div>

                <button
                  onClick={() => setTankModal(true)}
                  className="flex bg-slate-700 text-white p-2 items-center gap-2"
                >
                  New Entry <FontAwesomeIcon icon={faPlus} />
                </button>

                <Modal
                  isOpen={TankModal}
                  onClose={() => setTankModal(false)}
                  title="Add Tank"
                >
                  <TankAddForm onClose={() => setTankModal(false)} />
                  {/* <DepartmentForm onSubmit={handleAddDepartment} /> */}
                </Modal>
              </div>
              <table className="w-full table-auto">
                <TableHeader<TankType> customTitles={customTitles} fields={allFields} />
                <tbody>
                  <TableBody data={ProductTank.Tank} fields={tableRow} />
                  {/* {ProductTank.Tank.map((tank) => (
                    <tr key={tank.id}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {tank.name}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {tank.product?.name}
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {tank.capacity}
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {tank.litres}
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Tank;
