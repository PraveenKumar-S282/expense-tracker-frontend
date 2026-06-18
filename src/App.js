import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { testConnection } from './services/api';

function App() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    // Test backend connection on load
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            setUserId(localStorage.getItem('user_id'));
        }

        // Test backend
        testConnection();
    }, []);

    return (
        <div>
            {token ? (
                <Dashboard token={token} setToken={setToken} />
            ) : (
                <Login setToken={setToken} setUserId={setUserId} />
            )}
        </div>
    );
}

export default App;