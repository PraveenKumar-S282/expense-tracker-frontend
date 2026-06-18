import { useState } from 'react';
import { login, register } from '../services/api';

export default function Login({ setToken, setUserId }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Validate inputs
            if (!email || !password) {
                setError('Email and password required');
                setLoading(false);
                return;
            }

            if (isRegister) {
                // ✅ REGISTRATION
                const res = await register(email, password);

                if (!res || !res.data) {
                    setError('Invalid server response');
                    setLoading(false);
                    return;
                }

                // ✅ Show success popup
                setSuccess('✅ Registration Successful!');
                
                // Clear form
                setEmail('');
                setPassword('');
                
                // After 2 seconds, switch to login
                setTimeout(() => {
                    setIsRegister(false);
                    setSuccess('');
                }, 2000);

            } else {
                // ✅ LOGIN
                const res = await login(email, password);

                if (!res || !res.data) {
                    setError('Invalid credentials');
                    setLoading(false);
                    return;
                }

                // Save token and redirect to dashboard
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.user_id);
                setToken(res.data.token);
                setUserId(res.data.user_id);
            }

        } catch (error) {
            if (error.response) {
                // Backend returned error
                setError(error.response.data?.error || 'Invalid credentials');
            } else if (error.request) {
                setError('Cannot connect to backend');
            } else {
                setError(error.message);
            }
            console.log('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '450px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
            {/* Success Popup */}
            {success && (
                <div style={{
                    backgroundColor: '#d4edda',
                    border: '2px solid #28a745',
                    color: '#155724',
                    padding: '15px',
                    marginBottom: '20px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    {success}
                </div>
            )}

            {/* Error Popup */}
            {error && (
                <div style={{
                    backgroundColor: '#f8d7da',
                    border: '2px solid #f5c6cb',
                    color: '#721c24',
                    padding: '15px',
                    marginBottom: '20px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}>
                    ❌ {error}
                </div>
            )}

            {/* Title */}
            <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px' }}>
                {isRegister ? '📝 Register' : '🔐 Login'}
            </h2>

            {/* Email Input */}
            <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                }}
            />

            {/* Password Input */}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                }}
            />

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: loading ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginBottom: '15px'
                }}
            >
                {loading ? '⏳ Processing...' : (isRegister ? '✅ Register' : '🔓 Login')}
            </button>

            {/* Toggle Button */}
            <button
                onClick={() => {
                    setIsRegister(!isRegister);
                    setError('');
                    setSuccess('');
                    setEmail('');
                    setPassword('');
                }}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                {isRegister ? '← Back to Login' : '→ Create New Account'}
            </button>
        </div>
    );
}