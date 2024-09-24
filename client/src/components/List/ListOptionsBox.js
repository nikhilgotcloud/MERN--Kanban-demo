import { motion } from 'framer-motion';
import useClickOutside from '../../hooks/useClickOutside';
import CloseIcon from '../icons/CloseIcon';
import { useRef } from 'react';



const ListOptionsBox = ({
  toggleOptionsBox,
  handleListDelete,
  listData,
}) => {
  const boxRef = useRef(null);

  useClickOutside(boxRef, toggleOptionsBox);

  const {  _id } = listData;

 

  return (
    <motion.div
      key={listData._id}
      transition={{ duration: 0.1 }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      ref={boxRef}
      className='absolute z-50 top-1 flex items-center flex-col bg-white py-3 px-4 shadow-xl w-72 rounded-md'
    >
      <div className='flex justify-center items-center w-full flex-row relative'>
        
        <button
          type='button'
          onClick={() => toggleOptionsBox()}
          className='flex items-center text-gray-400 hover:text-gray-700
          transition-colors duration-100 absolute right-0'
        >
          <CloseIcon className='text-2xl' />
        </button>
      </div>
      
      <div className='w-full mb-1'>
        
        
      </div>
      <button
        type='button'
        onClick={() => handleListDelete(_id)}
        className='text-left w-full font-medium text-gray-500 bg-gray-200 bg-opacity-40 hover:bg-opacity-90
         px-2.5 py-1.5 transition-colors duration-150 rounded-md'
      >
        Delete tab
      </button>
    </motion.div>
  );
};

export default ListOptionsBox;
