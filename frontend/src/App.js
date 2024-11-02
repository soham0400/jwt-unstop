import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import EventMap from './pages/EventMap';
import RefreshHandler from './RefreshHandler';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/Login" />;
    };

    return (
        <div className="App">
            <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<Navigate to="/Login" />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/Profile" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/About" element={<PrivateRoute element={<About />} />} />
                <Route path="/EventMap" element={<EventMap />} />
            </Routes>
        </div>
    );
}

export default App;
