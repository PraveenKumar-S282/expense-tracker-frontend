import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { testConnection } from './services/api';

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
        testConnection();
    }, []);

    return (
        <div>
            {token ? (
                <Dashboard token={token} setToken={setToken} />
            ) : (
                <Login setToken={setToken} setUserId={() => {}} />
            )}
        </div>
    );
}

export default App;