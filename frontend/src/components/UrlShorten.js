import React,{useRef, useState} from 'react'
import { BASE_URL } from '../constant/url';
import {toast} from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const UrlShorten = () => {

    const longUrlRef = useRef();
    const customAliasRef = useRef();
    const categoryRef = useRef();
    const [shortenedUrl,setShortenedUrl] = useState(null)
    
    const { mutate: shortUrl, isPending: isShortening } = useMutation({

        mutationFn: async (data) => {

            const {longUrl,customAlias,category} = data;

          try {
            const res = await fetch(`${BASE_URL}/api/shorten`, {
              method: "POST",
              headers:{
                'Content-Type' : 'application/json',
                'authorization' : localStorage.getItem('authTokenJWT')
              },
              body: JSON.stringify({longUrl,customAlias,category})
            });
            const data = await res.json();
           console.log(data)
            if (!res.ok) {
                toast.error(data.error)
              throw new Error(data || "Something went wrong");
             
            }
            return data;
          } catch (error) {
            console.log(error)
            throw new Error(error);
          }
        },
        onSuccess: (data) => {
            setShortenedUrl(data.shortUrl)
          toast.success("Your URL has been shrink successfully");
         
        },  
        
      });


      function handleUrlSubmit(e){

        e.preventDefault();

        const longUrl = longUrlRef.current.value;
        const customAlias = customAliasRef.current.value;
        const category = categoryRef.current.value;
        console.log(longUrl,customAlias,category)
        shortUrl({longUrl,customAlias,category})

      }

      function handleCopy(e){
        e.preventDefault()
        navigator.clipboard.writeText(shortenedUrl)
        .then(() => {
          toast.success('URL copied successfully')
        })
        .catch((err) => {
            console.log(err)
            toast.error('Failed to copy URL')
      
        });
      }

  return (
    <div className="lg:w-3/5 w-full bg-gray-900 p-12 rounded-xl shadow-lg">
    <h1 className="text-4xl font-bold mb-8 text-blue-400">URL Shortener</h1>
    <form className="space-y-6" onSubmit={handleUrlSubmit}>

      <div>
        <label htmlFor="longUrl" className="block text-lg font-medium mb-2">
          Long URL
        </label>
        <input
          type="text"
          id="longUrl"
          ref={longUrlRef}
          placeholder="Enter the long URL"
          className="w-full p-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

 
      <div>
        <label htmlFor="customAlias" className="block text-lg font-medium mb-2">
          Custom Alias <span className='text-warning'>(Strictly 5 to 10 Characters)</span>
        </label>
        <input
          type="text"
          id="customAlias"
          ref={customAliasRef}
          placeholder="Enter custom alias (optional)"
          className="w-full p-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

  
      <div>
        <label htmlFor="category" className="block text-lg font-medium mb-2">
          Category
        </label>
        <select
          id="category"
          ref={categoryRef}
          className="w-full p-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="business">Business</option>
          <option value="personal">Personal</option>
          <option value="campaign">Campaign</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="flex items-center space-x-4">
              <p className="text-lg text-white">{shortenedUrl}</p>
              <button
                onClick={handleCopy}
                disabled= {shortenedUrl ? false : true}
                className="p-2 bg-green-500 rounded-md text-white hover:bg-green-600"
                type='button'
              >
                Copy
              </button>

      </div>
      <button
        type="submit"
        className="w-full p-4 bg-blue-500 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300"
      >
        Shorten URL
      </button>
    </form>
  </div>
  )
}

export default UrlShorten