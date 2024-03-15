import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getUsers = async () => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${API_URL}/api/users`, { headers: { Authorization: `Bearer ${token}` } })
}

export const getUserById = async idUser => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${API_URL}/api/user/${idUser}`, { headers: { Authorization: `Bearer ${token}` } })
}

export const addUser = async data => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${API_URL}/api/user`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const editUser = async (idUser, data) => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${API_URL}/api/user/${idUser}`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const deleteUser = async idUser => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.delete(`${API_URL}/api/user/${idUser}`, { headers: { Authorization: `Bearer ${token}` } })
}
