import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const handleIntraLogin = async (code,login,navigate, setIsLoading)=> {
    try {
        setIsLoading(true)
        const res = await fetch(`/api/users/oauth2/intra/`,{
            method:"POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({code:code})
        })
        let data = await res.json()
    
        if(res.ok) {
            login({tokens:data })
            setIsLoading(false)
            navigate('/dashboard')
        }

    } catch (error) {

    }
}

const Login = () => {
    const navigate = useNavigate();
    const [loginStep, setLoginStep] = useState('credentials');

    const [searchParams] = useSearchParams()
    const code = searchParams.get("code") || null

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [twoFactorCode, setTwoFactorCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login, tokens } = useAuth();

    const handleOnChange = (e) => {
        if (loginStep === '2fa')
            setTwoFactorCode(e.target.value);
        else
            setLoginData({ ...loginData, [e.target.name]: e.target.value });

        if (errorMessage) 
            setErrorMessage("");
    }
    useEffect(()=> {
        const fetchData = async ()=> {

            if(tokens) {
                const access  = await fetch('/api/auth/token/verify/', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + tokens.access
                    },
                });
                if(access.ok ) {
                    navigate('/dashboard')
                }
            fetchData()
            }
        }

    },[])

    useEffect(()=> {
        if(code) {
            handleIntraLogin(code,login,navigate, setIsLoading)
        }
    },[code])

    const handle42 = (e)=> {
        e.preventDefault()
        const redirectUrl = import.meta.env.VITE_URI_INTRA
        window.location.href = redirectUrl
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        if (!loginData.username || !loginData.password) {
            setErrorMessage("Please fill all the fields!");
            setIsLoading(false);
            return;
        }

        if (loginStep === 'credentials')
        {
            const res = await fetch("/api/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const tokens = await res.json();
            if (!res.ok) {
                setErrorMessage(tokens.error);
                setIsLoading(false);
                return;
            }
            if (tokens.refresh) {
                login({ tokens });
                navigate('/dashboard');
            } else {
                setLoginStep('2fa');
            }
            setIsLoading(false);
        }
        else
        {
            try
            {
                const res = await fetch("/api/auth/verify-2fa/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: loginData.username,
                        code: twoFactorCode
                    })
                });
    
                const tokens = await res.json();
                if (res.ok)
                {
                    login({ tokens });
                    navigate('/dashboard');
                }
                else
                    setErrorMessage(tokens.error);
                setIsLoading(false);
            }
            catch (error) {
                setErrorMessage("An unexpected error occurred. Please try again later.");
                console.error("2FA verification error:", error);
            }
        }
        setIsLoading(false);
    }

    return (
        <>
            <div className="bg-secondaryColor min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-full w-full max-w-md shadow-2xl shadow-thirdColor">
                    <h2 className="text-2xl pt-2 font-bold text-black mb-6">
                        {loginStep === 'credentials' ? 'Welcome Back!' : 'Two-Factor Authentication'}
                    </h2>
                    {loginStep === 'credentials' ? 
                        <div className="space-y-4 py-4">
                            <div className="mt-4 space-y-2">
                                {isLoading ? <p className="text-center text-thirdColor">Loading...</p> :
                                    <button onClick={handle42} className="w-full py-2 text-white bg-thirdColor rounded-lg hover:bg-white transition duration-300 hover:text-thirdColor hover:border-2 border-thirdColor">
                                        Continue with Intra
                                    </button>
                                }

                            </div>
                        </div>
                    : null
                    }
                    <form onSubmit={handleSubmit}>
                        {loginStep === 'credentials' ? (
                            <div className="space-y-4 py-4">
                                <h6 className="text-center text-gray-400 mt-6">or</h6>
                                <p className="text-red-500 pb-3 font-bold">{errorMessage}</p>
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
                                            autoComplete='username'
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
                                            autoComplete='current-password'
                                        />
                                    </div>
                                    {isLoading ? <p className="text-center text-thirdColor">Loading...</p> : 
                                        <input
                                            type="submit"
                                            value="Login"
                                            className="w-full bg-secondaryColor text-white py-2 rounded-lg hover:bg-thirdColor transition duration-300"
                                        />
                                    }
                                    <br /><br />
                                </div>
                                <div className='flex items-center justify-evenly'>
                                    <p className='text-primaryColor'>you don't have an account ?</p>
                                    <Link className="px-5 py-2 text-white bg-thirdColor rounded-lg hover:bg-white transition duration-300 hover:text-thirdColor hover:border-2 border-thirdColor" to="/signup">Register</Link>
                                </div>
                            </div>
                        ) : (
                            // 2FA verification form
                            <div className="space-y-4 py-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">
                                        Enter the 6-digit code from your authenticator app
                                    </label>
                                    <p className="text-red-500 px-3 pb-3 font-bold">{errorMessage}</p>
                                    <input
                                        type="text"
                                        maxLength="6"
                                        className="w-full px-4 py-2 border-2 bg-white text-black border-thirdColor rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={twoFactorCode}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                {isLoading ? <p className="text-center text-thirdColor">Loading...</p> :                                 <button
                                    type="submit"
                                    className="w-full bg-secondaryColor text-white py-2 rounded-lg hover:bg-thirdColor transition duration-300"
                                >
                                    Verify
                                </button>
                                }
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login