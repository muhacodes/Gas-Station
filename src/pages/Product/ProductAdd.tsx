import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks'; // Adjust the import path as necessary
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product } from '../../types/productType';
import { addProduct, ProductActions, updateProduct } from '../../store/Slice/ProductSlice'; // Adjust your import for update

interface ProductAddProps {
  onClose: () => void;
  isEdit?: boolean; // To differentiate between add and update
  existingProduct?: Product | null; // Product to update
}

const ProductAddForm: React.FC<ProductAddProps> = ({
  onClose,
  isEdit = false,
  existingProduct,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  // const station = useAppSelector((state) => state.product.products)[0];
  const station = useAppSelector((state) => state.client.station);
  
  const [error, setError] = useState<any>({});
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    station: '1',
    unit_price: '',
  });

  // Populate form fields when in edit mode
  useEffect(() => {
    if (isEdit && existingProduct) {
      setProduct(existingProduct); // Load existing product details into state
    }
  }, [isEdit, existingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log("station is ", station.id);
    try { 
      
      if (isEdit) {
        // Only update unit price
        await dispatch(updateProduct(product!)).unwrap();
        dispatch(ProductActions.UpdateProduct(product));
        console.log('Product updated successfully:', product);
      } else {
        // Add new product
        await dispatch(addProduct(product)).unwrap();
        console.log('Product added successfully:', product);
      }
      onClose();
    } catch (error: any) {
      console.error('Failed to submit form:', error);
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
        {!isEdit && (
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              disabled={isEdit} // Disable name field when editing
            />
          </div>
        )}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Unit Price
          </label>
          <input
            type="number"
            name="unit_price"
            value={product.unit_price}
            onChange={handleChange}
            placeholder="Unit Price"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin={true} />
          ) : isEdit ? (
            'Update'
          ) : (
            'Add'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductAddForm;

// import React, { useState, useEffect } from 'react';
// import { useAppDispatch } from '../../hooks/customHooks'; // Adjust the import path as necessary
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Product } from '../../types/productType';
// import { addProduct, updateProduct } from '../../store/Slice/ProductSlice'; // Adjust your import for update
// import FormInput from '../components/InputForm';
// // Import the reusable form component
// interface ProductAddProps {
//   onClose: () => void;
//   isEdit?: boolean; // To differentiate between add and update
//   existingProduct?: Product; // Product to update
// }

// const ProductAddForm: React.FC<ProductAddProps> = ({
//   onClose,
//   isEdit = false,
//   existingProduct,
// }) => {
//   const dispatch = useAppDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<any>({});
//   const [product, setProduct] = useState<Product>({
//     id: 0,
//     name: '',
//     station: '1',
//     unit_price: '',
//   });

//   // Populate form fields when in edit mode
//   useEffect(() => {
//     if (isEdit && existingProduct) {
//       setProduct(existingProduct); // Load existing product details into state
//     }
//   }, [isEdit, existingProduct]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let result;
//       if (isEdit) {
//         // Only update unit price
//         result = await dispatch(updateProduct(product!)).unwrap();
//         console.log('Product updated successfully:', result);
//       } else {
//         // Add new product
//         result = await dispatch(addProduct(product)).unwrap();
//         console.log('Product added successfully:', result);
//       }
//       onClose();
//     } catch (error: any) {
//       console.error('Failed to submit form:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // <form onSubmit={submitForm} action="#">
//     //   <div
//     //     className={`p-5 flex flex-col gap-4 ${
//     //       loading ? 'opacity-50 pointer-events-none ' : ''
//     //     }`}
//     //   >
//     //     <div className="mb-4.5">
//     //       <label className="mb-2.5 block text-black dark:text-white">
//     //         Name
//     //       </label>
//     //       <input
//     //         type="text"
//     //         name="name"
//     //         value={formData.name}
//     //         onChange={handleChange}
//     //         placeholder="name"
//     //         className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//     //       />
//     //     </div>

//     //     <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
//     //       Add
//     //     </button>
//     //   </div>
//     // </form>
//     <form onSubmit={submitForm} action="#">
//       <div
//         className={`p-5 flex flex-col gap-4 ${
//           loading ? 'opacity-50 pointer-events-none ' : ''
//         }`}
//       >
//         {/* Replacing with FormInput */}
//         {!isEdit && (
//           <FormInput
//             label="Product Name"
//             name="name"
//             type="text"
//             value={product.name}
//             onChange={handleChange}
//             error={error.name} // Disable name field when editing
//           />
//         )}

//         <FormInput
//           label="Unit Price"
//           name="unit_price"
//           type="text"
//           value={product.unit_price}
//           onChange={handleChange}
//           error={error.unit_price}
//         />

//         <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
//           {loading ? (
//             <FontAwesomeIcon icon={faSpinner} spin={true} />
//           ) : isEdit ? (
//             'Update'
//           ) : (
//             'Add'
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ProductAddForm;
