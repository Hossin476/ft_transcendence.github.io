import React from 'react'

function Winner({ className }) {
    return (
        <div className={`${className} flex flex-col items-center`}>
            <div className="img_container w-14 h-14">
                <img src="lshail.jpeg" alt="Avatar" className="rounded-full" />
            </div>
            <p className="text-white md:text-md lg:text-xl sm:text-sm">Username</p>
        </div>
    )
}

export default Winner
