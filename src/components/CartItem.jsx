import { useState } from "react"
import { Link } from "react-router-dom"

export const CartItem = () => {
    const [count, setCount] = useState(0)

    const incrementCart = () => {
        setCount(count + 1)
    }

    const decrementCart = () => {
        setCount(Math.max(count - 1, 0))
    }

    return (
        <div className="w-full text-black">
            <h1 className="text-xl font-bold">Sub Total: Rp</h1>
            <table className="w-full mt-5 mb-10 text-lg">
                <thead>
                    <tr>
                        <th className="border p-3 font-semibold">Gambar</th>
                        <th className="border p-3 font-semibold">Barang</th>
                        <th className="border p-3 font-semibold">Harga</th>
                        <th className="border p-3 font-semibold">Qty</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
                        <td className="border text-[16px] py-1">Gambar 1</td>
                        <td className="border text-[16px] py-1">Gambar 1</td>
                        <td className="border text-[16px] py-1">Gambar 1</td>
                        <td className="border text-[16px] py-1">
                            <span onClick={decrementCart} className="border px-[10px] font-semibold bg-blue-400 text-white cursor-pointer">-</span>
                            <span className="text-lg mx-5">{count}</span>
                            <span onClick={incrementCart} className="border px-[10px] font-semibold bg-blue-400 text-white cursor-pointer">+</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Link to={'shipping-address'}>
                <span className='block bg-blue-600 py-1 text-white rounded-md text-center w-full cursor-pointer'>Checkout</span>
            </Link>
        </div>
    )
}
