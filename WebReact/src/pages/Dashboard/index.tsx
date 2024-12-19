import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendURL } from '../../constants';
import { useNavigate } from 'react-router-dom';

interface UserData {
    id: string;
    userName: string;
    email: string;
}

function Dashboard() {
    const [user, setUser] = useState<UserData>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${backendURL}/user`, {
                    withCredentials: true,
                });
                if (res.status !== 200) {
                    navigate('/login');
                    return console.error({ error: 'User not found' });
                }
                console.log(res.data);
                setUser(res.data);
            } catch (error: any) {
                console.error('Fetch user error', error.response?.data?.error);
                navigate('/');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogoutClick = () => {
        const logOut = async () => {
            const res = await axios.delete(`${backendURL}/oauth/logout`, { withCredentials: true });
            console.log(res);
            navigate('/');
        };

        if (user) {
            logOut();
        }
    };

    return (
        <div>
            <div>{user?.userName}</div>
            <div>{user?.email}</div>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );
}

export default Dashboard;
