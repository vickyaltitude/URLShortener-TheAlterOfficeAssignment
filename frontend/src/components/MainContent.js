import React from 'react';
import UrlShorten from './UrlShorten';
import Reports from './Reports';

const MainContent = () => {



  return (
    <div className="flex flex-col lg:flex-row gap-10 p-6 bg-black text-white min-h-screen justify-center max-w-none">

      <UrlShorten />
      <Reports />
     
    </div>
  );
};

export default MainContent;
