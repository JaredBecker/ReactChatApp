import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../assets/logo.svg';
import { register_route } from '../utils/APIRoutes';

const Register = () => {
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const toast_options = {
        position: 'bottom-right',
        autoClose: 3500,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (handleValidation()) {
            // Pull values from state
            const { username, email, password } = values;
            
            // Send request to server
            const { data } = await axios.post(register_route, {
                username,
                email,
                password
            });

            // Check if request failed and display error
            if (!data.status) {
                toast.error(data.message, toast_options);
                return;
            }

            // If post was successful, store user info in localStorage and navigate user to chat home page
            if (data.status) {
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            }

        }
    };

    const handleValidation = () => {
        const { username, email, password, confirm_password } = values;

        if (username.length < 3) {
            toast.error('Username needs to be more than 3 characters', toast_options);
            return false;
        } else if (email === '') {
            toast.error('Email is required', toast_options);
            return false;
        } else if (password.length < 5) {
            toast.error('Password needs to be more than 5 characters', toast_options);
            return false;
        } else if (password !== confirm_password) {
            toast.error('Passwords do no match', toast_options);
            return false;
        }

        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Snappy Logo" />
                        <h1>Snappy</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="UserName"
                        name="username"
                        onChange={event => handleChange(event)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={event => handleChange(event)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={event => handleChange(event)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        onChange={event => handleChange(event)}
                    />
                    <button type="submit">Create User</button>
                    <span>Already have an account? <Link to="/login">Login.</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    background-color: #131324;

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        
        img {
          height: 5rem;
        }

        h1 {
            color: #fff;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color:rgba(0, 0, 0, 0.76);
        border-radius: 2rem;
        padding: 2rem 5rem;

        input {
            background-color: transparent;
            padding: 1rem;
            border: solid #4e0eff 0.1rem;
            border-radius: 0.4rem;
            color: #fff;
            width: 100%;
            font-size: 1rem;
            transition: 0.25s ease-in-out;

            &:focus {
                border: solid #997af0 0.1rem;
                outline: none;
            }
        }

        button {
            background-color: #997af0;
            color: #fff;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.25s ease-in-out;

            &:hover {
                background-color: #4e0eff;
            }
        }

        span {
            color: #fff;
            text-transform: uppercase;

            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Register;