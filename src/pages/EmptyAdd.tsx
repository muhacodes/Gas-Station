// import { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import userThree from '../images/user/user-03.png';
// import DefaultLayout from '../layout/DefaultLayout';
// import {
//   faCircle,
//   faEnvelope,
//   faFile,
//   faImage,
//   faPhone,
//   faSpinner,
//   faUser,
// } from '@fortawesome/free-solid-svg-icons';

// import { config } from '../Config';
// import { useAppDispatch, useAppSelector } from '../hooks/customHooks';
// import { StudentActions } from '../store/Slice/StudentSlice';
// import { useNavigate } from 'react-router-dom';
// import { fetchWithTokenRefresh } from '../store/helpers/appUtils';

// const StockAdd = () => {
//   const dispatch = useAppDispatch();
//   const token = useAppSelector((state) => state.auth.access);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (setter: any) => (e: any) => setter(e.target.value);

  


//   // const [error, setError]: any = useState({});
//   const [error, setError] = useState<Record<string, string[]>>({});

//   const handleFileChange = (e: any) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhoto(file); // Set the file to photo state
//       const previewUrl = URL.createObjectURL(file);
//       setPhotoPreview(previewUrl); // Update photoPreview state with the URL
//     }
//   };

//   type ErrorMessagesProps = {
//     errors: Record<string, string[]>;
//   };
//   const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
//     // Transform the errors object into an array of messages
//     const errorMessages: string[] = Object.keys(errors).reduce(
//       (acc: string[], key: string) => {
//         const messages = errors[key];
//         return [...acc, ...messages]; // Combine all messages into a single array
//       },
//       [],
//     );

//     // Do not render if there are no messages
//     if (!errorMessages.length) return null;

//     return (
//       <div className="error-messages">
//         <ul>
//           {errorMessages.map((message, index) => (
//             <li className="text-red-600 text-lg" key={index}>
//               {message}
//             </li> // Display each error message
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault(); // Prevent default form submission

//     // Form data to be sent
//     const formData = new FormData();
//     formData.append('firstname', firstname);
//     formData.append('lastname', lastname);
//     formData.append('email', email);
//     formData.append('address', address);
//     formData.append('postcode', postcode);
//     formData.append('nationality', nationality);
//     formData.append('gender', gender);
//     formData.append('contact', contact);
//     formData.append('dob', dob);

//     if (photo) {
//       formData.append('photo', photo);
//     }


//     try {
//       const url = `${config.appUrl}/api/student/resource/`;
//       const response = await fetchWithTokenRefresh(url, {
//         method: 'POST',
//         headers: {
//           // 'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData
//       });

//       const data = await response.json(); // Parse JSON only once
//     //   console.log(response);

//       if (!response.ok) {
//         // Use the already parsed responseData for error handling
//         throw data; // Throw the parsed object, which includes errors
//       }

//       console.log(data);
//       dispatch(StudentActions.addStudent(data));

//       // Proceed with your logic after success
//       setLoading(false);
//       navigate('/student');
//     } catch (error: any) {
//       // The error object here is the thrown responseData object
//       if (error && error.errors) {
//         // console.error('Validation errors:', error.errors);
//         setError(error.errors);
//         console.log(error.errors);
//         // Update your component's state here to display the errors
//       } else {
//         // Handle other errors (like network issues, etc.)
//         // console.error('Error:', error);
//         console.log(error);
//         setError(error);
//       }
//       setLoading(false);
//     }


//     // try {
//     //   setLoading(true);
//     //   console.log(formData);

//     //   const response = await fetch(`${config.appUrl}/api/student/resource/`, {
//     //     method: 'POST',
//     //     headers: {
//     //       // 'Content-Type': 'application/json',
//     //       Authorization: `Bearer ${token}`,
//     //     },
//     //     body: formData,
//     //   });

//     //   const data = await response.json(); // Parse JSON only once
//     //   console.log(response);

