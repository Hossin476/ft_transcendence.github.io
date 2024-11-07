import React from 'react'
import { Link } from 'react-router-dom'

const MailSent = () => {

	return (
		<div>
			<div className="bg-secondaryColor min-h-screen flex items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-2xl shadow-thirdColor w-full max-w-md">
					<h2 className="text-2xl font-bold text-black mb-6">Check your mail Box !</h2>
					<p className="text-black px-3 ">We have sent a password reset link to your email address. Please check your email and click on the link to reset your password.</p>
					<Link to="/login" className="text-thirdColor mt-4 block text-center hover:text-primaryColor">Back to login</Link>
				</div>
			</div>
		</div>
	)
}

export default MailSent
