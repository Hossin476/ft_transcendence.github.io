import React from 'react';

function Winner({ className }) {
    return (
        <div className={`${className} flex flex-col items-center justify-center h-full w-full`}>
            <div className="relative grid place-items-center w-full h-full">
                <img 
                    src="/winner.png" 
                    alt="Winner Badge" 
                    className="xsm:-18 xsm:h-18 sm:w-22 sm:h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 col-start-1 row-start-1"
                />
                <img 
                    src="lshail.jpeg" 
                    alt="Avatar" 
                    className="rounded-full xsm:w-16 xsm:h-16 sm:w-20 sm:h-20 md:w-16 md:h-16 lg:w-22 lg:h-22 xl:w-[5rem] xl:h-[5rem] col-start-1 row-start-1"
                />
            </div>
            <p className="text-center text-white text-sm md:text-md lg:text-xl mb-4">Username</p>
        </div>
    );
}

export default Winner;