//     //   if (!response.ok) {
//     //     // Use the already parsed responseData for error handling
//     //     throw data; // Throw the parsed object, which includes errors
//     //   }

//     //   console.log(data);
//     //   dispatch(StudentActions.addStudent(data));

//     //   // Proceed with your logic after success
//     //   setLoading(false);
//     //   navigate('/student');
//     // } catch (error: any) {
//     //   // The error object here is the thrown responseData object
//     //   if (error && error.errors) {
//     //     // console.error('Validation errors:', error.errors);
//     //     setError(error.errors);
//     //     console.log(error.errors);
//     //     // Update your component's state here to display the errors
//     //   } else {
//     //     // Handle other errors (like network issues, etc.)
//     //     // console.error('Error:', error);
//     //     console.log(error);
//     //     setError(error);
//     //   }
//     //   setLoading(false);
//     // }
//   };

//   const getMaxDate = () => {
//     const today = new Date();
//     const maxYear = today.getFullYear() - 18;
//     const maxMonth = String(today.getMonth() + 1).padStart(2, '0'); // JS months are 0-indexed
//     const maxDay = String(today.getDate()).padStart(2, '0');
//     return `${maxYear}-${maxMonth}-${maxDay}`;
//   };

//   return (
//     <DefaultLayout>
//       {loading && (
//         <div className="fixed inset-0 z-40 bg-black bg-opacity-70 flex justify-center items-center">
//           <FontAwesomeIcon className="text-5xl" spin={true} icon={faSpinner} />
//         </div>
//       )}
//       <div className="mx-auto">
//         <Breadcrumb pageName="New Student " />
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-5 gap-8">
//             <div className="col-span-5 xl:col-span-3">
//               <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                 <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
//                   <h3 className="font-medium text-black dark:text-white">
//                     Personal Information
//                   </h3>
//                 </div>
//                 <div className="p-7">
//                   <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="fullName"
//                       >
//                         First Name
//                       </label>
//                       <div className="relative">
//                         <span className="absolute left-4.5 top-4">
//                           <FontAwesomeIcon icon={faUser} />
//                         </span>
//                         <input
//                           className={`${
//                             error.firstname ? '' : ''
//                           } w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
//                           type="text"
//                           onChange={(e) => setFirstName(e.target.value)}
//                           value={firstname}
//                           name="fullName"
//                           id="fullName"
//                           placeholder="First Name"
//                         />
//                         <span className="text-sm text-red-500 font-bold ">
//                           {' '}
//                           {error.firstname}{' '}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="phoneNumber"
//                       >
//                         Last Name
//                       </label>
//                       <input
//                         className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                         type="text"
//                         name="lastName"
//                         onChange={(e) => setLastName(e.target.value)}
//                         value={lastname}
//                         id="lastname"
//                         placeholder="Last Name"
//                       />
//                       <span className="text-sm text-red-500 font-bold ">
//                         {' '}
//                         {error.lastname}{' '}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mb-5.5">
//                     <label
//                       className="mb-3 block text-sm font-medium text-black dark:text-white"
//                       htmlFor="emailAddress"
//                     >
//                       Email Address
//                     </label>
//                     <div className="relative">
//                       <span className="absolute left-4.5 top-4">
//                         <FontAwesomeIcon icon={faEnvelope} />
//                       </span>
//                       <input
//                         className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                         type="email"
//                         onChange={(e) => setEmailAddress(e.target.value)}
//                         value={email}
//                         name="emailAddress"
//                         id="emailAddress"
//                         placeholder="Email Address"
//                       />
//                       <span className="text-sm text-red-500 font-bold ">
//                         {' '}
//                         {error.email}{' '}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="Username"
//                       >
//                         Address
//                       </label>
//                       <div className="relative">
//                         <span className="absolute left-4.5 top-4">
//                           <FontAwesomeIcon icon={faEnvelope} />
//                         </span>
//                         <input
//                           className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                           type="text"
//                           name="Username"
//                           onChange={(e) => setAddress(e.target.value)}
//                           value={address}
//                           id="Username"
//                           placeholder="Address"
//                         />
//                         <span className="text-sm text-red-500 font-bold ">
//                           {error.address}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="Username"
//                       >
//                         Post Code
//                       </label>
//                       <input
//                         className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                         type="text"
//                         onChange={(e) => setPostCode(e.target.value)}
//                         value={postcode}
//                         name="Username"
//                         id="Username"
//                       />
//                       <span className="text-sm text-red-500 font-bold ">
//                         {' '}
//                         {error.postcode}{' '}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="Username"
//                       >
//                         Contact
//                       </label>
//                       <input
//                         className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                         type="text"
//                         onChange={(e) => setContact(e.target.value)}
//                         value={contact}
//                         name="phoneNumber"
//                         id="phoneNumber"
//                       />
//                       <span className="text-sm text-red-500 font-bold ">
//                         {error.contact}
//                       </span>
//                     </div>
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="Username"
//                       >
//                         DOB
//                       </label>
//                       <input
//                         className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                         type="date"
//                         onChange={(e) => setDOB(e.target.value)}
//                         value={dob}
//                         name="dob"
//                         id="dob"
//                         max={getMaxDate()}
//                       />
//                       <span className="text-sm text-red-500 font-bold ">
//                         {error.dob}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="Username"
//                       >
//                         Nationality
//                       </label>
//                       <input
//                         className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                         type="text"
//                         name="nationality"
//                         onChange={(e) => setNationality(e.target.value)}
//                         value={nationality}
//                         id="nationality"
//                       />
//                       <span className="text-sm text-red-500 font-bold ">
//                         {error.nationality}
//                       </span>
//                     </div>
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="Username"
//                       >
//                         Gender
//                       </label>
//                       <select
//                         value={gender}
//                         onChange={(e) => setGender(e.target.value)}
//                         className='className=" w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"'
//                       >
//                         <option value="male"> Male </option>
//                         <option value="female"> Female </option>
//                       </select>

