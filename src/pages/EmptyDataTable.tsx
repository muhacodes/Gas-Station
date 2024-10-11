import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/customHooks';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { addProduct, fetchStock } from '../store/Slice/ProductSlice';
import { Stock as Stocktype } from '../types/productType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Stock = () => {
  const dispatch = useAppDispatch();
  const [LoadedStock, setStock] = useState<Stocktype[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastStock = currentPage * itemsPerPage;
  const indexOfFirstStock = indexOfLastStock - itemsPerPage;
  const currentStock = LoadedStock.slice(indexOfFirstStock, indexOfLastStock);

  const totalPages = Math.ceil(LoadedStock.length / itemsPerPage);

  const LoadingStock = async () => {
    try {
      const result = await dispatch(fetchStock()).unwrap(); // Unwrap to catch the error
      setStock(result);
      console.log('Product Component : Fetched Stock Succesfully:', result);
    } catch (error: any) {
      console.log('Failed Loading stock', error);
    }
  };
  useEffect(() => {
    LoadingStock();
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
                <Link to="/stock/add">
                  <button className="flex bg-slate-700 text-white p-2 items-center gap-2">
                    New Entry <FontAwesomeIcon icon={faPlus} />
                  </button>
                </Link>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-slate-700 text-white text-left dark:bg-meta-4">
                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentStock!.map((stock) => (
                    <tr key={stock.id}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {stock.date}
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

export default Stock;
