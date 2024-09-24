import { useContext } from 'react';import { AuthContext } from '../config/Auth';


const NotFound = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <h1 className=" font-semibold text-4xl mb-2">Page not found</h1>
     
    );
  }

  return (
    <h1 className=' font-semibold text-4xl mb-2'>Page not found</h1>
    
  );
};

export default NotFound;
