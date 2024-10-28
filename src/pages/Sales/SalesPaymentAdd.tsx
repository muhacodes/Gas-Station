import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import { addSalesPayment, fetchPumpSummary } from '../../store/Slice/Sales';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import FormContainerComponent from '../components/FormContainer';
import { sales_payment_type } from '../../types/sales';

const SalesPaymentAdd = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<Record<string, string[]>>({});
  const pump = useAppSelector((state) => state.product.pump);
  const station = useAppSelector((state) => state.client.GasStation);

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

  const handleSubmit = async (data: sales_payment_type) => {
    setLoading(true);
    try {
      console.log(data);
      await dispatch(addSalesPayment(data)).unwrap(); // Unwrap to catch the error
      await dispatch(fetchPumpSummary({})).unwrap()
      navigate('/sales-payment');
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
  const fields: FormField<sales_payment_type>[] = [
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      //   required: true,
    },
    

    {
      name: 'money',
      label: 'Amount',
      type: 'text',
      //   required: true,
    },

    {
      name: 'pump',
      label: 'Pump',
      type: 'select',
      options: pump.map((val) => ({
        value: val.id!,
        label: val.name,
      })),
    },

    {
      name: 'transaction_no',
      label: 'Transaction No',
      type: 'text',
      //   required: true,
    },

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
        <Breadcrumb pageName="Sales Payment  / Add " />
        <FormContainerComponent<sales_payment_type>
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
          initialValues={{
            station: station.id!,
            payment_method: '1',
            agent: '1',
            supervisor: '1',
          }}
          error={error}
          setError={setError}
        />
      </div>
    </DefaultLayout>
  );
};

export default SalesPaymentAdd;
