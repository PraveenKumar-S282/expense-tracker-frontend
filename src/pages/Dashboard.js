import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

export default function Dashboard({ token, setToken }) {
    const [refresh, setRefresh] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setToken(null);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto' }}>
            <h1>Expense Tracker</h1>
            <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
                Logout
            </button>
            <ExpenseForm token={token} onExpenseAdded={() => setRefresh(!refresh)} />
            <ExpenseList token={token} refresh={refresh} />
        </div>
    );
}