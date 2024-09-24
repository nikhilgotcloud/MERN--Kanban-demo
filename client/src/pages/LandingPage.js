import ObjectId from "bson-objectid";
import { useContext, useState } from "react";
import {  Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import MiniLoader from "../components/MiniLoader";
import { AuthContext } from "../config/Auth";
import api from "../config/axiosConfig";
import { createUserHomeUrl } from "../utils/string";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser, isLoading: pendingUser } = useContext(AuthContext);

  const handleGuestLogin = async () => {
    setIsLoading(true);

    try {
      const { data } = await api.post("auth/login/guest", {
        email: `guest-${ObjectId()}@mail.com`,
        password: "123456781",
      });

      if (!data) {
        setIsLoading(false);
        
        return;
      }

      if (data.username) {
        setIsLoading(false);
        setUser(() => data);
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  if (pendingUser) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to={createUserHomeUrl(user.username)} />;
  }

  return (
    <div>
      <div className="bg-main w-full h-full -z-10 fixed top-0"></div>
      

      
          <div className="mt-8 mb-2 flex items-center text-center text-xl">
            <button
              onClick={() => handleGuestLogin()}
              aria-label="Continue as a guest user button"
              className="bg-red-600 text-white py-3 px-8 shadow-xl font-medium rounded-md
              hover:bg-red-700 hover:shadow-xl transition-all duration-150 w-full h-14 lg:w-1/2 whitespace-nowrap"
            >
              {isLoading ? <MiniLoader /> : <span>Check My kanbanboard</span>}
            </button>
          </div>
    </div>
  );
};

export default LandingPage;
