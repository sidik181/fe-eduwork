import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getTags = async () => {
    return await axios.get(`${API_URL}/api/tags`)
}

export const getTagById = async idTag => {
    return await axios.get(`${API_URL}/api/tag/${idTag}`)
}

export const getTagsByCategory = async category => {
    return await axios.get(`${API_URL}/api/tags/${category}`)
}

export const addTag = async data => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
    
    return await axios.post(`${API_URL}/api/tag`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const editTag = async (idTag, data) => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${API_URL}/api/tag/${idTag}`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const deleteTag = async idTag => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.delete(`${API_URL}/api/tag/${idTag}`, { headers: { Authorization: `Bearer ${token}` } })
}
