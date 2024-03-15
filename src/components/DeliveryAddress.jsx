import { Link } from "react-router-dom"

export const DeliveryAddress = () => {
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
                    <tr>
                        <td className="border p-3 text-[16px] py-1 text-center">
                            <input type="checkbox" />
                        </td>
                        <td className="border p-3 text-[16px] py-1">Gambar 1</td>
                        <td className="border p-3 text-[16px] py-1">Gambar 1</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex gap-4 justify-between">
                <Link to={'/cart'}>
                    <span className='bg-blue-600 py-2 px-5 text-white rounded-md text-center cursor-pointer'>Kembali</span>
                </Link>
                <Link to={'/confirm-order'}>
                    <span className='bg-green-600 py-2 px-5 text-white rounded-md text-center cursor-pointer'>Review Order</span>
                </Link>
            </div>
        </div>
    )
}
