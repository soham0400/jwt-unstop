import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            setIsAuthenticated(true);
            if (location.pathname === '/' || location.pathname === '/Login' || location.pathname === '/Signup') {
                navigate('/Home', { replace: true });
            }
        } else {
            setIsAuthenticated(false);
            if (location.pathname !== '/Login' && location.pathname !== '/Signup') {
                navigate('/Login', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;