import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { validateCredentials } from '../../utils/auth/validators';  


const Signup = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  })
  const [errorMessage, setErrorMessage] = useState("")
  const { username, email, password, password2 } = formData
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage != "")
      setErrorMessage("")
  }
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {

      const validation = validateCredentials(formData)
      if (!validation.valid) {
        setErrorMessage(validation.message)
        setIsLoading(false)
      }
      else {
        
        const res = await fetch(`/api/auth/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
        const response = await res.json()
        if (res.ok)
          navigate("/otp/verify")
        else {
          setErrorMessage(response.message)
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }

  }

  return (
    <>
      <div className="bg-secondaryColor min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl shadow-thirdColor w-full max-w-md">
          <h2 className="text-2xl font-bold text-black mb-6">Create Account</h2>
          <p className="text-red-500 px-3 pb-3 font-bold">{errorMessage ? errorMessage : ""}</p>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block"></label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={username}
                  autoComplete='username'
                  className="w-full px-4 py-2 text-black border-2 bg-white border-thirdColor rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
              </div>
              <div>
                <label htmlFor="email" className="block"></label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  value={email}
                  autoComplete='email'
                  className="w-full px-4 py-2 text-black border-2 bg-white border-thirdColor rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm mb-1"></label>
                <input
                  className="w-full px-4 py-2 bg-white text-black border-2 border-thirdColor rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleChange}
                  />
              </div>
              <div>
                <label htmlFor="password2" className="block text-sm font-medium text-black mb-1"></label>
                <input
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={password2}
                  autoComplete="new-password"
                  className="w-full px-4 py-2 bg-white text-black border-2 border-thirdColor rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
                  />
              </div>
              {isLoading ? <p className="mx-5 text-center text-primaryColor font-bold">Loading...</p>
               : <input
                type="submit"
                value="Submit"
                className="w-full bg-secondaryColor text-white py-2 rounded-lg hover:bg-thirdColor transition duration-300"
                /> }
            </div>
          </form>
          <p className='text-thirdColor px-3 py-2 hover:text-primaryColor transition duration-300'><Link to={'/login'}>already have an account ?</Link></p>
        </div>
      </div>
    </>

);
};

export default Signup;