//                       {/* <input
//                         className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                         type="text"
//                         name="Username"
//                         id="Username"
//                       /> */}
//                     </div>
//                   </div>

//                   <div className="flex justify-end gap-4.5">
//                     <button
//                       type="button"
//                       onClick={() => setError({})}
//                       className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
//                     >
//                       Clear
//                     </button>
//                     <button
//                       className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
//                       type="submit"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
//                       type="submit"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-span-5 xl:col-span-2">
//               <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                 <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
//                   <h3 className="font-medium text-black dark:text-white">
//                     Your Photo
//                   </h3>
//                 </div>
//                 <div className="p-7">
//                   <div className="mb-4 flex items-center gap-3">
//                     <div className="h-14 w-14 rounded-full">
//                       {photoPreview ? (
//                         <img src={photoPreview} alt="User" />
//                       ) : (
//                         <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
//                       )}
//                     </div>
//                     <div>
//                       <span className="mb-1.5 text-black dark:text-white">
//                         Edit your photo
//                       </span>
//                       <span className="flex gap-2.5">
//                         <button className="text-sm hover:text-primary">
//                           Delete
//                         </button>
//                         <button className="text-sm hover:text-primary">
//                           Update
//                         </button>
//                       </span>
//                     </div>
//                   </div>

//                   <div
//                     id="FileUpload"
//                     className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
//                   >
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
//                       onChange={handleFileChange} // Use the updated handleFileChange here
//                     />
//                     <div className="flex flex-col items-center justify-center space-y-3">
//                       <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
//                         <FontAwesomeIcon icon={faImage} />
//                       </span>
//                       <p>
//                         <span className="text-primary">Click to upload</span> or
//                         drag and drop
//                       </p>
//                       <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
//                       <p>(max, 800 X 800px)</p>
//                     </div>
//                   </div>

//                   <div className="flex justify-end gap-4.5">
//                     <button
//                       className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
//                       type="submit"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
//                       type="submit"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default StockAdd;