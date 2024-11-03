import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth();

    const handleOnChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
        if (errorMessage !== "")
            setErrorMessage("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, password } = loginData

        if (!username || !password) {
            setErrorMessage("credentials required !")
        }
        else {
            setIsLoading(true)
            const res = await fetch("http://0.0.0.0:8000/api/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            const tokens = await res.json()
            console.log(tokens)
            setIsLoading(false)
            if (res.status === 200) {
                login({ tokens })
                navigate('/dashboard')
            }
            else {
                setErrorMessage("invalid credentials ! try again.")
            }
        }
    }
    return (
        <>
            <div className="bg-secondaryColor min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-full w-full max-w-md shadow-2xl shadow-thirdColor">
                    <h2 className="text-2xl pt-2 font-bold text-black mb-6">Welcome Back !</h2>
                    <p className="text-red-500 px-3 pb-3 font-bold">{errorMessage ? errorMessage : ""}</p>
                    <form onSubmit={handleSubmit}>
                        {isLoading && <p className="text-center text-thirdColor">Loading...</p>}
                        <div className="mt-4 space-y-2" >
                            <button className="w-full py-2 text-white bg-thirdColor rounded-lg hover:bg-white transition duration-300 hover:text-thirdColor hover:border-2 border-thirdColor">
                                Continue with Intra
                            </button>
                        </div>
                        <h6 className="text-center text-gray-400 mt-6">or</h6>
                        <div className="space-y-4 py-4">
                            <div>
                                <label htmlFor="Username" className="block text-sm font-medium text-black mb-1"></label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="w-full px-4 py-2 border-2 bg-white text-black border-thirdColor rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={loginData.username}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="Password" className="block text-sm font-medium text-black mb-1"></label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-2 bg-white text-black border-2 border-thirdColor rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
                                    value={loginData.password}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Login"
                                className="w-full bg-secondaryColor text-white py-2 rounded-lg hover:bg-thirdColor transition duration-300"
                            />
                            <p className='text-primaryColor px-2 py-1 hover:text-thirdColor transition duration-300'><Link to={'/forgot-password'}>forgot password ?</Link></p>
                            <br /><br />
                        </div>
                    </form>
                    <div className='flex items-center justify-evenly'>
                        <p className='text-primaryColor'>you don't have an account ?</p>
                        <Link className="px-5 py-2 text-white bg-thirdColor rounded-lg hover:bg-white transition duration-300 hover:text-thirdColor hover:border-2 border-thirdColor" to="/signup">Register</Link>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login