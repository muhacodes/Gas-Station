// import React, { useState } from 'react';
// import { Stock } from '../../types/productType';

// interface StockAutocompleteProps {
//   stocks: Stock[];
//   onSelect: (stock: Stock) => void;
// }
// const StockAutocomplete: React.FC<StockAutocompleteProps> = ({
//   stocks,
//   onSelect,
// }) => {
//   const [inputValue, setInputValue] = useState('');
//   const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputValue(value);

//     if (value) {
//       const parts = value.trim().toLowerCase().split(/\s+/); // Split input by spaces
//       const filtered = stocks.filter((stock) => {
//         // const productMatch = stock.product?.name
//         //   .toLowerCase()
//         //   .includes(value.toLowerCase());
//         // Check if the product matches any part
//         const productMatch = parts.some(
//           (part) => stock.product?.name.toLowerCase().includes(part),
//         );
//         const dateMatch = parts.some(
//           (part) => stock.date === part, // Assuming stock.date is in YYYY-MM-DD format
//         );

//         // const dateMatch = stock.date.includes(value);

//         return productMatch && dateMatch;
//       });
//       setFilteredStocks(filtered);
//       setIsDropdownVisible(true);
//     } else {
//       setFilteredStocks([]);
//       setIsDropdownVisible(false);
//     }
//   };

//   const handleSelectStock = (stock: Stock) => {
//     setInputValue(stock.product?.name! + '-' + stock.date);
//     setFilteredStocks([]);
//     setIsDropdownVisible(false);
//     onSelect(stock); // Notify parent component about the selected stock
//   };

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder="Type to search for a stock..."
//         className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
//       />
//       {isDropdownVisible && (
//         <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
//           {filteredStocks.length > 0 ? (
//             filteredStocks.map((stock) => (
//               <li
//                 key={stock.id}
//                 onClick={() => handleSelectStock(stock)}
//                 className="p-2 z-0 cursor-pointer hover:bg-gray-100 text-black" // Added text-black for visibility
//               >
//                 {stock.product?.name} - {stock.date}
//               </li>
//             ))
//           ) : (
//             <li className="p-2 text-gray-500">No results found</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default StockAutocomplete;
