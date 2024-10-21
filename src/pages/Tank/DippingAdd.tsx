import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import FormContainerComponent from '../components/FormContainer';
import { TankDipping } from '../../types/productType';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import { useNavigate } from 'react-router-dom';
import { addDipping, fetchDipping } from '../../store/Slice/Tank';
import { evaluate } from 'mathjs';

type Props = {};

function DippingAdd({}: Props) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<Record<string, string[]>>({});
  const tank = useAppSelector((state) => state.tank.Tank);
  const [expression, setExpression] = useState<string>('');
  //   const [error, setError] = useState<string | null>(null);

  interface Option {
    value: string;
    label: string;
  }

  type FormField<T> = {
    name: keyof T;
    label: string;
    type:
      | 'text'
      | 'date'
      | 'select'
      | 'autocomplete'
      | 'number'
      | 'checkbox'
      | 'Expression';
    options?: Option[];
    required?: boolean;
    autocompleteOptions?: Option[];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(e.target.value);
    // Clear errors when user types
    setError({});
  };

//   const handleEvaluate = () => {
//     try {
    
//       // Evaluate the expression and ensure the result is a number (decimal)
//       const evalResult = evaluate(expression);

//       // Check if the result is a valid number
//       if (typeof evalResult === 'number') {
//         // return evalResult
//         setResult(evalResult)
//         // setError({}); // Clear errors when valid result
//       } else {
//         console.log('Invalid');
//         throw new Error('Invalid Expression');
//       }
//     } catch (err) {
//       console.log(err);
//       // Set the error under the key 'closing'
//       setError({ closing: ['Invalid Expression'] });
//       setResult(null);
//     }
//   };

  const handleSubmit = async (data: TankDipping) => {
    try{

        data.closing = evaluate(data.closing)
    }catch(error){
        setError({ closing: ['Invalid Expression'] });
        return
    }

    try {
      console.log(data);
      await dispatch(addDipping(data)).unwrap(); // Unwrap to catch the error
      await dispatch(fetchDipping())
      navigate('/tank-dipping');
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
  const fields: FormField<TankDipping>[] = [
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      //   required: true,
    },

    {
      name: 'closing',
      label: 'Closing',
      type: 'Expression',
      //   required: true,
    },

    {
      name: 'Tank',
      label: 'tank',
      type: 'autocomplete',
      //   required: true,
      autocompleteOptions: tank.map((value) => ({
        value: value.id!,
        label: value.name,
      })),
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
        <Breadcrumb pageName="Dipping / Add " />
        <FormContainerComponent<TankDipping>
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
          initialValues={{ station: '1' }}
          error={error}
          setError={setError}
          expression={expression}
          ExpressionInputChange={handleInputChange}
        />
      </div>
    </DefaultLayout>
  );
}

export default DippingAdd;
