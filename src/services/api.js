import axios from 'axios';

const API_URL = 'https://expense-tracker-backend-y7xz.onrender.com/api';

export const register = (email, password) => {
    return axios.post(`${API_URL}/auth/register`, { email, password });
};

export const login = (email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const addExpense = (amount, category, date, token) => {
    return axios.post(
        `${API_URL}/expenses/`,
        { amount, category, date },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

export const getExpenses = (token) => {
    return axios.get(
        `${API_URL}/expenses/`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

export const deleteExpense = (id, token) => {
    return axios.delete(
        `${API_URL}/expenses/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
};
// TEST FUNCTION - Remove after testing
export const testConnection = async () => {
    try {
        const response = await axios.get('https://expense-tracker-backend-y7xz.onrender.com/');
        console.log('✅ Backend connected:', response.data);
        return true;
    } catch (error) {
        console.log('❌ Backend connection failed:', error.message);
        return false;
    }
};