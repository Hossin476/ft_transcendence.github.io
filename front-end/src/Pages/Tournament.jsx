// import React from 'react';
import '../tournament.css'

import User from '../Components/Tournament/User';

function Tournament() {
  return (
    <div className='container_tournament flex flex-col w-11/12 mx-auto h-11/12 lg:my-auto md:my-auto sm:my-auto py-auto'>
      <h1 className='text-4xl bg-slate-800 text-center top_title'>PING PONG</h1>
      <h3 className='text-white text-md bg-slate-800 text-center down_title'>TOURNAMENT</h3>
      <div className='grid tor_cont w-full h-2/4 my-auto'>
        <div className="first_half w-full h-full justify-center flex">
          <div className="inner_container border-2 h-2/4 relative w-2/4 ">
            <User className={"rounded-lg text-center absolute top-2/4"} />
            <User className={"rounded-lg text-center absolute"} />
            <User className={"  rounded-lg text-center absolute"} />
          </div>
        </div>
        <div className="middle_half  relative flex justify-center">
          <User className={"winner_container absolute  top-2/4 rounded-lg text-center"} />
        </div>
        <div className="last_half  relative border-2">
          <User className={" rounded-lg text-center absolute right-0"} />
          <User className={"rounded-lg text-center absolute right-0 bottom-0"} />
          <User className={"rounded-lg text-center absolute top-2/4"} />
        </div>
      </div>
    </div>
  );
}

export default Tournament;
