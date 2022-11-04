import React, { useState, useEffect } from "react";
import axios from '../api/axios';

const REGISTER_URL = '/signup';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [email, pass])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email);
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, pass }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setEmail('');
            setPass('');
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }

    return (
        <>
            {success ? (
                <div className="auth-form-container">
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </div>
            ) : (
                <div className="auth-form-container">
                    <h2>Register</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Full name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="full name" id="name" name="name" />
                        <label htmlFor="email">email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label htmlFor="password">password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        <button type="submit">Log In</button>
                    </form>
                    <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
                </div>
            )}
        </>

    )
}