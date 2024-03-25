import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getOrders = async () => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${API_URL}/api/orders`, { headers: { Authorization: `Bearer ${token}` } })
}

export const addOrder = async data => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
    
    return await axios.post(`${API_URL}/api/order`, data, { headers: { Authorization: `Bearer ${token}` } })
}
