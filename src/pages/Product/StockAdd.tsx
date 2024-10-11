import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  faCircle,
  faEnvelope,
  faFile,
  faImage,
  faPhone,
  faSpinner,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import { useNavigate } from 'react-router-dom';
import { addStock } from '../../store/Slice/ProductSlice';
import { Stock } from '../../types/productType';

const StockAdd = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const product = useAppSelector((state) => state.product);
  const navigate = useNavigate();
  const [error, setError] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState<Stock>({
    product: null,
    station: '1',
    company: '',
    price: '',
    date: '',
    litres: '',
    taxes: '',
    Transport: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value, // Dynamically update the state based on input name
    });
  };

  // const [error, setError]: any = useState({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      const result = await dispatch(addStock(formData)).unwrap(); // Unwrap to catch the error
      console.log('Stock Added Succesfully');
      navigate('/stock');
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
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      {loading && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-25 flex justify-center items-center">
          <FontAwesomeIcon className="text-1xl" spin={true} icon={faSpinner} />
        </div>
      )}
      <div className="mx-auto">
        <Breadcrumb pageName="Stock " />
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    New Stock Entry
                  </h3>
                </div>
                <div className="p-7">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Date
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="date"
                        name="date"
                        id="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                      <span className="text-sm text-red-500 font-bold ">
                        {' '}
                        {error.date}{' '}
                      </span>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Product
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <select
                          name="product"
                          onChange={handleChange}
                          className='className=" pl-10 w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"'
                        >
                          <option value="select"> select -- </option>
                          {product.products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {' '}
                              {product.name}{' '}
                            </option>
                          ))}
                        </select>
                        <span className="text-sm text-red-500 font-bold ">
                          {' '}
                          {error.product}{' '}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Company
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="company"
                          id="Username"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Address"
                        />
                        <span className="text-sm text-red-500 font-bold ">
                          {error.company}
                        </span>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Cost Price
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        id="price"
                      />
                      <span className="text-sm text-red-500 font-bold ">
                        {' '}
                        {error.price}{' '}
                      </span>
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Transport
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="Transport"
                        value={formData.Transport}
                        onChange={handleChange}
                        id="Transport"
                      />
                      <span className="text-sm text-red-500 font-bold ">
                        {error.Transport}
                      </span>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Litres
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="litres"
                        value={formData.litres}
                        onChange={handleChange}
                        id="litres"
                      />
                      <span className="text-sm text-red-500 font-bold ">
                        {error.litres}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Taxes
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="taxes"
                        id="nationality"
                        value={formData.taxes}
                        onChange={handleChange}
                      />
                      <span className="text-sm text-red-500 font-bold ">
                        {error.taxes}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      type="button"
                      onClick={() => setError({})}
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    >
                      Clear
                    </button>
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-5 xl:col-span-2">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Additional Information
                  </h3>
                </div>
                <div className="p-7"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default StockAdd;
