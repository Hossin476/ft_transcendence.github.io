import React from 'react'
import { useNavigate } from 'react-router-dom';

function Draw() {
    const navigate = useNavigate();
    return (
        <div className={`w-[101%] h-[101%] top-0 -mt-1 backdrop-blur-md  absolute border-yellow-600 border-[3px] flex flex-col items-center justify-evenly z-10 gap-6 rounded-[20px]`}>
            <div className="relative flex flex-col justify-center items-center">
                <p className={`font-Plaguard xsm:text-[7vw] lg:text-6xl text-yellow-500`}>
                    The Match Is A Draw!
                </p>
            </div>
                <div className="flex justify-evenly w-[100%]">
                    <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border-[2px] w-[15%] rounded-lg border-thirdColor p-2" onClick={() => navigate('/')} >HOME</button>
                    <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border-[2px] w-[15%] rounded-lg border-thirdColor p-2" onClick={() => navigate('/game')}>Play again</button>
                </div>
        </div>
    )
}

export default Draw;