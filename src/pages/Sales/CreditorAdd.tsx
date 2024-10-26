import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faEnvelope,
  faFile,
  faImage,
  faPhone,
  faSpinner,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Creditor } from '../../types/finance';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import { addCreditors } from '../../store/Slice/Sales';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { showNotificationWithTimeout } from '../../store/Slice/Notification';

const CreditorAdd = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<Record<string, string[]>>({});
  const station = useAppSelector((state) => state.client.GasStation);

  const [formData, setFormData] = useState<Creditor>({
    station : station.id,
    customer: '',
    address: '',
    company: '',
    contact: '',
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
      await dispatch(addCreditors(formData)).unwrap(); // Unwrap to catch the error
      dispatch(showNotificationWithTimeout('Succesfully added Creditor', 'success'))
      navigate('/creditor');
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
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    New Crededitor
                  </h3>
                </div>
                <div className="p-7">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Customer
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="customer"
                        id="customer"
                        value={formData.customer}
                        onChange={handleChange}
                      />
                      <span className="text-sm text-red-500 font-bold ">
                        {' '}
                        {error.customer}{' '}
                      </span>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Company
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company!}
                        onChange={handleChange}
                      />
                      <span className="text-sm text-red-500 font-bold ">
                        {' '}
                        {error.company}{' '}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address!}
                          onChange={handleChange}
                          placeholder="Address"
                        />
                        <span className="text-sm text-red-500 font-bold ">
                          {error.address}
                        </span>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Contact
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="contact"
                        value={formData.contact!}
                        onChange={handleChange}
                        id="contact"
                      />
                      <span className="text-sm text-red-500 font-bold ">
                        {' '}
                        {error.price}{' '}
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
            {/* <div className="col-span-5 xl:col-span-2">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Additional Information
                  </h3>
                </div>
                <div className="p-7"></div>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CreditorAdd;
