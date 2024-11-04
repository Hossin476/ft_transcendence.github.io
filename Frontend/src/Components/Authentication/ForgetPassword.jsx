import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {

	const [email, setEmail] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()
	const handleChange = (e) => {
		setEmail(e.target.value)
		if (errorMessage != "")
			setErrorMessage("")
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!email){
			setErrorMessage("Please enter your registration email")
			return
		}
		else{
			const res = await fetch("/api/auth/password-reset/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email })
			})
			if (res.status === 200){
				navigate("/mail-sent")
			}
			setEmail("")
		}
	}
	
	return (
    	<div className="bg-secondaryColor min-h-screen flex items-center justify-center">
    		<div className="bg-white p-8 rounded-lg shadow-2xl shadow-thirdColor w-full max-w-md">
    	    	<h2 className="text-2xl font-bold text-black mb-6">Reset your Password</h2>
				<p className="text-red-500 px-3 font-bold">{errorMessage ? errorMessage : ""}</p>
    	    	<form onSubmit={handleSubmit}>
    	      		<div className="space-y-4">
    	        		<div>
    	        	  		<label htmlFor="email" className="block text-sm font-medium text-black mb-1"></label>
    	        	  		<input
    	        	    		type="email"
    	        	    		name="email"
    	        	    		value={email}
    	        	    		onChange={handleChange}
    	        	    		placeholder="Type your registration email"
    	        	    		className="bg-white text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    	        	  		/>
    	        		</div>
    	        		<input
    	        	  		type="submit"
    	        	  		value="submit"
    	        	  		className="w-full bg-secondaryColor text-white py-2 rounded-lg hover:bg-thirdColor transition duration-300"
    	        		/>
    	      		</div>
    	    	</form>
    	  	</div>
		</div>
  	);
};

export default ForgetPassword
