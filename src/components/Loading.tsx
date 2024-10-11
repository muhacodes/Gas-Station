import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {};

function Loading({}: Props) {
  return (
    <div className="absolute z-99  top-0 left-0 w-full h-full   flex justify-center items-center">
        <FontAwesomeIcon  icon={faSpinner} className='text-5xl  text-slate-700 dark:text-slate-200 ' spin={true} />
      {/* <div className="border-4 border-gray-200 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div> */}
    </div>
  );
}

export default Loading;
