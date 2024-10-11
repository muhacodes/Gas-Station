import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { sales } from '../../types/sales';
import TableHeader from '../components/tableHeader';
import TableBody from '../components/tableBody';

const Sales = () => {
  const sales = useAppSelector((state) => state.sales.sales);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastStock = currentPage * itemsPerPage;
  const indexOfFirstStock = indexOfLastStock - itemsPerPage;
  const currentData = sales.slice(indexOfFirstStock, indexOfLastStock);
  const totalPages = Math.ceil(sales.length / itemsPerPage);

  const allFields: (keyof sales | 'actions')[] = [
    'date',
    'product',
    'shift',
    'Meter',
    'opening',
    'closing',
    'litres',
    'rtt_litres',
    'rtt_amount',
    'unit_price',
    'amount',
    'cash',
    'difference',
    'credit',
    'creditamount',
    'agent',
    'actions', // Add actions column
  ];
  const tableRow: (keyof sales | string)[] = [
    'date',
    'product.name',
    'shift',
    'Meter',
    'opening',
    'closing',
    'litres',
    'rtt_litres',
    'rtt_amount',
    'unit_price',
    'amount',
    'cash',
    'difference',
    'credit',
    'creditamount',
    'agent',
  ];
  const customTitles = {
    rtt_litres: 'Rtt Litres',
    rtt_amount: 'Rtt Amount',
    creditamount: 'Credit Amount',
    unit_price: 'Price',
    difference: 'Short',
  };
  const moneyFields: (keyof sales | string)[] = ['amount', 'creditamount', 'unit_price']; // Money-related fields

  const handleEdit = (record: sales) => {
    console.log('Edit record', record);
    // Logic for editing the record
  };

  // Handle the delete action
  const handleDelete = (record: sales) => {
    console.log('Delete record', record);
    // Logic for deleting the record
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Creditors " />

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
                <Link to="/sales/add">
                  <button className="flex bg-slate-700 text-white p-2 items-center gap-2">
                    New Entry <FontAwesomeIcon icon={faPlus} />
                  </button>
                </Link>
              </div>
              <table className="w-full table-auto">
                <TableHeader<sales>
                  customTitles={customTitles}
                  fields={allFields}
                />

                <tbody>
                  <TableBody<sales>
                    data={currentData}
                    fields={tableRow}
                    moneyFields={moneyFields}
                    onEdit={handleEdit} // Pass the edit logic
                    onDelete={handleDelete} // Pass the delete logic
                  />
                  {/* <TableBody<sales> data={currentData}  fields={tableRow} /> */}
                  {/* {currentData!.map((data) => (
                    <tr key={data.id}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.date}
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.product!.name}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.shift}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.Meter?.name}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.opening}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.closing}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.litres}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.rtt_litres}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.rtt_amount}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.unit_price}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.amount}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.cash}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.credit}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.creditamount}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {data.agent}
                      </td>
                      <td className="border-b flex gap-4 border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="relative group w-fit">
                          <FontAwesomeIcon
                            className="text-slate-800 cursor-pointer text-2xl"
                            icon={faPlus}
                          />
                          <span className="absolute left-1 -translate-x-1/2 bottom-full mb-2 hidden rounded-lg bg-black text-white text-xs px-2 py-1 group-hover:block">
                            Add Payment
                          </span>
                        </div>
                        <div className="relative group w-fit">
                          <FontAwesomeIcon
                            className="text-orange-600 cursor-pointer text-2xl"
                            icon={faReceipt}
                          />
                          <span className="absolute left-1 -translate-x-1/2 bottom-full mb-2 hidden rounded-lg bg-black text-white text-xs px-2 py-1 group-hover:block">
                            Sales
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))} */}
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

export default Sales;
