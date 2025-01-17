import React from 'react'

import { useQueryClient} from '@tanstack/react-query';
import { GoogleLogin } from '@react-oauth/google';
import { BASE_URL } from '../../constant/url';


const GoogleLoginBtn = () => {

    
    const queryClient = useQueryClient();
    

    const onSuccess = async (response) => {

       
        const tokenId = response.credential;

        try {
          
          const res = await fetch(`${BASE_URL}/api/auth/google/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idToken:tokenId})
          });
    
          const data = await res.json();
      
          if (!res.ok) {
              throw new Error(data.error || "Something went wrong");
          }
          
          localStorage.setItem('authTokenJWT',data.jwtToken)
          queryClient.invalidateQueries({queryKey:['authUser']})
    
        } catch (err) {
          console.error('Error verifying token with backend:', err);
        }
       
    }
    
    const onError = (response) => {
        console.error('google auth failed:', response);
       
    }

   

    return (
        <div className="flex justify-center items-center p-4">
        <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            useOneTap 
        />
    </div>
    );
}

export default GoogleLoginBtn;
