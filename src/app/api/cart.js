import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getCarts = async () => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${API_URL}/api/carts`, { headers: { Authorization: `Bearer ${token}` } })
}

export const getCartById = async idCart => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${API_URL}/api/cart/${idCart}`, { headers: { Authorization: `Bearer ${token}` } })
}

export const addCart = async data => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${API_URL}/api/cart`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const editCart = async (id, data) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${API_URL}/api/cart/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const deleteCart = async idItem => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.delete(`${API_URL}/api/cart/${idItem}`, { headers: { Authorization: `Bearer ${token}` } })
}
