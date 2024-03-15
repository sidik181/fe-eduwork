import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getProducts = async params => {
    return await axios.get(`${API_URL}/api/products`, {params})
}

export const getProductById = async idProduct => {
    return await axios.get(`${API_URL}/api/product/${idProduct}`)
}

export const addProduct = async data => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
    
    return await axios.post(`${API_URL}/api/product`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const editProduct = async (idProduct, data) => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${API_URL}/api/product/${idProduct}`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const deleteProduct = async idProduct => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.delete(`${API_URL}/api/product/${idProduct}`, { headers: { Authorization: `Bearer ${token}` } })
}
