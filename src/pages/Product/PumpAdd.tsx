import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks'; // Adjust the import path as necessary
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product, Pump, Tank as TankType } from '../../types/productType';
import {
  addProduct,
  addPump,
  fetchPump,
  updateProduct,
} from '../../store/Slice/ProductSlice'; // Adjust your import for update
import { addTank } from '../../store/Slice/Tank';

interface TankAddProps {
  onClose: () => void;
  isEdit?: boolean; // To differentiate between add and update
  existingProduct?: Product; // Product to update
}

const PumpAddForm: React.FC<TankAddProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const station = useAppSelector((state) => state.client.station);
  const [formData, setFormData] = useState<Pump>({
    station: '1',
    name: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(addPump(formData)).unwrap();
      await dispatch(fetchPump()).unwrap;
      onClose();
    } catch (error: any) {
      console.error('Failed to Add Tank:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitForm} action="#">
      <div
        className={`p-5 flex flex-col gap-4 ${
          loading ? 'opacity-50 pointer-events-none ' : ''
        }`}
      >
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
          Add
        </button>
      </div>
    </form>
  );
};

export default PumpAddForm;
