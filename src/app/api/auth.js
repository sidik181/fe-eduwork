import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const register = async data => {
    return await axios.post(`${API_URL}/auth/register`, data)
}

export const loginUser = async data => {
    return await axios.post(`${API_URL}/auth/login`, data)
}

export const logoutUser = async () => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${API_URL}/auth/logout`, {}, { headers: { Authorization: `Bearer ${token}` } })
}

export const getProfile = async () => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${API_URL}/auth/me`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const editProfile = async (idProfile, data) => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${API_URL}/auth/me/edit/${idProfile}`, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}
