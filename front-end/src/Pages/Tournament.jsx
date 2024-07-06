import React from 'react';
import '../tournament.css'

function Tournament() {
  return (
    <div className=' container_all max-w-7xl mx-auto'>
      <h1 className='text-4xl bg-slate-800 text-center top_title'>PING PONG</h1>
      <h3 className='text-white text-md bg-slate-800 text-center down_title'>TOURNAMENT</h3>
      <div className='grid grid-cols-5 grid-rows-5 gap-4 justify-items-center relative mt-32'>
        <div className="rounded bg-white line_1"></div>
        <div className="rounded bg-white absolute line_2"></div>
        <div className='corner_1'></div>
        <div className='corner_2'></div>
        <div className='corner_3'></div>
        <div className='corner_4'></div>
        <div className="col-start-1 row-start-1 relative p-10 rounded-lg text-center">
          <div className="img_container bg-white w-32">
            <img src="lshail.jpeg" alt="Avatar" className=" mx-auto rounded-full" />
          </div>
          <p className="text-white relative top-1 text-xl">Username 1</p>
        </div>
        <div className="col-start-1 row-start-3  p-10 rounded-lg text-center">
          <div className="img_container w-32">
            <img src="lshail.jpeg" alt="Avatar" className=" mx-auto rounded-full" />
          </div>
          <p className="text-white relative top-1 text-xl">Username 2</p>
        </div>
        <div className="col-start-5 row-start-1 p-10  rounded-lg text-center">
          <div className="img_container w-32">
            <img src="lshail.jpeg" alt="Avatar" className=" mx-auto rounded-full" />
          </div>
          <p className="text-white relative top-1 text-xl">Username 3</p>
        </div>
        <div className="col-start-5 row-start-3 p-10  rounded-lg text-center">
          <div className="img_container w-32">
            <img src="lshail.jpeg" alt="Avatar" className=" mx-auto rounded-full" />
          </div>
          <p className="text-white relative top-1 text-xl">Username 4</p>
        </div>
        <div className="col-start-2  row-start-2 p-10 rounded-lg text-center mr-36">
          <div className="img_container w-32 ">
            <img src="lshail.jpeg" alt="Avatar" className=" mx-auto rounded-full" />
          </div>
          <p className="text-white relative top-1 text-xl">Username 5</p>
        </div>
        <div className="col-start-4 row-start-2 p-10 rounded-lg text-center ml-36">
          <div className="img_container w-32">
            <img src="lshail.jpeg" alt="Avatar" className=" mx-auto rounded-full" />
          </div>
          <p className="text-white relative top-1 text-xl">Username 6</p>
        </div>
        <div className="winner_container col-start-3 row-start-2  p-10 rounded-lg text-center">
          {/* <img src="winner.png" alt="winner" className='winner' /> */}
          <div className="img_container w-32">
            <img src="lshail.jpeg" alt="Avatar" className=" mx-auto rounded-full" />
          </div>
          <p className="text-white relative top-1 text-xl">Winner</p>
        </div>
        <div className="bg-white w-28 h-1 rounded absolute line_3"></div>
        <div className="bg-white w-28 h-1 rounded absolute line_4"></div>
      </div>
    </div>
  );
}

export default Tournament;
