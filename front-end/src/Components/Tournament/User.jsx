import React from 'react'

function User({ className }) {
    return (
        <div className={`${className}`}>
            <div className="img_container w-3/5 h-3/5 mx-auto my-auto">
                <img src="lshail.jpeg" alt="Avatar" className="rounded-full" />
            </div>
            <p className="text-white relative md:text-md lg:text-xl sm:text-sm">Username</p>
        </div>
    )
}

export default User