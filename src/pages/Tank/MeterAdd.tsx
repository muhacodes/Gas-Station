import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks'; // Adjust the import path as necessary
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Meter, Product, Tank as TankType } from '../../types/productType';
import { addProduct, updateProduct } from '../../store/Slice/ProductSlice'; // Adjust your import for update
import { addMeter, addTank } from '../../store/Slice/Tank';

interface TankAddProps {
  onClose: () => void;
}

const MeterAdd: React.FC<TankAddProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const tank = useAppSelector((state) => state.tank.Tank);
  const pump = useAppSelector((state) => state.product.pump);
  const [formData, setFormData] = useState<Meter>({
    station: '1',
    name: '',
    pump: null,
    tank: null,
    id: '',
    open: '',
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
      await dispatch(addMeter(formData)).unwrap();
      // console.log('Meter  added successfully:', result);
      onClose();
    } catch (error: any) {
      console.error('Failed to Add Meter:', error);
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
        <div className="mb-2">
          <label className="mb-2.5 block text-black dark:text-white">
            Tank
          </label>
          <select
            name="tank"
            onChange={handleChange}
            className='className=" pl-10 w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"'
          >
            <option value="male"> select -- </option>
            {tank.map((tank) => (
              <option key={tank.id} value={tank.id}>
                {tank.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="mb-2.5 block text-black dark:text-white">
            Pump
          </label>
          <select
            name="pump"
            onChange={handleChange}
            className='className=" pl-10 w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"'
          >
            <option value="male"> select -- </option>
            {pump.map((pump) => (
              <option key={pump.id} value={pump.id}>
                {pump.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
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

        <div className="mb-2">
          <label className="mb-2.5 block text-black dark:text-white">
            open
          </label>
          <input
            type="number"
            name="open"
            value={formData.open!}
            onChange={handleChange}
            placeholder="Opening"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        {/* <div className="mb-2">
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
        </div> */}

        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
          Add
        </button>
      </div>
    </form>
  );
};

export default MeterAdd;
