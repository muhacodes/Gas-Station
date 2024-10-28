import {useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import {fetchPumpSummary} from '../../store/Slice/Sales';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {expense_type } from '../../types/finance';
import FormContainerComponent from '../components/FormContainer';
import { addExpense } from '../../store/Slice/Expenses';
import { showNotificationWithTimeout } from '../../store/Slice/Notification';

const ExpenseAdd = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<Record<string, string[]>>({});
  const station = useAppSelector((state) => state.client.GasStation);
  const pump = useAppSelector((state) => state.product.pump);

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

  const handleSubmit = async (data: expense_type) => {
    setLoading(true);
    try {
      console.log(data);
      await dispatch(addExpense(data)).unwrap(); // Unwrap to catch the error
      await dispatch(fetchPumpSummary()).unwrap()
      dispatch(showNotificationWithTimeout('Succesfully added expenses', 'success'))
      navigate('/expenses');
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
  const fields: FormField<expense_type>[] = [
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      //   required: true,
    },
    {
      name: 'name',
      label: 'Expense Name',
      type: 'text',
      //   required: true,
    },
    {
      name: 'pump',
      label: 'Pump',
      type: 'autocomplete',
      //   required: true,
      autocompleteOptions: pump.map((value) => ({
        value: value.id!,
        label: value.name
      })),
    },


    {
      name: 'amount',
      label: 'Amount',
      type: 'text',
      //   required: true,
    },

    // {
    //   name: 'Meter',
    //   label: 'Meter',
    //   type: 'select',
    //   options: meter.map((tank) => ({
    //     value: tank.id!,
    //     label: tank.name,
    //   })),
    // },

    {
      name: 'shift',
      label: 'Shift',
      type: 'select',
      options: [{ Morning: 'Morning' }, { Evening: 'Evening' }].map(
        (value) => ({
          value: Object.values(value)[0],
          label: Object.keys(value)[0],
        }),
      ),
      //   required: true,
    },
  ];

  return (
    <DefaultLayout>
      {loading && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-25 flex justify-center items-center">
          <FontAwesomeIcon className="text-1xl" spin={true} icon={faSpinner} />
        </div>
      )}
      <div className="mx-auto">
        <Breadcrumb pageName="Expense / Add " />
        <FormContainerComponent<expense_type>
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
          initialValues={{ station: station.id,}}
          error={error}
          setError={setError}
        />
      </div>
    </DefaultLayout>
  );
};

export default ExpenseAdd;
