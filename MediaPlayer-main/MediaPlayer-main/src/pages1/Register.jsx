import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { checkEmailApi, registerApi } from '../services/allApis';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({
        username: "", 
        email: "", 
        password: ""
    });
    
    const nav = useNavigate();

    // Handle input changes for the user state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Handle the registration process
    const handleRegister = async () => {
        const { username, email, password } = user;
        
        // Simple input validation
        if (!username || !email || !password) {
            toast.warning("Please enter valid inputs!");
            return;
        }

        try {
            // Check if the email is already registered
            const emailCheck = await checkEmailApi(email);
            if (emailCheck.data.length > 0) {
                toast.warning("Email ID already in use!");
                return;
            }

            // Register the user
            const result = await registerApi(user);
            if (result.status === 201) {
                toast.success("Registration successful!");
                setUser({
                    username: "", 
                    email: "", 
                    password: ""
                });
                nav("/log");  // Navigate to login page after successful registration
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error occurred.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '79vh' }}>
            <div className="w-75 border shadow bg-light p-5">
                <h1>Register</h1>
                <input 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    onChange={handleInputChange} 
                    className="form-control mb-3" 
                    placeholder="Enter Email ID" 
                />
                <input 
                    type="text" 
                    name="username" 
                    value={user.username} 
                    onChange={handleInputChange} 
                    className="form-control mb-3" 
                    placeholder="Enter Username" 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={user.password} 
                    onChange={handleInputChange} 
                    className="form-control mb-3" 
                    placeholder="Enter Password" 
                />
                <div className="d-flex justify-content-between">
                    <button className="btn btn-success" onClick={handleRegister}>Register</button>
                    <Link to="/log">Already a User?</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
