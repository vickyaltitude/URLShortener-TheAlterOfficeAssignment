import React from 'react'
import { GoogleLogin } from 'react-google-login'




const GoogleLoginBtn = () => {


    const GOOGLE_CLIENT = '990619662195-k3gn3of3uaguc3rvelnuajp06hd4nk8s.apps.googleusercontent.com';
  
  
    const onSuccess = (response) => {
        console.log("Login Success:", response);
       
    }

    const onFailure = (response) => {
        
    }

    return (
        <div className="flex justify-center items-center p-4">
            <GoogleLogin
                clientId={GOOGLE_CLIENT}
                buttonText="One Click Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
               
            />
        </div>
    );
}

export default GoogleLoginBtn;
