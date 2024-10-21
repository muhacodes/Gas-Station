import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks';
import { addFuelDelivery, fetchTank } from '../../store/Slice/Tank';
import FormModalComponent from '../components/FormModal';
import { fuelDelivery } from '../../types/productType';

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

interface FuelDeliveryProps {
  onClose: () => void;
}

const FuelDeliveryAdd: React.FC<FuelDeliveryProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const stocks = useAppSelector((state) => state.product.stocks);
  const tanks = useAppSelector((state) => state.tank.Tank);

  interface FuelDeliveryFormData {
    date: string;
    stock: string;
    tank: string;
    station: string;
  }

  const fields: FormField<fuelDelivery>[] = [
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true,
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'autocomplete',
      required: true,
      autocompleteOptions: stocks.map((stock) => ({
        value: stock.id!,
        label: `${stock.product!.name} - ${stock.date} - ${stock.litres}`,
      })),
    },
    {
      name: 'tank',
      label: 'Tank',
      type: 'select',
      required: true,
      options: tanks.map((tank) => ({
        value: tank.id!,
        label: tank.name,
      })),
    },
  ];
  
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      console.log(data); // Should show stock as stock ID, not product name
      await dispatch(addFuelDelivery(data)).unwrap();
      await dispatch(fetchTank()).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to Offload Fuel into Tank:', error);
      alert('Something went Wrong!');
      // onClose();
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModalComponent<fuelDelivery>
      fields={fields}
      onSubmit={onSubmit}
      loading={loading}
      initialValues={{ station: '1' }}
    />
  );
};

export default FuelDeliveryAdd;
