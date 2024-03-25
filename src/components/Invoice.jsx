import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getIvoiceByOrder } from "../app/api/invoice"
import { formatPrice } from "../utils"
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice"
import { useDispatch, useSelector } from "react-redux"

export const Invoice = () => {
    const { orderId } = useParams()
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const [invoices, setInvoices] = useState({})
    console.log(invoices)
    const [adrress, setAddress] = useState({})

    const fetchInvoices = async () => {
        try {
            dispatch(setLoading())
            const { data } = await getIvoiceByOrder(orderId)
            setAddress(data.order.delivery_address)
            setInvoices(data)
        } catch (err) {
            console.error('Error fetch invoices:', err);
        } finally {
            dispatch(unsetLoading())
        }
    }

    useEffect(() => {
        fetchInvoices()
    }, [])
    return (
        <div className="w-full text-black mb-3 mr-4">
            <table className="table-fixed w-full mb-7 text-lg text-left">
                <tbody>
                    <tr>
                        <td className="border-b-2 p-3">Status</td>
                        <td className="border-b-2 p-3 text-[16px] font-semibold">{loading ? 'Loading..' : invoices.payment_status}</td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Order ID</td>
                        <td className="border-b-2 p-3 text-[16px]">{loading || !invoices.order ? 'Loading..' : `#${invoices.order.order_number}`}</td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Total Belanja</td>
                        <td className="border-b-2 p-3 text-[16px]">{loading ? 'Loading..' : formatPrice(invoices.total)}</td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Ditagihkan Untuk</td>
                        <td className="border-b-2 p-3 text-[16px] flex flex-col">
                            <span className="font-bold">{loading || !invoices.user ? 'Loading..' : `${invoices.user.full_name}`}</span>
                            <span>{loading || !invoices.user ? 'Loading..' : `${invoices.user.email}`}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Dikirim Ke</td>
                        <td className="border-b-2 p-3 text-[16px] flex flex-col">
                            <span>{`Desa/Kelurahan: ${loading || !invoices.order ? 'Loading..' : adrress.kelurahan}`}</span>
                            <span>{`Kecamatan: ${loading || !invoices.order ? 'Loading..' : adrress.kecamatan}`}</span>
                            <span>{`kabupaten/Kota: ${loading || !invoices.order ? 'Loading..' : adrress.kabupaten_kota}`}</span>
                            <span>{`Provinsi: ${loading || !invoices.order ? 'Loading..' : adrress.provinsi}`}</span>
                        </td>
                        {/* <td className="border-b-2 p-3 text-[16px]">{`${loading ? 'Loading..' : invoices.order.delivery_address.nama_jalan}, Kelurahan ${loading ? 'Loading..' : invoices.order.delivery_address.kelurahan}, Kecamatan ${loading ? 'Loading..' : invoices.order.delivery_address.kecamatan}, Kota/Kab ${loading ? 'Loading..' : invoices.order.delivery_address.kabupaten_kota}, Provinsi ${loading ? 'Loading..' : invoices.order.delivery_address.provinsi}`}</td> */}
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Metode Pembayaran</td>
                        <td className="border-b-2 p-3 text-[16px] flex flex-col">
                            <span>Sidik Komarudiansah</span>
                            <span>sidik.komarudiansah@gmail.com</span>
                            <span>Bank BCA</span>
                            <span>1234-5678-9xxx-xxxx</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Link to={'/account/orders'}>
                <span className='bg-blue-600 py-2 px-5 text-white rounded-md text-center cursor-pointer'>Daftar Pemesanan</span>
            </Link>
        </div>
    )
}
