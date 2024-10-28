import { faCircleNotch, faHourglass, faRedo, faSpinner, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {};

function Loading({}: Props) {
  return (
    <span className="absolute z-99  top-0 left-0 w-full h-full   flex justify-center items-center">
        <FontAwesomeIcon color='green'  icon={faCircleNotch} className='text-2xl  text-green-600 dark:text-green-800 ' spin={true} />
      {/* <div className="border-4 border-gray-200 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div> */}
    </span>
  );
}

export default Loading;
