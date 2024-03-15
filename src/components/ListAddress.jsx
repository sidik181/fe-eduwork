import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteDeliveryAddress, getDeliveryAddresses } from "../app/api/deliveryAddress"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { ToastContainer, toast } from "react-toastify"
import { setLoading, unsetLoading } from "../app/features/loading/actions"

export const ListAddress = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const [addresses, setAddresses] = useState([])

    const handleDeleteAddress = async (idDeliveryAddress, name) => {
        try {
            const result = await Swal.fire({
                title: `Hapus alamat ${name}?`,
                text: "Anda tidak akan dapat mengembalikan ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                await deleteDeliveryAddress(idDeliveryAddress);
                toast.success(`Alamat ${name} berhasil dihapus`)
                fetchTags()
            }
        } catch (err) {
            toast.error(`Gagal menghapus ${name}. ${err}`)
        } finally {
            fetchTags()
        }
    }

    const fetchTags = async () => {
        try {
            dispatch(setLoading())
            let { data } = await getDeliveryAddresses()
            setAddresses(data.data)
        } catch (err) {
            console.error('Error fetch delivery address:', err);
        } finally {
            dispatch(unsetLoading())
        }
    }

    useEffect(() => {
        fetchTags()
    }, [])
    return (
        <div className="text-black w-full mt-2 mb-3 mr-4">
            <ToastContainer />
            <Link to={'/account/add-address'}>
                <button className="px-3 py-2 rounded bg-blue-500 text-white mb-3">Tambah Alamat</button>
            </Link>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-left">
                    <tr>
                        <th className="py-2 px-4 border">No</th>
                        <th className="py-2 px-4 border">Nama Alamat</th>
                        <th className="py-2 px-4 border">Detail Alamat</th>
                        <th className="py-2 px-4 border">Alamat Lengkap</th>
                        <th className="py-2 px-4 border">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-left">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="py-2 px-4 border-b-2 text-center">Mengambil data ....</td>
                        </tr>
                    ) :
                        addresses.length > 0 ?
                            addresses.map((address, index) => (
                                <tr key={index} >
                                    <td className="py-2 px-4 border">{index + 1}</td>
                                    <td className="py-2 px-4 border">{address.nama_alamat_pengiriman}</td>
                                    <td className="py-2 px-4 border">{address.detail}</td>
                                    <td className="py-2 px-4 border">{`${address.nama_jalan}, Kelurahan ${address.kelurahan}, Kecamatan ${address.kecamatan}, Kota/Kab ${address.kabupaten_kota}, Provinsi ${address.provinsi}`}</td>
                                    <td className="py-2 px-4 border">
                                        <div className="justify-center flex gap-2">
                                            <Link to={'/account/edit-address'}>
                                                <button className="bg-blue-700 px-3 py-1 rounded-md text-white">Edit</button>
                                            </Link>
                                            <button onClick={() => handleDeleteAddress(address._id, address.name_alamat_pengiriman)} className="bg-red-700 px-3 py-1 rounded-md text-white">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="5" className="py-2 px-4 border-b-2 text-center">Tidak ada alamat</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
