import React, { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-hot-toast'


const ResetPassword = () => {

	const navigate = useNavigate()
	const { uid, token } = useParams()
	const [errorMessage, setErrorMessage] = useState("")
	const [newPasswords, setNewPasswords] = useState({
		password: "",
		confirm_password: ""
	})

	const handleChange = (e) => {
		setNewPasswords({ ...newPasswords, [e.target.name]: e.target.value });
		if (errorMessage != "")
			setErrorMessage("")
	}

	const data = {
		'password': newPasswords.password,
		'confirm_password': newPasswords.confirm_password,
		'uidb64': uid,
		'token': token
	}

	const handleSubmit = async (e) => {

		e.preventDefault()
		if (!newPasswords.password || !newPasswords.confirm_password){
			setErrorMessage("both fields are required !")
			return
		}
		if (newPasswords.password !== newPasswords.confirm_password){
			setErrorMessage("passwords do not match !")
			return
		}
		const response = await fetch('/api/auth/set-new-password/',{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		const res = await response.json()
		if (response.status === 200){
			navigate('/login')
			toast.success(response.message)
		}
	}

	return (
    	<div className="bg-secondaryColor min-h-screen flex items-center justify-center">
    		<div className="bg-white p-8 rounded-lg shadow-2xl shadow-thirdColor w-full max-w-md">
    	    	<h2 className="text-2xl font-bold text-black mb-6">Your new password</h2>
				<p className="text-red-500 px-3 font-bold">{errorMessage ? errorMessage : ""}</p>
    	    	<form onSubmit={handleSubmit}>
    	      		<div className="space-y-4">
    	        		<div>
    	        	  		<label htmlFor="password" className="block text-sm font-medium text-black mb-1"></label>
    	        	  		<input
    	        	    		name="password"
								type='password'
    	        	    		value={newPasswords.password}
    	        	    		onChange={handleChange}
    	        	    		placeholder="**********"
    	        	    		className="bg-white text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    	        	  		/>
    	        		</div>
    	        		<div>
    	        	  		<label htmlFor="confirm_password" className="block text-sm font-medium text-black mb-1"></label>
    	        	  		<input
    	        	    		name="confirm_password"
								type='password'
    	        	    		value={newPasswords.confirm_password}
    	        	    		onChange={handleChange}
    	        	    		placeholder="**********"
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


export default ResetPassword

