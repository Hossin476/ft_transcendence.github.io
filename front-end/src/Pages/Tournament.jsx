// import React from 'react';
import '../tournament.css'

import User from '../Components/Tournament/User';
import Winner from '../Components/Tournament/Winner';
import Header from '../Components/Tournament/Header';
import Challenge from '../Components/Tournament/Challenge';

function Tournament() {
  return (
    <div className='grid all_cont  w-[80%] h-[100%]'>
      <div className="container_tournament flex flex-col w-11/12 mx-auto h-11/12 my-auto px-auto">
        < Header />
        <div className=" w-full mx-auto grid justify-center h-2/4 my-auto tor_cont px-10">
          <div className="first_container w-3/5 h-full border-8 relative mx-auto">
            <User className={"h-36 w-36 bg-secondaryColor top-[-4.5rem] left-[-4.5rem] absolute text-center  grid  place-content-center"} />
            <User className={"h-36 w-36 bg-secondaryColor absolute bottom-[-4.5rem] left-[-4.5rem] text-center grid  place-content-center"} />
            <User className={"h-36 w-36 absolute top-[50%] translate-y-[-50%] right-[-4.5rem] text-center grid  place-content-center"} />
          </div>
          <div className="winner_container my-auto border-2 border-yellow-400 rounded-3xl h-2/4 w-full relative flex justify-center mx-auto">
            <img src="/winner.png" alt="winner padge " className='absolute top-[50%] z-0 left-[50%] translate-x-[-50%] translate-y-[-50%]' />
            <Winner className={'z-10'} />
          </div>
          <div className="second_container w-3/5 h-full border-8 relative mx-auto">
            <User className={"h-36 w-36 bg-secondaryColor absolute right-[-4.5rem] top-[-4.5rem] text-center grid  place-content-center"} />
            <User className={"h-36 w-36 bg-secondaryColor absolute bottom-[-4.5rem] right-[-4.5rem] text-center grid  place-content-center"} />
            <User className={"h-36 w-36 bg-secondaryColor absolute top-[50%] left-[-4.5rem] translate-y-[-50%] text-center grid  place-content-center"} />
          </div>
        </div>
      </div>
        < Challenge />
    </div>

  );
}

export default Tournament;
