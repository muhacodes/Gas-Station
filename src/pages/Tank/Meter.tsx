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
import MeterAdd from './MeterAdd';

const Meter = () => {
  const [meterModal, setmeterModal] = useState(false);
  const meter = useAppSelector((state) => state.tank.Meter);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Meter " />

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
                  onClick={() => setmeterModal(true)}
                  className="flex bg-slate-700 text-white p-2 items-center gap-2"
                >
                  New Entry <FontAwesomeIcon icon={faPlus} />
                </button>

                <Modal
                  isOpen={meterModal}
                  onClose={() => setmeterModal(false)}
                  title="Add Meter"
                >
                  <MeterAdd onClose={() => setmeterModal(false)} />
                  {/* <DepartmentForm onSubmit={handleAddDepartment} /> */}
                </Modal>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-slate-700 text-white text-left dark:bg-meta-4">
                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      Product
                    </th>

                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      Tank
                    </th>

                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      Meter
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {meter.map((meter) => (
                    <tr key={meter.id}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {meter.product?.name}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {meter.tank?.name}
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {meter.name}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <FontAwesomeIcon icon={faPlus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Meter;
