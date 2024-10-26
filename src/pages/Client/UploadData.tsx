import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import FormContainerComponent from '../components/FormContainer';
import { staff_type } from '../../types/client';
import { AddStaff, fetchStaff } from '../../store/Slice/Client';
import { showNotificationWithTimeout } from '../../store/Slice/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faSpinner } from '@fortawesome/free-solid-svg-icons';

const UploadData = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const station = useAppSelector((state) => state.client.GasStation);
  const navigate = useNavigate();
  const [error, setError] = useState<Record<string, string[]>>({});

  interface Option {
    value: string;
    label: string;
  }

  type FormField<T> = {
    name: keyof T;
    label: string;
    type: 'text' | 'date' | 'select' | 'autocomplete' | 'number' | 'checkbox';
    options?: Option[];
    required?: boolean;
    autocompleteOptions?: Option[];
  };

  const handleSubmit = async (data: staff_type) => {
    setLoading(true);
    try {
      console.log(data);
      await dispatch(AddStaff(data)).unwrap(); // Unwrap to catch the error
      dispatch(
        showNotificationWithTimeout('Succesfully added staff ', 'success'),
      );
      await dispatch(fetchStaff()).unwrap();
      navigate('/staff');
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
  const fields: FormField<staff_type>[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      //   required: true,
    },
    {
      name: 'designation',
      label: 'Role',
      type: 'text',
    },

    {
      name: 'address',
      label: 'Address',
      type: 'text',
      //   required: true,
    },
  ];

  return (
    <DefaultLayout>
      {/* {loading && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-25 flex justify-center items-center">
          <FontAwesomeIcon className="text-1xl" spin={true} icon={faSpinner} />
        </div>
      )} */}
      <div className="mx-auto">
        <Breadcrumb pageName="Staff Add " />
        <form className="">
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b flex justify-between border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Data Upload :
                  </h3>
                  <p className="text-orange-800">
                    {' '}
                    please make sure the data you are uploading is accurate!{' '}
                  </p>
                </div>

                <div className="flex justify-between p-7">
                  <div className='flex items-center gap-5'>
                    <label className='font-bold'> Sales </label>
                    <input type="File" />
                  </div>
                  <button className="flex gap-2 items-center justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:bg-opacity-90">
                    <FontAwesomeIcon icon={faFile} /> Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default UploadData;
