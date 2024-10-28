import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import { addSales, fetchPumpSummary } from '../../store/Slice/Sales';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { sales } from '../../types/sales';
import PumpSalesSummary from './PumpSaes';

const SalesAdd = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [Error, setError] = useState<Record<string, string[]>>({});
  const meter = useAppSelector((state) => state.tank.Meter);
  const station = useAppSelector((state) => state.client.GasStation);

  const [formData, setFormData] = useState<sales>({
    station: station.id!,
    date: '',
    closing: '',
    agent: '1',
    Meter: null,
    shift: '',
    cost_price: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value, // Dynamically update the state based on input name
    });
    // Remove the error for this field if it exists
    setError((prevErrors) => {
      const updatedErrors = { ...prevErrors }; // Clone the previous errors

      // If there's an error for this field, remove it
      if (updatedErrors[name]) {
        delete updatedErrors[name];
      }

      return updatedErrors; // Return the updated errors without the field error
    });
  };

  // const [error, setError]: any = useState({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      await dispatch(addSales(formData)).unwrap(); 
      await dispatch(fetchPumpSummary({})).unwrap();
      navigate('/sales');
    } catch (error: any) {
      // The error object here is the thrown responseData object
      if (error && error.errors) {
        // console.error('Validation errors:', error.errors);
        setError(error.errors);

        // console.log("Conole Log Error " , error.errors);
        // Update your component's state here to display the errors
      } else {
        // Handle other errors (like network issues, etc.)
        // console.error('Error:', error);
        console.log(error);
        setError(error);
        console.log('Conole Log Error ', error);
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
        <Breadcrumb pageName="Sales  / Add " />
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    New Entry
                  </h3>
                </div>
                <div className="p-7">
                  {/* <div className="w-full p-4 bg-red-800 text-white">
                    {Error!['error']}
                  </div> */}
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
                        id="company"
                        value={formData.date!}
                        onChange={handleChange}
                      />
                      <span className="text-sm text-red-500 font-bold ">
                        {' '}
                        {Error.date}{' '}
                      </span>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Shift
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <select
                          name="shift"
                          onChange={handleChange}
                          className='className=" pl-10 w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"'
                        >
                          <option value="select"> select -- </option>
                          <option value="Morning"> Morning </option>
                          <option value="Evening"> Evening </option>
                        </select>
                        <span className="text-sm text-red-500 font-bold ">
                          {Error.shift}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Meter
                      </label>
                      <select
                        name="Meter"
                        onChange={handleChange}
                        className='className=" pl-10 w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"'
                      >
                        <option value="select"> select -- </option>
                        {meter.map((meter) => (
                          <option key={meter.id} value={meter.id}>
                            {meter.name}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm text-red-500 font-bold ">
                        {' '}
                        {Error.meter}{' '}
                      </span>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Closing
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="closing"
                          id="closing"
                          value={formData.closing!}
                          onChange={handleChange}
                          placeholder="closing"
                        />
                        <span className="text-sm text-red-500 font-bold ">
                          {Error.closing}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Cash
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="cash"
                          id="closing"
                          value={formData.cash!}
                          onChange={handleChange}
                          placeholder="cash"
                        />
                        <span className="text-sm text-red-500 font-bold ">
                          {Error.cash}
                        </span>
                      </div>
                    </div>
                  </div> */}

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row"></div>
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
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default SalesAdd;
