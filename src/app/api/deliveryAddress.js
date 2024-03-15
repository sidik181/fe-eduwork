import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getDeliveryAddresses = async () => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${API_URL}/api/delivery-addresses?limit=`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const getDeliveryAddressById = async idDeliveryAddress => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${API_URL}/api/delivery-address/${idDeliveryAddress}`, { headers: { Authorization: `Bearer ${token}` } })
}

export const addDeliveryAddress = async () => {
    return await axios.post(`${API_URL}/api/delivery-address`)
}

export const editDeliveryAddress = async (idDeliveryAddress, data) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${API_URL}/api/delivery-address/${idDeliveryAddress}`, data, { headers: { Authorization: `Bearer ${token}` } })
}

export const deleteDeliveryAddress = async idDeliveryAddress => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.delete(`${API_URL}/api/delivery-address/${idDeliveryAddress}`, { headers: { Authorization: `Bearer ${token}` } })
}
