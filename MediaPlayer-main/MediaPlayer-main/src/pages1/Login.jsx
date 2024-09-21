import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({
        email: '', 
        password: ''
    });
    
    const nav = useNavigate();

    // Handle input changes dynamically
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Handle login functionality
    const handleLogin = async () => {
        const { email, password } = user;

        // Validate input fields
        if (!email || !password) {
            toast.warning("Please enter valid inputs!");
            return;
        }

        try {
            const result = await loginApi(email, password);
            
            if (result.status === 200) {
                if (result.data.length > 0) {
                    const userData = result.data[0];
                    sessionStorage.setItem('userData', JSON.stringify(userData));
                    toast.success("Login Successful!");

                    // Clear input fields after successful login
                    setUser({
                        email: '', 
                        password: ''
                    });
                    
                    // Navigate to home page after login
                    nav('/home');
                } else {
                    toast.warning("Invalid Email or Password");
                }
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error occurred. Please try again later.");
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '79vh' }}>
                <div className="w-75 border shadow bg-light p-5">
                    <h1>Login</h1>
                    <input 
                        type="email" 
                        name="email" 
                        value={user.email} 
                        onChange={handleInputChange} 
                        className='form-control mb-3' 
                        placeholder='Enter Email ID' 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        value={user.password} 
                        onChange={handleInputChange} 
                        className='form-control mb-3' 
                        placeholder='Enter Password' 
                    />
                    <div className="d-flex justify-content-between">
                        <button className='btn btn-success' onClick={handleLogin}>Login</button>
                        <Link to={'/reg'}>New User?</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
