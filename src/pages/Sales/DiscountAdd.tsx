import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import { addDiscount, fetchDiscount, fetchPumpSummary } from '../../store/Slice/Sales';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Discount } from '../../types/finance';
import FormContainerComponent from '../components/FormContainer';
import { prod } from 'mathjs';

const DiscountAdd = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<Record<string, string[]>>({});
  const meter = useAppSelector((state) => state.tank.Meter);
  const product = useAppSelector((state) => state.product.products);
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

  const handleSubmit = async (data: Discount) => {
    setLoading(true);
    try {
      console.log(data);
      await dispatch(addDiscount(data)).unwrap(); // Unwrap to catch the error
      await dispatch(fetchDiscount()).unwrap(); // Unwrap to catch the error
      await dispatch(fetchPumpSummary({})).unwrap()
      navigate('/discount');
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
  const fields: FormField<Discount>[] = [
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      //   required: true,
    },
    {
      name: 'meter',
      label: 'Meter',
      type: 'autocomplete',
      //   required: true,
      autocompleteOptions: meter.map((value) => ({
        value: value.id!,
        label: value.name,
      })),
    },

    {
      name: 'product',
      label: 'Product',
      type: 'select',
      required: true,
      options: product.map((tank) => ({
        value: tank.id!,
        label: tank.name,
      })),
    },

    {
      name: 'pump',
      label: 'Pump',
      type: 'select',
      required: true,
      options: pump.map((tank) => ({
        value: tank.id!,
        label: tank.name,
      })),
      //   required: true,
    },
    {
      name: 'customer',
      label: 'Customer',
      type: 'text',
      //   required: true,
    },

    {
      name: 'amount',
      label: 'Amount',
      type: 'text',
      //   required: true,
    },

    {
      name: 'litres',
      label: 'Litres',
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
        <Breadcrumb pageName="Discount / Add " />
        <FormContainerComponent<Discount>
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

export default DiscountAdd;
