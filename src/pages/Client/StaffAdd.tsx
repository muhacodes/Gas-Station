import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import { addCreditSales } from '../../store/Slice/Sales';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { CreditSale } from '../../types/finance';
import FormContainerComponent from '../components/FormContainer';
import { staff_type } from '../../types/client';
import { AddStaff, fetchStaff } from '../../store/Slice/Client';
import { showNotificationWithTimeout } from '../../store/Slice/Notification';

const StaffAdd = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const station = useAppSelector((state) => state.client.station);
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
       dispatch(showNotificationWithTimeout('Succesfully added staff ', 'success'))
    //   await dispatch(fetchStaff()).unwrap();
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
        <FormContainerComponent<staff_type>
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
          initialValues={{ station: station.id }}
          error={error}
          setError={setError}
        />
      </div>
    </DefaultLayout>
  );
};

export default StaffAdd;
