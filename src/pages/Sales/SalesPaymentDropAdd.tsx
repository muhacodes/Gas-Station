import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks'; // Adjust the import path as necessary
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product, Tank as TankType } from '../../types/productType';
import { addProduct, updateProduct } from '../../store/Slice/ProductSlice'; // Adjust your import for update
import { addTank } from '../../store/Slice/Tank';
import FormContainerComponent from '../components/FormContainer';
import { payment_drop_type, sales_payment_type } from '../../types/sales';
import { addDrop, fetchPumpSummary } from '../../store/Slice/Sales';
import { useNavigate } from 'react-router-dom';
import FormContainerModalComponent from '../components/FormContainerModal';

interface dropAddProps {
  onClose: () => void;
}

const DropAddModalForm: React.FC<dropAddProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const product = useAppSelector((state) => state.product.products);
  const [error, setError] = useState<Record<string, string[]>>({});
  const pump = useAppSelector((state) => state.product.pump);
  const navigate = useNavigate();
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

  const handleSubmit = async (data: payment_drop_type) => {
    setLoading(true);
    try {
      console.log(data);
      await dispatch(addDrop(data)).unwrap(); // Unwrap to catch the error
      await dispatch(fetchPumpSummary()).unwrap();
      onClose()
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
  const fields: FormField<payment_drop_type>[] = [
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      //   required: true,
    },

    {
      name: 'amount',
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

    // {
    //   name: '',
    //   label: 'Transaction No',
    //   type: 'text',
    //   //   required: true,
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
    <>
      <FormContainerModalComponent<payment_drop_type>
        fields={fields}
        onSubmit={handleSubmit}
        loading={loading}
        initialValues={{
          station: '1',
          agent: '1',
          supervisor: '1',
        }}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default DropAddModalForm;
