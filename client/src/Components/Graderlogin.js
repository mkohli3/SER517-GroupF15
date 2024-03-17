import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Graderlogin.css';

const GraderLogin = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
    
        if (email.endsWith('@asu.edu')) {
            navigate('/home'); 
        } else {
            alert('Please use a valid ASU email address.');
        }
    };
    
    return (
        <div className="grader-login">
            <form onSubmit={handleLogin}>
                <label htmlFor="email">ASU Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default GraderLogin;
