import React, {ReactNode} from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode; 
  size?: 'small' | 'medium' | 'large' | 'xlarge' // Optional prop with default size options
  height? : string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, height = '', size = 'medium', children }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-xs',
    medium: 'max-w-md',
    large: 'max-w-lg',
    xlarge : 'max-w-5xl'
  };

  // Use the sizeClasses mapping to select the appropriate class based on the size prop
  const modalSizeClass = sizeClasses[size];

  return (
    <div className="fixed  inset-0 z-40 bg-black bg-opacity-70 flex justify-center items-center">
      <div className={`relative bg-white dark:bg-boxdark ${modalSizeClass} ${height} overflow-auto   w-full mx-auto  m-auto flex-col flex rounded-lg shadow-lg`}>
        <div className="flex  py-4 px-4 justify-between items-center pb-3">
          <p className="text-2xl mx-auto text-center font-bold">{title}</p>
          <div className="cursor-pointer" onClick={onClose}>
            {/* Close Icon */}
            <svg className="fill-current dark:text-white text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M16.2002 0L9.0002 7.2L1.8002 0L0.000195312 1.8L7.2002 9L0.000195312 16.2L1.8002 18L9.0002 10.8L16.2002 18L18.0002 16.2L10.8002 9L18.0002 1.8L16.2002 0Z"/>
            </svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
