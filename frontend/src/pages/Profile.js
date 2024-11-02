// frontend/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Profile() {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch profile data
    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`http://localhost:8080/data/profile`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setUserData(result.user);
                handleSuccess('Profile data loaded successfully');
            } else {
                handleError(result.message);
            }
            setLoading(false);
        } catch (error) {
            handleError('Failed to load profile data');
        }
    };

    // Toggle edit mode
    const toggleEdit = (field) => {
        setIsEditing((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    };

    // Handle field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Save updated data
    const saveChanges = async (field) => {
        try {
            const response = await fetch(`http://localhost:8080/data/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ [field]: userData[field] })
            });
            const result = await response.json();
            if (result.success) {
                setUserData(result.user);
                handleSuccess('Profile updated successfully');
            } else {
                handleError(result.message);
            }
        } catch (error) {
            handleError('Failed to update profile');
        }
        toggleEdit(field); // Exit edit mode
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            {userData ? (
                <div>
                    {Object.keys(userData).map((field) => (
                        <div key={field}>
                            <label><strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong></label>
                            {isEditing[field] ? (
                                <div>
                                    <input
                                        type={field === 'dateOfBirth' ? 'date' : 'text'}
                                        name={field}
                                        value={field === 'dateOfBirth' ? new Date(userData[field]).toISOString().split('T')[0] : userData[field]}
                                        onChange={handleChange}
                                    />
                                    <button onClick={() => saveChanges(field)}>Save</button>
                                    <button onClick={() => toggleEdit(field)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <span>
                                        {field === 'dateOfBirth' ? new Date(userData[field]).toLocaleDateString() : userData[field]}
                                    </span>
                                    <button onClick={() => toggleEdit(field)}>&#9998;</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>User data not available</p>
            )}
            <ToastContainer />
        </div>
    );
}

export default Profile;
