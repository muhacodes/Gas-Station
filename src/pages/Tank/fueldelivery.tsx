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

const FuelDelivery = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.tank.fuelDelivery);
  const [OffLoadFuelModal, setOffLoadFuelModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastStock = currentPage * itemsPerPage;
  const indexOfFirstStock = indexOfLastStock - itemsPerPage;
  const currentData = data.slice(indexOfFirstStock, indexOfLastStock);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const LoadData = async () => {
    try {
      const result = await dispatch(fetchFuelDelivery()).unwrap(); // Unwrap to catch the error

      console.log('FuelDelivery Data Loaded Succesfully:', result);
    } catch (error: any) {
      console.log('Failed Loading stock', error);
    }
  };
  useEffect(() => {
    if (!data || data.length === 0) {
      LoadData();
    }
    console.log('data from fuel', data);
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Stock " />
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
                  onClick={() => setOffLoadFuelModal(true)}
                  className="flex bg-slate-700 text-white p-2 items-center gap-2"
                >
                  New Entry <FontAwesomeIcon icon={faPlus} />
                </button>

                <Modal
                  isOpen={OffLoadFuelModal}
                  onClose={() => setOffLoadFuelModal(false)}
                  title="OffLoad Fuel"
                >
                  <FuelDeliveryAdd onClose={() => setOffLoadFuelModal(false)} />
                  {/* <DepartmentForm onSubmit={handleAddDepartment} /> */}
                </Modal>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-slate-700 text-white text-left dark:bg-meta-4">
                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      Date
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      Product
                    </th>

                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      landing Price
                    </th>

                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      Tank
                    </th>

                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      Left
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData!.map((data) => (
                    <tr key={data.id}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.date}
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.stock?.product?.name}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.stock!.cost_price}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.tank!.name}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.litres_remaining}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end items-center mt-4">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="py-2 px-4 text-sm bg-slate-700 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="mx-2">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="py-2 px-4 text-sm bg-slate-700 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default FuelDelivery;
