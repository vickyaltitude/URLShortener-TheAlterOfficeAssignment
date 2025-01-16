import React from 'react'

const Reports = () => {
  return (
    <div className="lg:w-3/5 w-full bg-gray-900 p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-green-400">Reports</h1>
        <form className="space-y-6">
  
          <div>
            <label htmlFor="reportUrl" className="block text-lg font-medium mb-2">
              URL to Get Report
            </label>
            <input
              type="text"
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
            id="reportCategory"
            className="w-full p-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>

     
          <button
            type="button"
            className="w-full p-4 bg-green-500 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Get Reports
          </button>
        </form>

     
 
      </div>
  )
}

export default Reports