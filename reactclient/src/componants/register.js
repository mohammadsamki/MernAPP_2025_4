//  Register component
import React, { useState } from 'react';
import { register } from "../services/auth";

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await register(form.username, form.email, form.password);
            window.location.href = '/login';
        } catch (error) {
            alert(error.message);
            setError(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={onSubmit} id="registerForm">
                <div className="form-outline mb-4">
                    <input onChange={(e) => setForm({ ...form, username: e.target.value })} type="text" id="formUsername" className="form-control" placeholder="Username" />
                </div>
                <div className="form-outline mb-4">
                    <input onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" id="formEmail" className="form-control" placeholder="Email address" />
                </div>
                <div className="form-outline mb-4">
                    <input onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" id="formPassword" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
            </form>
        </div>
    );
};
export default Register;