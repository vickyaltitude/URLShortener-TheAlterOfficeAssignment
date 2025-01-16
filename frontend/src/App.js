import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constant/url";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";



function App() {

    let {data: authUser, isLoading} = useQuery({

      queryKey: ['authUser'],
      queryFn: async ()=> {

        if( !(localStorage.getItem('authTokenJWT')) ){
         
          return null

        }
       
        try{

          const res = await fetch(`${BASE_URL}/api/auth/google/getme`,{
            method: 'GET',
            headers:{
              'authorization' : localStorage.getItem('authTokenJWT') || null
            }
          })

          let receivedResp = await res.json()

          const data = receivedResp.userDetails || null;
        
          
          if(!res.ok){
            authUser = null
            throw new Error(data.error || "something went wrong")
          }

          return data

        }catch(err){
        
          throw err

        }

      }, 
      refetchOnWindowFocus: false, 
    })


  return (
    <div className="flex h-screen">
      <Sidebar />
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<MainContent />} />
      </Routes>
    </div>
    <Toaster />
  </div>
  );
}

export default App;
