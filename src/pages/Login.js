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
            if (!email || !password) {
                setError('Email and password required');
                setLoading(false);
                return;
            }

            if (isRegister) {
                const res = await register(email, password);
                if (!res || !res.data) {
                    setError('Invalid server response');
                    setLoading(false);
                    return;
                }

                setSuccess('✅ Registration Successful!');
                setEmail('');
                setPassword('');
                
                setTimeout(() => {
                    setIsRegister(false);
                    setSuccess('');
                }, 2000);

            } else {
                const res = await login(email, password);
                if (!res || !res.data) {
                    setError('Invalid credentials');
                    setLoading(false);
                    return;
                }

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.user_id);
                setToken(res.data.token);
                setUserId(res.data.user_id);
            }

        } catch (error) {
            if (error.response) {
                setError(error.response.data?.error || 'Invalid credentials');
            } else if (error.request) {
                setError('Cannot connect to backend');
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: '20px'
        },
        card: {
            background: 'white',
            padding: '50px 40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            maxWidth: '420px',
            width: '100%',
            animation: 'slideUp 0.5s ease'
        },
        '@keyframes slideUp': {
            from: {
                opacity: 0,
                transform: 'translateY(20px)'
            },
            to: {
                opacity: 1,
                transform: 'translateY(0)'
            }
        },
        successAlert: {
            background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
            border: '2px solid #4caf50',
            color: 'white',
            padding: '14px 18px',
            marginBottom: '20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            textAlign: 'center',
            animation: 'slideDown 0.3s ease'
        },
        errorAlert: {
            background: '#ffebee',
            border: '2px solid #f44336',
            color: '#c62828',
            padding: '14px 18px',
            marginBottom: '20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            textAlign: 'center',
            animation: 'slideDown 0.3s ease'
        },
        title: {
            fontSize: '32px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '8px',
            textAlign: 'center'
        },
        subtitle: {
            fontSize: '13px',
            color: '#999',
            textAlign: 'center',
            marginBottom: '30px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        },
        formGroup: {
            marginBottom: '20px'
        },
        label: {
            display: 'block',
            fontSize: '12px',
            fontWeight: '700',
            color: '#555',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        input: {
            width: '100%',
            padding: '12px 15px',
            border: '2px solid #eee',
            borderRadius: '10px',
            fontSize: '14px',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
            fontFamily: 'inherit'
        },
        primaryButton: {
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '20px',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            position: 'relative'
        },
        secondaryButton: {
            width: '100%',
            padding: '12px',
            background: '#f5f5f5',
            color: '#667eea',
            border: '2px solid #eee',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '12px',
            fontFamily: 'inherit'
        },
        toggleContainer: {
            textAlign: 'center',
            marginTop: '25px',
            paddingTop: '20px',
            borderTop: '1px solid #eee'
        },
        toggleText: {
            fontSize: '13px',
            color: '#999',
            marginBottom: '12px'
        },
        loadingSpinner: {
            display: 'inline-block',
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            marginRight: '8px'
        }
    };

    return (
        <div style={styles.container}>
            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                input:focus {
                    outline: none;
                    border-color: #667eea !important;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }
                button:hover:not(:disabled) {
                    transform: translateY(-2px);
                }
                button:disabled {
                    opacity: 0.8;
                    cursor: not-allowed;
                }
            `}</style>

            <div style={styles.card}>
                {/* Success Alert */}
                {success && (
                    <div style={styles.successAlert}>
                        {success}
                    </div>
                )}

                {/* Error Alert */}
                {error && (
                    <div style={styles.errorAlert}>
                        {error}
                    </div>
                )}

                {/* Title */}
                <h1 style={styles.title}>
                    {isRegister ? '📝 Register' : '🔐 Login'}
                </h1>
                <div style={styles.subtitle}>
                    {isRegister ? 'Create your account' : 'Sign in to continue'}
                </div>

                {/* Email Input */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>📧 Email Address</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                </div>

                {/* Password Input */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>🔑 Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        ...styles.primaryButton,
                        opacity: loading ? 0.8 : 1
                    }}
                >
                    {loading ? (
                        <>
                            <span style={styles.loadingSpinner}></span>
                            Processing...
                        </>
                    ) : (
                        isRegister ? '✅ Register' : '🔓 Login'
                    )}
                </button>

                {/* Toggle Form */}
                <div style={styles.toggleContainer}>
                    <div style={styles.toggleText}>
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}
                    </div>
                    <button
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError('');
                            setSuccess('');
                            setEmail('');
                            setPassword('');
                        }}
                        style={styles.secondaryButton}
                    >
                        {isRegister ? '← Login Here' : '→ Register Now'}
                    </button>
                </div>
            </div>
        </div>
    );
}