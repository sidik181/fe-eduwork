import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export const ListOrders = () => {
    const [detailOrder, setDetailOrder] = useState(false)

    const toggleDetailOrder = () => {
        setDetailOrder(!detailOrder);
    };

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
                    <tr className="border-b">
                        <td onClick={toggleDetailOrder} className="py-2 hover:bg-gray-300 px-4 flex justify-end align-middle items-center">
                            <ArrowDownIcon className={detailOrder ? 'w-5 transition duration-100' : 'w-5 transition duration-100 rotate-180'}></ArrowDownIcon>
                        </td>
                        <td className="py-2 px-4">#1</td>
                        <td className="py-2 px-4">Rp 45.000</td>
                        <td className="py-2 px-4">Menunggu Pembayaran</td>
                        <td className="py-2 px-4">
                            <span className="bg-blue-700 px-3 py-1 rounded-md text-white cursor-pointer">Invoice</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className={detailOrder ? "min-w-full divide-gray-200 table-fixed mt-1" : "hidden"}>
                <colgroup>
                    <col style={{ width: '100px' }} />
                    <col style={{ width: '100px' }} />
                </colgroup>
                <thead className="bg-gray-50 text-left">
                    <tr>
                        <th className='py-2 px-4 w-[400px]'>Barang</th>
                        <th className='py-2 px-4 w-[200px]'>Jumlah</th>
                        <th className='py-2 px-4'>Total Harga</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-gray-200 text-left">
                    <tr className="border-b">
                        <td className="py-2 px-4">Mie Ayam</td>
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">Rp 40.000</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4">Mie Ayam</td>
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">Rp 40.000</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4">Mie Ayam</td>
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">Rp 40.000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
