import React from 'react'

function User({ className }) {
    return (
        <div className={`${className}`}>
            <div className="img_container w-14 h-14 mx-auto">
                <img src="lshail.jpeg" alt="Avatar" className="rounded-full" />
            </div>
            <p className="text-white relative top-1 md:text-md lg:text-xl sm:text-sm">Username</p>
        </div>
    )
}

export default User