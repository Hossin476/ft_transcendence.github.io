// import React from 'react';
import '../tournament.css'

function Tournament() {
  return (
    <div className='container_all flex flex-col justify-items-center max-w-5xl'>
        <h1 className='text-4xl bg-slate-800 text-center top_title'>PING PONG</h1>
        <h3 className='text-white text-md bg-slate-800 text-center down_title'>TOURNAMENT</h3>
      <div className='grid grid-cols-5 grid-rows-5 gap-4 tor_cont my-auto sm:mx-5 lg:mx-20 md-mx-10'>
        {/* <div className="rounded bg-white line_1"></div>
        <div className="rounded bg-white absolute line_2"></div> */}
        {/* <div className='corner_1'></div>
        <div className='corner_2'></div>
        <div className='corner_3'></div>
        <div className='corner_4'></div> */}
        <div className=" relative rounded-lg text-center col-start-1 row-start-2">
          <div className="img_container w-14 h-14 mx-auto">
            <img src="lshail.jpeg" alt="Avatar" className="rounded-full" />
          </div>
          <p className="text-white relative md:text-md lg:text-xl sm:text-sm">Username1</p>
        </div>
        <div className="col-start-1 row-start-4 rounded-lg text-center">
          <div className="img_container w-14 h-14 mx-auto">
            <img src="lshail.jpeg" alt="Avatar" className="rounded-full" />
          </div>
          <p className="text-white relative top-1 md:text-md lg:text-xl sm:text-sm">Username</p>
        </div>
        <div className="col-start-5 row-start-2  rounded-lg text-center">
          <div className="img_container w-14 h-14 mx-auto">
            <img src="lshail.jpeg" alt="Avatar" className="rounded-full" />
          </div>
          <p className="text-white relative top-1 md:text-md lg:text-xl sm:text-sm">Username</p>
        </div>
        <div className="col-start-5 row-start-4  rounded-lg text-center">
          <div className="img_container w-14 h-14 mx-auto">
            <img src="lshail.jpeg" alt="Avatar" className="rounded-full" />
          </div>
          <p className="text-white relative top-1 md:text-md lg:text-xl sm:text-sm">Username</p>
        </div>
        <div className="col-start-2 row-start-3 rounded-lg text-center">
          <div className="img_container w-14 h-14 mx-auto">
            <img src="lshail.jpeg" alt="Avatar" className="rounded-full" />
          </div>
          <p className="text-white relative top-1 md:text-md lg:text-xl sm:text-sm">Username</p>
        </div>
        <div className="col-start-4 row-start-3 rounded-lg text-center">
          <div className="img_container w-14 h-14 mx-auto">
            <img src="lshail.jpeg" alt="Avatar" className=" rounded-full" />
          </div>
          <p className="text-white relative top-1 md:text-md lg:text-xl sm:text-sm">Username</p>
        </div>
        <div className="winner_container col-start-3 row-start-3 rounded-lg text-center">
          {/* <img src="winner.png" alt="winner" className='winner' /> */}
          <div className="img_container mx-auto w-14 h-14">
            <img src="lshail.jpeg" alt="Avatar" className="rounded-full" />
          </div>
          <p className="text-white relative top-1 md:text-md lg:text-xl sm:text-sm">Winner</p>
        </div>
        {/* <div className="bg-white  rounded absolute line_3"></div>
        <div className="bg-white rounded absolute line_4"></div> */}
      </div>
    </div>
  );
}

export default Tournament;
