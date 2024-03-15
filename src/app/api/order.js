import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getOrders = async () => {
    return await axios.get(`${API_URL}/api/orders`)
}

export const addOrder = async () => {
    return await axios.get(`${API_URL}/api/order`)
}
