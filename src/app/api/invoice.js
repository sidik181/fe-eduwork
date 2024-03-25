import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getInvoices = async () => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${API_URL}/api/invoices`, { headers: { Authorization: `Bearer ${token}` } })
}

export const getIvoiceByOrder = async idOrder => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${API_URL}/api/invoice/${idOrder}`, { headers: { Authorization: `Bearer ${token}` } })
}
