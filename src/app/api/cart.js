import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getCarts = async () => {
    return await axios.get(`${API_URL}/api/carts`)
}

export const getCartById = async (idCart) => {
    return await axios.get(`${API_URL}/api/cart/${idCart}`)
}

export const addCart = async () => {
    return await axios.post(`${API_URL}/api/cart`)
}

export const editCart = async (idCart) => {
    return await axios.put(`${API_URL}/api/cart/${idCart}`)
}

export const deleteCart = async (idCart) => {
    return await axios.delete(`${API_URL}/api/cart/${idCart}`)
}
