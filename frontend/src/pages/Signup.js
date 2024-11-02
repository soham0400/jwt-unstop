import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        age: '',
        gender: '',
        dateOfBirth: '',
        collegeName: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { username, email, password } = signupInfo;
        if (!username || !email || !password) {
             return handleError('name, email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/Home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result)
        } catch (err) {
             handleError(err);
        }
    }
    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        id='fullName'
                        onChange={handleChange}
                        type='text'
                        name='fullName'
                        autoFocus
                        placeholder='Enter your full name...'
                        value={signupInfo.fullName}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input
                        id='username'
                        onChange={handleChange}
                        type='text'
                        name='username'
                        placeholder='Choose a username...'
                        value={signupInfo.username}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                        id='phone'
                        onChange={handleChange}
                        type='tel'
                        name='phone'
                        placeholder='Enter 10 digit phone number'
                        value={signupInfo.phone}
                        pattern='[0-9]{10}'
                        title='Please enter exactly 10 digits'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='age'>Age</label>
                    <input
                        id='age'
                        onChange={handleChange}
                        type='number'
                        name='age'
                        min='16'
                        max='100'
                        placeholder='Enter your age'
                        value={signupInfo.age}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='gender'>Gender</label>
                    <select
                        id='gender'
                        name='gender'
                        onChange={handleChange}
                        value={signupInfo.gender}
                        required
                    >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='dateOfBirth'>Date of Birth</label>
                    <input
                        id='dateOfBirth'
                        onChange={handleChange}
                        type='date'
                        name='dateOfBirth'
                        value={signupInfo.dateOfBirth}
                        max={new Date().toISOString().split('T')[0]}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='collegeName'>College Name</label>
                    <input
                        id='collegeName'
                        onChange={handleChange}
                        type='text'
                        name='collegeName'
                        placeholder='Enter your college name'
                        value={signupInfo.collegeName}
                        required
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to="/Login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup