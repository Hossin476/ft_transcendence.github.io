import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router';
import { useSearchParams } from 'react-router-dom';


const handleIntraLogin = async (code,login,navigate)=> {
    const res = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/users/oauth2/intra/`,{
        method:"POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({code:code})
    })
    let data = await res.json()
    console.log(data)
    if(res.ok) {
        login({tokens:data })
        navigate('/')
    } else {
        console.log("error with response")
    }
}

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const code = searchParams.get("code") || null

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/auth/jwt/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const tokens = await response.json();
            console.log(tokens)
            login({tokens });
            navigate('/');
        } else {
            console.log("error with response")
        }
    };

    useEffect(()=> {
        console.log("yes it's here ")
        console.log("this is the error :",code)
        if(code)
            handleIntraLogin(code,login,navigate)
    },[code])
    const handle42 = (e)=> {
        e.preventDefault()
        const redirectUrl = import.meta.env.VITE_URI_INTRA

        console.log("this is the shit: ",redirectUrl)
        window.location.href = redirectUrl
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm ">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input 
                                id="username" 
                                name="username" 
                                type="text" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder="Username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                required 
                                className="appearance-none rounded-none relative block w-full my-4 px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button  onClick={handle42} className='text-white border rounded border-black bg-black py-2 px-4 w-full'>42 Login</button>
                        </div>
                    </div>
                    <div className=" flex justify-center">
                        <button type="submit" className="group relative w-1/2 flex align-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;