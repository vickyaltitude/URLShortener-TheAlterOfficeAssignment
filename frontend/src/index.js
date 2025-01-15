import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT = '990619662195-k3gn3of3uaguc3rvelnuajp06hd4nk8s.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus : false
    }
  }
});
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>

   <GoogleOAuthProvider clientId={GOOGLE_CLIENT}>
   <App />
   </GoogleOAuthProvider>
 
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
