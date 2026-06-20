import { useEffect, useState, useCallback } from 'react';
import { getExpenses, deleteExpense } from '../services/api';

export default function ExpenseList({ token, refresh }) {
    const [expenses, setExpenses] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ amount: '', category: '', date: '' });

    const fetchExpenses = useCallback(async () => {
        try {
            const res = await getExpenses(token);
            setExpenses(res.data);
        } catch (error) {
            alert('Error fetching expenses');
        }
    }, [token]);

    useEffect(() => {
        fetchExpenses();
    }, [refresh, fetchExpenses]);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this expense?')) {
            try {
                await deleteExpense(id, token);
                fetchExpenses();
            } catch (error) {
                alert('Error deleting expense');
            }
        }
    };

    const handleEditClick = (expense) => {
        setEditingId(expense.id);
        setEditForm({
            amount: expense.amount,
            category: expense.category,
            date: expense.date
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/expenses/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });

            if (response.ok) {
                setEditingId(null);
                fetchExpenses();
            } else {
                alert('Error updating expense');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const styles = {
        container: {
            width: '100%'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        tableHead: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
        },
        tableHeader: {
            padding: '15px',
            textAlign: 'left',
            fontWeight: '600',
            fontSize: '13px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
        },
        tableRow: {
            borderBottom: '1px solid #eee',
            transition: 'all 0.2s ease'
        },
        tableRowHover: {
            background: '#f8f9ff'
        },
        tableCell: {
            padding: '15px',
            fontSize: '14px',
            color: '#555'
        },
        tableCellAmount: {
            fontSize: '15px',
            fontWeight: '600',
            color: '#667eea'
        },
        actionButtons: {
            display: 'flex',
            gap: '8px'
        },
        editBtn: {
            padding: '6px 12px',
            background: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
        },
        deleteBtn: {
            padding: '6px 12px',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
        },
        // Modal styles
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        },
        modal: {
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            maxWidth: '400px',
            width: '90%',
            animation: 'slideUp 0.3s ease'
        },
        modalTitle: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '20px'
        },
        formGroup: {
            marginBottom: '15px'
        },
        label: {
            display: 'block',
            fontSize: '12px',
            fontWeight: '700',
            color: '#555',
            marginBottom: '5px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        input: {
            width: '100%',
            padding: '10px 12px',
            border: '2px solid #eee',
            borderRadius: '8px',
            fontSize: '14px',
            boxSizing: 'border-box',
            fontFamily: 'inherit'
        },
        buttonGroup: {
            display: 'flex',
            gap: '10px',
            marginTop: '20px'
        },
        saveBtn: {
            flex: 1,
            padding: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s ease'
        },
        cancelBtn: {
            flex: 1,
            padding: '12px',
            background: '#f0f0f0',
            color: '#555',
            border: '2px solid #eee',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s ease'
        },
        emptyState: {
            textAlign: 'center',
            padding: '40px 20px',
            color: '#999'
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
            `}</style>

            {expenses.length === 0 ? (
                <div style={styles.emptyState}>
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>📭</div>
                    <div>No expenses yet. Add one to get started!</div>
                </div>
            ) : (
                <table style={styles.table}>
                    <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.tableHeader}>📅 Date</th>
                            <th style={styles.tableHeader}>🏷️ Category</th>
                            <th style={styles.tableHeader}>💰 Amount</th>
                            <th style={styles.tableHeader}>⚙️ Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((e) => (
                            <tr key={e.id} style={styles.tableRow}>
                                <td style={styles.tableCell}>{e.date}</td>
                                <td style={styles.tableCell}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '4px 10px',
                                        background: '#f0f0f0',
                                        borderRadius: '20px',
                                        textTransform: 'capitalize',
                                        fontWeight: '500'
                                    }}>
                                        {e.category}
                                    </span>
                                </td>
                                <td style={{...styles.tableCell, ...styles.tableCellAmount}}>
                                    ₹{parseFloat(e.amount).toFixed(2)}
                                </td>
                                <td style={styles.tableCell}>
                                    <div style={styles.actionButtons}>
                                        <button
                                            style={styles.editBtn}
                                            onMouseEnter={(e) => e.target.style.background = '#1976D2'}
                                            onMouseLeave={(e) => e.target.style.background = '#2196F3'}
                                            onClick={() => handleEditClick(e)}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            style={styles.deleteBtn}
                                            onMouseEnter={(e) => e.target.style.background = '#ff5252'}
                                            onMouseLeave={(e) => e.target.style.background = '#ff6b6b'}
                                            onClick={() => handleDelete(e.id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Edit Modal */}
            {editingId && (
                <div style={styles.modalOverlay} onClick={() => setEditingId(null)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 style={styles.modalTitle}>✏️ Edit Expense</h2>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>💰 Amount</label>
                            <input
                                type="number"
                                value={editForm.amount}
                                onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>🏷️ Category</label>
                            <select
                                value={editForm.category}
                                onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                                style={{...styles.input, cursor: 'pointer'}}
                            >
                                <option value="food">Food</option>
                                <option value="travel">Travel</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>📅 Date</label>
                            <input
                                type="date"
                                value={editForm.date}
                                onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.buttonGroup}>
                            <button
                                style={styles.saveBtn}
                                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                onClick={handleUpdate}
                            >
                                💾 Update
                            </button>
                            <button
                                style={styles.cancelBtn}
                                onMouseEnter={(e) => e.target.style.background = '#e0e0e0'}
                                onMouseLeave={(e) => e.target.style.background = '#f0f0f0'}
                                onClick={() => setEditingId(null)}
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}