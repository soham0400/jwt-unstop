import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import FloatingBackground from './Floating';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    collegeName: ''
  });

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
    setUserInfo({
      fullName: '',
      username: '',
      email: '',
      password: '',
      phone: '',
      age: '',
      gender: '',
      dateOfBirth: '',
      collegeName: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Separate function for handling login
  const handleLogin = async () => {
    const { email, password } = userInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => navigate('/Home'), 1000);
      } else {
        handleError(error?.details[0]?.message || message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  // Separate function for handling signup
  const handleSignup = async () => {
    const { username, fullName, email, password } = userInfo;
    if (!username || !fullName || !email || !password) {
      return handleError('Name, email, username, and password are required');
    }

    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => navigate('/Home'), 1000);
      } else {
        handleError(error?.details[0]?.message || message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  // Wrapper to call either handleLogin or handleSignup based on isRegistering
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <FloatingBackground />
      <div className="login-container">
        <div className={`grid-container ${isRegistering ? 'register-mode' : ''}`}>
          <div className="info-box"></div>
          <div className="psych">
            <div className="Login-cover">
              <div className="form-container">
                <h2>{isRegistering ? 'Register with Us' : 'We are Frontend Noobs'}</h2>

                <div className={isRegistering ? 'scrollable-form' : ''}>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">{isRegistering ? 'Enter your Email:' : 'Email:'}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={userInfo.email}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">{isRegistering ? 'Create a Password:' : 'Password:'}</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={userInfo.password}
                        required
                      />
                    </div>

                    {isRegistering && (
                      <>
                        <div className="form-group">
                          <label htmlFor="fullName">Full Name:</label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            onChange={handleChange}
                            value={userInfo.fullName}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Username:</label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            value={userInfo.username}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone Number:</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            onChange={handleChange}
                            value={userInfo.phone}
                            pattern="[0-9]{10}"
                            title="Please enter exactly 10 digits"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="dateOfBirth">Date of Birth:</label>
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            onChange={handleChange}
                            value={userInfo.dateOfBirth}
                            max={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="age">Age:</label>
                          <input
                            type="number"
                            id="age"
                            name="age"
                            onChange={handleChange}
                            value={userInfo.age}
                            min="16"
                            max="100"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="gender">Gender:</label>
                          <select
                            id="gender"
                            name="gender"
                            onChange={handleChange}
                            value={userInfo.gender}
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="collegeName">College:</label>
                          <input
                            type="text"
                            id="collegeName"
                            name="collegeName"
                            onChange={handleChange}
                            value={userInfo.collegeName}
                            required
                          />
                        </div>
                      </>
                    )}

                    <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                  </form>
                </div>

                <p onClick={handleToggle} className="toggle-link">
                  {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
