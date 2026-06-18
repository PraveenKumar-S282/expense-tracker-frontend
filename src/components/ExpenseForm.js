import { useState } from 'react';
import { addExpense } from '../services/api';

export default function ExpenseForm({ token, onExpenseAdded }) {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('food');
    const [date, setDate] = useState('');

    const handleSubmit = async () => {
        try {
            await addExpense(parseFloat(amount), category, date, token);
            setAmount('');
            setDate('');
            onExpenseAdded();
        } catch (error) {
            alert('Error adding expense');
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
            <h3>Add Expense</h3>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            >
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
            </select>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <button onClick={handleSubmit} style={{ width: '100%', padding: '10px' }}>
                Add Expense
            </button>
        </div>
    );
}