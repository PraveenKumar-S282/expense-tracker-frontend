import { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

export default function Dashboard({ token, setToken }) {
    const [refresh, setRefresh] = useState(false);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [categoryBreakdown, setCategoryBreakdown] = useState({});

    // Fetch expenses for summary
    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/expenses/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                
                let total = 0;
                let categories = {};
                
                data.forEach(exp => {
                    total += exp.amount;
                    categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
                });
                
                setTotalExpenses(total);
                setCategoryBreakdown(categories);
            } catch (error) {
                console.log('Error fetching summary');
            }
        };
        
        fetchSummary();
    }, [refresh, token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setToken(null);
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '0',
            margin: '0',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        },
        header: {
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '20px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
        },
        headerTitle: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#667eea',
            margin: '0',
            letterSpacing: '-0.5px'
        },
        logoutBtn: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '10px 25px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
        },
        logoutBtnHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
        },
        mainContent: {
            padding: '40px',
            maxWidth: '1400px',
            margin: '0 auto'
        },
        summaryGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
        },
        summaryCard: {
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        },
        summaryCardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
        },
        cardLabel: {
            fontSize: '13px',
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '600',
            marginBottom: '8px'
        },
        cardValue: {
            fontSize: '32px',
            fontWeight: '700',
            color: '#667eea',
            marginBottom: '10px'
        },
        contentGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginBottom: '40px'
        },
        formSection: {
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        },
        sectionTitle: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '25px',
            paddingBottom: '15px',
            borderBottom: '2px solid #667eea'
        },
        formGroup: {
            marginBottom: '15px'
        },
        formLabel: {
            display: 'block',
            fontSize: '13px',
            fontWeight: '600',
            color: '#555',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        formInput: {
            width: '100%',
            padding: '12px 15px',
            border: '2px solid #eee',
            borderRadius: '8px',
            fontSize: '14px',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
            fontFamily: 'inherit'
        },
        formInputFocus: {
            borderColor: '#667eea',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
        },
        formButton: {
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '10px',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
        },
        formButtonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
        },
        expenseSection: {
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
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
        deleteBtnHover: {
            background: '#ff5252',
            transform: 'scale(1.05)'
        },
        emptyState: {
            textAlign: 'center',
            padding: '40px 20px',
            color: '#999'
        },
        emptyStateIcon: {
            fontSize: '48px',
            marginBottom: '15px'
        },
        categoryBreakdown: {
            marginTop: '25px'
        },
        categoryItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid #f0f0f0'
        },
        categoryBar: {
            height: '8px',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '4px',
            marginTop: '5px'
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.headerTitle}>💰 Expense Tracker</h1>
                <button 
                    style={styles.logoutBtn}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.logoutBtnHover)}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    onClick={handleLogout}
                >
                    🔓 Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
                {/* Summary Cards */}
                <div style={styles.summaryGrid}>
                    <div 
                        style={styles.summaryCard}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.summaryCardHover)}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={styles.cardLabel}>Total Spending</div>
                        <div style={styles.cardValue}>₹{totalExpenses.toFixed(2)}</div>
                        <div style={{ fontSize: '12px', color: '#999' }}>All expenses combined</div>
                    </div>

                    <div 
                        style={styles.summaryCard}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.summaryCardHover)}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={styles.cardLabel}>Categories</div>
                        <div style={styles.cardValue}>{Object.keys(categoryBreakdown).length}</div>
                        <div style={{ fontSize: '12px', color: '#999' }}>Spending categories used</div>
                    </div>

                    <div 
                        style={styles.summaryCard}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.summaryCardHover)}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={styles.cardLabel}>Top Category</div>
                        <div style={styles.cardValue}>
                            {Object.keys(categoryBreakdown).length > 0 
                                ? Object.keys(categoryBreakdown).reduce((a, b) => 
                                    categoryBreakdown[a] > categoryBreakdown[b] ? a : b
                                  ) 
                                : '—'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>Highest spending category</div>
                    </div>
                </div>

                {/* Form & Expenses Grid */}
                <div style={styles.contentGrid}>
                    {/* Add Expense Form */}
                    <div style={styles.formSection}>
                        <h2 style={styles.sectionTitle}>➕ Add Expense</h2>
                        <ExpenseForm token={token} onExpenseAdded={() => setRefresh(!refresh)} />
                    </div>

                    {/* Category Breakdown */}
                    <div style={styles.formSection}>
                        <h2 style={styles.sectionTitle}>📊 Spending by Category</h2>
                        {Object.keys(categoryBreakdown).length > 0 ? (
                            <div style={styles.categoryBreakdown}>
                                {Object.entries(categoryBreakdown).map(([category, amount]) => (
                                    <div key={category} style={styles.categoryItem}>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#333', textTransform: 'capitalize' }}>
                                                {category}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#999', marginTop: '3px' }}>
                                                ₹{amount.toFixed(2)}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#667eea' }}>
                                            {((amount / totalExpenses) * 100).toFixed(0)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', color: '#999', padding: '30px 20px' }}>
                                <div style={{ fontSize: '32px', marginBottom: '10px' }}>📈</div>
                                <div>No expenses yet</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Expenses List */}
                <div style={styles.expenseSection}>
                    <h2 style={styles.sectionTitle}>📋 Recent Expenses</h2>
                    <ExpenseList token={token} refresh={refresh} />
                </div>
            </div>
        </div>
    );
}