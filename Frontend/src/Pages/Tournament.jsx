import React from 'react';
import '../tournament.css';

import User from '../Components/Tournament/User';
import Winner from '../Components/Tournament/Winner';
import Header from '../Components/Tournament/Header';
import Challenge from '../Components/Tournament/Challenge';

function Tournament() {
  return (
    <div className="container_tournament bg-primaryColor w-full grid grid-rows-1 justify-items-center items-center">
      <div className="flex justify-center items-center w-11/12 h-full">
        {/* < Challenge /> */}
        <div className='border border-forthColor lg:w-11/12 md:w-11/12 w-full text-white flex flex-col items-center h-[70%] bg-linkBgColor rounded-3xl'>
          <Header />
          <div className="w-full max-h-[500px] grid items-center justify-items-center h-2/4 tor_cont px-10 my-auto">
            <div className="first_container w-[40%] max-w-[200px] h-[90%] border  lg:border-8 relative">
              <User className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 bg-linkBgColor top-[-3.5rem] sm:top-[-4.5rem] left-[-3.5rem] sm:left-[-4.5rem] absolute text-center grid place-content-center" />
              <User className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 bg-linkBgColor absolute bottom-[-3.5rem] sm:bottom-[-4.5rem] left-[-3.5rem] sm:left-[-4.5rem] text-center grid place-content-center" />
              <User className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 bg-red-400 absolute top-[50%] translate-y-[-50%] right-[-3.5rem] sm:right-[-3.5rem] text-center grid place-content-center" />
            </div>
            <div className="winner_container border-2 border-yellow-400 rounded-3xl w-[100%] max-w-[200px] h-[90%]   relative flex">
              <Winner className="z-10 " />
            </div>
            <div className="second_container w-[40%] max-w-[200px] h-[90%] border  lg:border-8 relative">
              <User className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 bg-linkBgColor absolute right-[-3.5rem] sm:right-[-4.5rem] top-[-3.5rem] sm:top-[-4.5rem] text-center grid place-content-center" />
              <User className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 bg-linkBgColor absolute bottom-[-3.5rem] sm:bottom-[-4.5rem] right-[-3.5rem] sm:right-[-4.5rem] text-center grid place-content-center" />
              <User className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 bg-red-400 absolute top-[50%] left-[-3.5rem] sm:left-[-3.5rem] translate-y-[-50%] text-center grid place-content-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tournament;

