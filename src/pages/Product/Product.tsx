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
import {
  fetchProduct,
  addProduct,
} from '../../store/Slice/ProductSlice';
import Modal from '../../components/Modal';
import ProductAddForm from './ProductAdd';
import { useSelector } from 'react-redux';
import { Product } from '../../types/productType';

const ProductComponent = () => {
  const product = useAppSelector((state) => state.product);
  const [productModal, setproductModal] = useState(false);
  const [productBeingUpdated, setProductBeingUpdated] =
    useState<Product | null>(null);
  const [isProductEdit, setProductEdit] = useState(false);
  const dispatch = useAppDispatch();

  const [error, setError] = useState<Record<string, string[]>>({});



  type ErrorMessagesProps = {
    errors: Record<string, string[]>;
  };
  const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
    // Transform the errors object into an array of messages
    const errorMessages: string[] = Object.keys(errors).reduce(
      (acc: string[], key: string) => {
        const messages = errors[key];
        return [...acc, ...messages]; // Combine all messages into a single array
      },
      [],
    );

    // Do not render if there are no messages
    if (!errorMessages.length) return null;

    return (
      <div className="flex bg-orange-600">
        <ul className='w-2/3'>
          {errorMessages.map((message, index) => (
            <li className="" key={index}>
              {message}
            </li> // Display each error message
          ))}
        </ul>
      </div>
    );
  };

  const fetchProducts = async () => {
    try {
      const result = await dispatch(fetchProduct()).unwrap(); // Unwrap to catch the error
      console.log('Product Component : Fetched Product Succesfully:', result);
    } catch (error: any) {
      // The error object here is the thrown responseData object
      if (error && error.errors) {
        // console.error('Validation errors:', error.errors);
        setError(error.errors);
        console.log(error.errors);
        // Update your component's state here to display the errors
      } else {
        // Handle other errors (like network issues, etc.)
        // console.error('Error:', error);
        console.log(error);
        setError(error);
      }
    } finally {
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Product" />

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
                </div>{' '}
                <button
                  onClick={() => {
                    setproductModal(true);
                  }}
                  className="flex bg-slate-700 text-white p-2 items-center gap-2"
                >
                  {' '}
                  New Entry <FontAwesomeIcon icon={faPlus} />{' '}
                </button>{' '}
                <Modal
                  isOpen={productModal}
                  onClose={() => setproductModal(false)}
                  title="Add Product"
                >
                  <ProductAddForm
                    isEdit={isProductEdit}
                    existingProduct={productBeingUpdated!}
                    onClose={() => setproductModal(false)}
                  />
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
                      Unit Price
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium  dark:text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.products.map((product) => (
                    <tr key={product.name}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {product.name} {product.id}
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {product.unit_price}
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <FontAwesomeIcon
                          onClick={() => {
                            setProductEdit(true);
                            setProductBeingUpdated(product);
                            setproductModal(true);
                          }}
                          className="text-primary"
                          icon={faEdit}
                        />
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

export default ProductComponent;
