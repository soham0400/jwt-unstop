import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('')
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/Login');
        }, 1000)
    }

    const fetchProducts = async ()=>{
        try{
            const url = `http://localhost:8080/data`
            const headers = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json()
            console.log("Fetch result:", result)
            setProducts(result);
            handleSuccess('Successfully fetched data')
            setLoading(false);
        }catch(err){
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/Profile')}>Profile</button>
            <button onClick={() => navigate('/About')}>About</button>
            <div>
                {
                    products && products?.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home