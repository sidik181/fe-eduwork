import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice"
import { getDeliveryAddressById } from "../app/api/deliveryAddress"
import { formatPrice } from "../utils"
import { clearCartState } from "../app/features/cart/cartSlice"
import { clearAddressState } from "../app/features/checkout/checkoutSlice"
import { loadCart } from "../app/features/cart/cartService"
import { toast } from "react-toastify"
import { checkoutOrder } from "../app/features/checkout/checkoutService"

export const ConfirmOrder = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectedAddress = useSelector(state => state.checkout.selectedAddress)
    const cart = useSelector(state => state.cart.items)

    const [deliveryAddress, setDeliveryAddress] = useState({})
    const ongkir = 10000

    const subTotal = cart.reduce((sum, item) => sum + item.sub_total, 0);
    const total = subTotal + ongkir

    const fetchCheckoutAddress = async () => {
        if (selectedAddress.length > 0) {
            try {
                dispatch(setLoading())
                const { data } = await getDeliveryAddressById(selectedAddress[0])
                setDeliveryAddress(data)
            } catch (err) {
                console.error('Error fetch delivery address:', err);
            } finally {
                dispatch(unsetLoading())
            }
        }
    }

    const handleSubmitOrder = async idAddress => {
        const addressId = idAddress.toString();
        const addOrder = {
            delivery_fee: ongkir,
            delivery_address: addressId
        }
        await dispatch(checkoutOrder(addOrder)).unwrap()
            .then((response) => {
                dispatch(clearAddressState())
                dispatch(clearCartState())
                dispatch(loadCart())
                toast.success(`Berhasil checkout pesanan`);
                navigate(`/invoices/${response._id}`)
            })
            .catch((error) => {
                toast.error(`Gagal checkout pesanan. ${error}`);
            });
    }

    useEffect(() => {
        fetchCheckoutAddress()
    }, [])
    return (
        <div className="w-full text-black">
            <h1 className="text-xl font-bold">Konfirmasi Pesanan</h1>
            <table className="table-fixed w-full mt-3 mb-10 text-lg text-left">
                {selectedAddress.length === 0 ? (
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b-2 text-center">Silakan kembali dan pilih alamat pengiriman terlebih dahulu.</td>
                        </tr>
                    </tbody>
                ) : (
                        <tbody>
                            <tr>
                                <td className="border-b-2 p-3">Alamat</td>
                                <td className="border-b-2 p-3 text-[16px]">{`${deliveryAddress.nama_jalan}, Kelurahan ${deliveryAddress.kelurahan}, Kecamatan ${deliveryAddress.kecamatan}, Kota/Kab ${deliveryAddress.kabupaten_kota}, Provinsi ${deliveryAddress.provinsi}`}</td>
                            </tr>
                            <tr>
                                <td className="border-b-2 p-3">Sub Total</td>
                                <td className="border-b-2 p-3 text-[16px]">{formatPrice(subTotal)}</td>
                            </tr>
                            <tr>
                                <td className="border-b-2 p-3">Ongkir</td>
                                <td className="border-b-2 p-3 text-[16px]">{formatPrice(ongkir)}</td>
                            </tr>
                            <tr>
                                <td className="border-b-2 p-3 font-bold">Total</td>
                                <td className="border-b-2 p-3 text-[16px] font-bold">{formatPrice(total)}</td>
                            </tr>
                        </tbody>
                )}

            </table>
            <div className="flex gap-4 justify-between">
                <Link to={'/shipping-address'}>
                    <button className='bg-blue-600 py-2 px-5 text-white rounded-md text-center'>Kembali</button>
                </Link>
                <button onClick={() => handleSubmitOrder(selectedAddress[0])} disabled={selectedAddress.length === 0} className={`${selectedAddress.length === 0 ? 'bg-green-400' : 'bg-green-600'} py-2 px-5 text-white rounded-md text-center`}
                >
                    Bayar
                </button>
            </div>
        </div>
    )
}
