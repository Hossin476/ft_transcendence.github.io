import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {useNavigate } from 'react-router';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/auth/jwt/create', {
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

    const css = `
    * {
        padding:0;
        margin:0;
        box-sizing:border-box;
    }

    .co{
        display: grid;
        justify-content:center;
        place-content:center;
    }

    input {
        padding:1rem 3rem;
        margin: 1rem 0;
    }

    button{
        border: 3px solid red;
        padding: 1rem 1rem;
        margin-left: 6rem;
        background-color: transparent;
    }
    `

    return (
        <div className='co'>
            <style>{css}</style>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <br></br>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    name="passowrd"
                />
                <br></br>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
