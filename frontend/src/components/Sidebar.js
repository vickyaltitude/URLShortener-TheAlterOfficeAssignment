import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginBtn from './UI/GoogleLoginBtn';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from './UI/LoadingSpinner';

const Sidebar = () => {

  const { data: authUser,isLoading,isError } = useQuery({ queryKey: ["authUser"] });
   const queryClient = useQueryClient();
  function handleLogout(){
     localStorage.removeItem('authTokenJWT')
     queryClient.invalidateQueries({queryKey:['authUser']})
  }
 
  return (
    <div className="w-64 bg-base-200 flex flex-col justify-between p-4">
      
      <div>
        <h2 className="text-xl font-bold text-center mb-6">URL Shortener</h2>
        <ul className="space-y-4">
          <Link to='/'   className="flex items-center px-4 py-2 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          >
              Home 
          </Link>
      
        </ul>
      </div>

      <div className="space-y-4">
        {isLoading && <LoadingSpinner /> }
        {authUser && !isError && !isLoading && <><div className="flex items-center space-x-4">
          <img
            src={authUser.picture}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">{authUser.userName}</span>
        </div>
      
        
        <button className="btn btn-error btn-outline w-full" onClick={handleLogout}>Logout</button></>}
      
        {!authUser && !isLoading && <GoogleLoginBtn />}
      </div>
    </div>
  );
};

export default Sidebar;
