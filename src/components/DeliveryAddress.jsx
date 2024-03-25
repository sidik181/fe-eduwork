import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getDeliveryAddresses } from "../app/api/deliveryAddress"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice"
import { toggleAddress } from "../app/features/checkout/checkoutSlice"

export const DeliveryAddress = () => {
    const dispatch = useDispatch()

    const selectedAddress = useSelector(state => state.checkout.selectedAddress);
    const loading = useSelector(state => state.loading)
    const [deliveryAddresses, setDeliveryAddresses] = useState([])

    const fetchDeliveryAddress = async () => {
        try {
            dispatch(setLoading())
            const { data } = await getDeliveryAddresses()
            setDeliveryAddresses(data.data)
        } catch (err) {
            console.error('Error fetch delivery addressses:', err);
        } finally {
            dispatch(unsetLoading())
        }

    }

    const handleCheckboxChange = addressId => {
        dispatch(toggleAddress(addressId));
    };

    useEffect(() => {
        fetchDeliveryAddress()
    }, [])
    return (
        <div className="w-full text-black">
            <h1 className="text-xl font-bold">Pilih Alamat Pengiriman</h1>
            <table className="table-fixed w-full mt-5 mb-10 text-lg text-left">
                <thead>
                    <tr>
                        <th className="border p-3 font-semibold w-16 text-center">Pilih</th>
                        <th className="border p-3 font-semibold">Nama</th>
                        <th className="border p-3 font-semibold">Detail</th>

                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="3" className="py-2 px-4 border-b-2 text-center">Mengambil data ....</td>
                        </tr>
                    ) :
                        deliveryAddresses.length > 0 ? (
                            deliveryAddresses.map((deliveryAddress, index) => (
                                <tr key={index}>
                                    <td className="border p-3 text-[16px] py-1 text-center">
                                        <input type="radio" onChange={() => handleCheckboxChange(deliveryAddress._id)} checked={selectedAddress.includes(deliveryAddress._id)} />
                                    </td>
                                    <td className="border p-3 text-[16px] py-1">{deliveryAddress.nama_alamat_pengiriman}</td>
                                    <td className="border p-3 text-[16px] py-1">{`${deliveryAddress.nama_jalan}, Kelurahan ${deliveryAddress.kelurahan}, Kecamatan ${deliveryAddress.kecamatan}, Kota/Kab ${deliveryAddress.kabupaten_kota}, Provinsi ${deliveryAddress.provinsi}`}</td>
                                </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="mb-3 py-2 px-4 border text-md font-semibold">
                                    Belum ada alamat yang anda tambahkan.! Tambahkan
                                    <Link to="/account/address" className="mx-1 text-blue-700 underline">
                                        alamat
                                    </Link>
                                    anda
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            <div className="flex gap-4 justify-between">
                <Link to={'/cart'}>
                    <button className='bg-blue-600 py-2 px-5 text-white rounded-md text-center'>Kembali</button>
                </Link>
                <Link to={'/confirm-order'}>
                    <button disabled={selectedAddress.length === 0} className={`${selectedAddress.length === 0 ? 'bg-green-400' : 'bg-green-600'} py-2 px-5 text-white rounded-md text-center`}>Review Order</button>
                </Link>
            </div>
        </div>
    )
}
