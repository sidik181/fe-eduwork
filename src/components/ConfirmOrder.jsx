import { Link } from "react-router-dom"

export const ConfirmOrder = () => {
    return (
        <div className="w-full text-black">
            <h1 className="text-xl font-bold">Konfirmasi Pesanan</h1>
            <table className="table-fixed w-full mt-3 mb-10 text-lg text-left">
                <tbody>
                    <tr>
                        <td className="border-b-2 p-3">Alamat</td>
                        <td className="border-b-2 p-3 text-[16px]">Jl. Tirtayasa X</td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Sub Total</td>
                        <td className="border-b-2 p-3 text-[16px]">Gambar 1</td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Ongkir</td>
                        <td className="border-b-2 p-3 text-[16px]">Gambar 1</td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3 font-bold">Total</td>
                        <td className="border-b-2 p-3 text-[16px] font-bold">Gambar 1</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex gap-4 justify-between">
                <Link to={'/shipping-address'}>
                    <span className='bg-blue-600 py-2 px-5 text-white rounded-md text-center cursor-pointer'>Kembali</span>
                </Link>
                <Link to={'/invoices'}>
                    <span className='bg-green-600 py-2 px-5 text-white rounded-md text-center cursor-pointer'>Bayar</span>
                </Link>
            </div>
        </div>
    )
}
