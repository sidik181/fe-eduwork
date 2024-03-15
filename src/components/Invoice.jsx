import { Link } from "react-router-dom"

export const Invoice = () => {
    return (
        <div className="w-full text-black mb-3 mr-4">
            <table className="table-fixed w-full mb-7 text-lg text-left">
                <tbody>
                    <tr>
                        <td className="border-b-2 p-3">Status</td>
                        <td className="border-b-2 p-3 text-[16px] font-semibold">Menunggu Pembayaran</td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Order ID</td>
                        <td className="border-b-2 p-3 text-[16px]">INV-QO134</td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Total Belanja</td>
                        <td className="border-b-2 p-3 text-[16px]">Rp 250.000</td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Ditagihkan Untuk</td>
                        <td className="border-b-2 p-3 text-[16px] flex flex-col">
                            <span className="font-bold">Sidik Komarudiansah</span>
                            <span>sidik.komarudiansah@gmail.com</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="border-b-2 p-3">Dikirim Ke</td>
                        <td className="border-b-2 p-3 text-[16px]">Fetch Alamat Pengiriman</td>
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
