import { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../services/api';

export default function ExpenseList({ token, refresh }) {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, [refresh]);

    const fetchExpenses = async () => {
        try {
            const res = await getExpenses(token);
            setExpenses(res.data);
        } catch (error) {
            alert('Error fetching expenses');
        }
    };

    const handleDelete = async (id) => {
        await deleteExpense(id, token);
        fetchExpenses();
    };

    return (
        <div>
            <h3>Your Expenses</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '10px' }}>Date</th>
                        <th style={{ padding: '10px' }}>Category</th>
                        <th style={{ padding: '10px' }}>Amount</th>
                        <th style={{ padding: '10px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((e) => (
                        <tr key={e.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>{e.date}</td>
                            <td style={{ padding: '10px' }}>{e.category}</td>
                            <td style={{ padding: '10px' }}>₹{e.amount}</td>
                            <td style={{ padding: '10px' }}>
                                <button onClick={() => handleDelete(e.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}