import React, { useState } from 'react'
import { FaHandPointDown } from "react-icons/fa";
import { BASE_URL } from '../constant/url';
import toast from 'react-hot-toast';

const Reports = () => {

  const [url,setUrl] = useState('');
  const [category,setCategory] = useState('');

  async function handleReportSubmit(e){
    e.preventDefault();

    if(!url && !category) return

     try{

        let aliasExtract = url ? url.split('/') : ''
        let alias = aliasExtract[aliasExtract.length-1]

      let endPoint = url ? `${BASE_URL}/api/analytics/${alias}` : `${BASE_URL}/api/analytics/topic/${category}`

      const getUrlData = await fetch(endPoint,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'authorization' : localStorage.getItem('authTokenJWT')
        }
      });
   
     

      const data = await getUrlData.json();
    
      if(!getUrlData.ok){
         toast.error(data.error)
        throw new Error(data.error)

      } 

    const convertStr = JSON.stringify(data)
    const blob = new Blob([convertStr], { type: "text/plain" });
    const urLink = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = urLink;
    link.download = `${url ? 'urlreport' : 'categoryreport'}${Date.now()}.txt`; 
    link.click();

    URL.revokeObjectURL(urLink);
    toast.success('Reports downloaded successfully')

     }catch(err){
           console.log(err)
           
     }
      
  }

  async function handleOverAllReports(){
       try{

            let getOverAllData = await fetch(`${BASE_URL}/api/analytics/overall`,{
              method: 'GET',
              headers:{
                'authorization': localStorage.getItem('authTokenJWT')
              }
            });
            let parseGottenData = await getOverAllData.json();
        
            if(!getOverAllData.ok){
               toast.error(parseGottenData.error)
               throw new Error(parseGottenData.error)
            }
          
            let stringifyData = JSON.stringify(parseGottenData);
             
            const blob = new Blob([stringifyData], { type: "text/plain" });
            const urLink = URL.createObjectURL(blob);
        
            const link = document.createElement("a");
            link.href = urLink;
            link.download = `overallReport${Date.now()}.txt`; 
            link.click();
        
            URL.revokeObjectURL(urLink);

            toast.success('Reports downloaded successfully')

       }catch(err){
           console.log(err)
       }
  }

  function handleUrlChange(e){
       setUrl(e.target.value)
  }
  function handleCategoryChange(e){
    setCategory(e.target.value)
}

  return (
    <div className="lg:w-3/5 w-full bg-gray-900 p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-green-400">Reports</h1>
        <form className="space-y-6" onSubmit={handleReportSubmit}>
  
          <div>
            <label htmlFor="reportUrl" className="block text-lg font-medium mb-2">
              URL to Get Report
            </label>
            <input
              name='url-report'
              type="text"
              value={url}
              disabled={category ? true : false}
              onChange={handleUrlChange}
              id="reportUrl"
              placeholder="Enter the URL"
              className="w-full p-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

         <h3>OR</h3>

          <div className="mt-8">
          <label htmlFor="reportCategory" className="block text-lg font-medium mb-2">
            Select Category
          </label>
          <select
          disabled={url ? true : false}
          name='category-report'
          value={category}
          onChange={handleCategoryChange}
            id="reportCategory"
            className="w-full p-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a category</option>
            <option value="business">Business</option>
            <option value="personal">Personal</option>
            <option value="campaign">Campaign</option>
            <option value="others">Others</option>
          </select>
        </div>

     
          <button
            type="submit"
            className="w-full p-4 bg-green-500 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Get Reports
          </button>

          <h2 className='text-2xl inline-flex items-center'>Get your overall URL reports here &nbsp; <span><FaHandPointDown /> </span></h2>
        </form>

        <button
            type="button"
            onClick={handleOverAllReports}
            className="w-full mt-4 p-4 bg-red-500 rounded-md text-lg font-semibold hover:bg-red-600 transition duration-300"
          >
            overall Reports
          </button>
        
      </div>
  )
}

export default Reports