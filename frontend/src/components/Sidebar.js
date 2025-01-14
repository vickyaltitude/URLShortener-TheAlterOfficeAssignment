import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-base-200 flex flex-col justify-between p-4">
      <div>
        <h2 className="text-xl font-bold text-center mb-6">URL Shortener</h2>
        <ul className="space-y-4">
          <Link    className="flex items-center px-4 py-2 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          >
              Home 
          </Link>
          <Link className="flex items-center px-4 py-2 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors">
              URL Reports
          </Link>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">User Name</span>
        </div>
        <button className="btn btn-error btn-outline w-full">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
