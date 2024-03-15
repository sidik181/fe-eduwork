import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getCategories = async () => {
    return await axios.get(`${API_URL}/api/categories`)
}

export const getCategoryById = async idCategory => {
    return await axios.get(`${API_URL}/api/category/${idCategory}`)
}

export const addCategory = async data => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${API_URL}/api/category`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const editCategory = async (idCategory, data) => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${API_URL}/api/category/${idCategory}`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const deleteCategory = async idCategory => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.delete(`${API_URL}/api/category/${idCategory}`, { headers: { Authorization: `Bearer ${token}` } })
}
