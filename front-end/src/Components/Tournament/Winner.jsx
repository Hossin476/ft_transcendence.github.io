import React from 'react'

function Winner({ className }) {
    return (
        <div className={`${className} flex flex-col items-center h-full`}>
            <div className="img_container w-3/4 h-4/6 mx-auto mt-auto">
                <img src="lshail.jpeg" alt="Avatar" className="rounded-full mt-auto" />
            </div>
            <p className="text-white md:text-md lg:text-xl sm:text-sm mt-auto">Username</p>
        </div>
    )
}

export default Winner
