import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getInvoices = async () => {
    return await axios.get(`${API_URL}/api/invoices`)
}

export const getIvoiceByOrder = async (idOrder) => {
    return await axios.get(`${API_URL}/api/invoice/${idOrder}`)
}
