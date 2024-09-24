const CreateBoardCTA = ({ onClick }) => {
  return (
    <div className='whitespace-nowrap pb-16 md:pl-24 mx-4 lg:mr-0'>
      <div className='flex flex-col leading-relaxed text-center'>
        <button
          onClick={() => onClick(true)}
          className='flex items-center justify-center rounded-md text-2xl bg-red-600 text-white
          shadow px-6 py-3 mb-2 bg-opacity-90 hover:bg-opacity-100 hover:shadow-md
          transition-all duration-300'
        >
          
          Create new board for project
        </button>
        
      </div>
    </div>
  );
};

export default CreateBoardCTA;
