import { ArrowDownIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../app/api/order'
import { setLoading, unsetLoading } from '../app/features/loading/loadingSlice'
import { getInvoices } from '../app/api/invoice'
import { formatPrice } from '../utils'
import { Link } from 'react-router-dom'

export const ListOrders = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const [orders, setOrders] = useState([])
    const [invoices, setInvoices] = useState([])

    const [detailOrderId, setDetailOrderId] = useState(null)

    const toggleDetailOrder = id => {
        setDetailOrderId(prevId => prevId === id ? null : id);
    // setDetailOrderId(detailOrderId === id ? null : id);
    }

    const fetchOrders = async () => {
        try {
            const { data } = await getOrders()
            setOrders(data.data)
        } catch (err) {
            console.error(`Error fetching orders, ${err}`)
        }
    }

    const fetchInvoices = async () => {
        try {
            dispatch(setLoading())
            const { data } = await getInvoices()
            setInvoices(data.data);
        } catch (err) {
            console.error(`Error fetching invoice, ${err}`)
        } finally {
            dispatch(unsetLoading())
        }
    }

    useEffect(() => {
        fetchOrders()
        fetchInvoices()
    },[])
    return (
        <div className="text-black w-full mb-3 mt-2 mr-4">
            <table className="min-w-full divide-gray-200">
                <colgroup>
                    <col style={{ width: '10px' }} />
                    <col style={{ width: '100px' }} />
                </colgroup>
                <thead className="bg-gray-50 text-center">
                    <tr>
                        <th className="py-2 px-4"></th>
                        <th className="py-2 px-4">Order ID</th>
                        <th className="py-2 px-4 w-[250px]">Total</th>
                        <th className="py-2 px-4 w-[300px]">Status</th>
                        <th className="py-2 px-4">Invoices</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="py-2 px-4 border-b-2 text-center">Mengambil data ....</td>
                        </tr>
                    ) :
                        invoices.length > 0 ?
                            invoices.map(invoice => (
                                <React.Fragment key={invoice._id}>
                                    <tr>
                                        <td onClick={() => toggleDetailOrder(invoice._id)} className="py-2 px-4 flex justify-end align-middle items-center">
                                            <ArrowDownIcon className={detailOrderId === invoice._id ? 'w-5 transition duration-100' : 'w-5 transition duration-100 rotate-180'}></ArrowDownIcon>
                                        </td>
                                        <td className="py-2 px-4 border-b-2">{`#${invoice.order.order_number}`}</td>
                                        <td className="py-2 px-4 border-b-2">{formatPrice(invoice.total)}</td>
                                        <td className="py-2 px-4 border-b-2">{invoice.payment_status}</td>
                                        <td className="py-2 px-4">
                                            <Link to={`/invoices/${invoice.order._id}`}>
                                                <button className="bg-blue-700 px-3 py-1 rounded-md text-white">Invoice</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    {detailOrderId === invoice._id && (
                                        <tr className="bg-gray-100">
                                            <td colSpan="5">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead>
                                                        <tr>
                                                            <th className='py-2 px-4 w-[400px] text-left'>Barang</th>
                                                            <th className='py-2 px-4 w-[200px]'>Jumlah</th>
                                                            <th className='py-2 px-4'>Total Harga</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-gray-200 text-left">
                                                        {orders.find(order => order._id === invoice.order._id)?.order_items.map(item => (
                                                            <tr key={item._id} className="border-b">
                                                                <td className="py-2 px-4">{item.name}</td>
                                                                <td className="py-2 px-4 text-center">{item.qty}</td>
                                                                <td className="py-2 px-4 text-center">{formatPrice(item.price * item.qty)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )) :
                            <tr>
                                <td colSpan="5" className="py-2 px-4 border-b-2 text-center">Tidak ada order</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

