import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks'; // Adjust the import path as necessary
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product, Tank as TankType } from '../../types/productType';
import { addProduct, updateProduct } from '../../store/Slice/ProductSlice'; // Adjust your import for update
import { addTank } from '../../store/Slice/Tank';

interface TankAddProps {
  onClose: () => void;
  isEdit?: boolean; // To differentiate between add and update
  existingProduct?: Product; // Product to update
}

const TankAddForm: React.FC<TankAddProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const product = useAppSelector((state) => state.product.products);
  const [formData, setFormData] = useState<TankType>({
    station: '1',
    name: '',
    capacity: '',
    id: '',
    litres: '',
    open: '',
    product: null,
  });

  // Populate form fields when in edit mode

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
      const result = await dispatch(addTank(formData)).unwrap();
      console.log('Tank  added successfully:', result);
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
            Product Name
          </label>
          <select
            name="product"
            onChange={handleChange}
            className='className=" pl-10 w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"'
          >
            <option value="male"> select -- </option>
            {product.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
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

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Capacity
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Unit Price"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Open
          </label>
          <input
            type="number"
            name="open"
            value={formData.open}
            onChange={handleChange}
            placeholder="Unit Price"
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

export default TankAddForm;
