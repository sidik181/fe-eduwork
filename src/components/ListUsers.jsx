import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../app/api/user';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, unsetLoading } from '../app/features/loading/actions';
import { ToastContainer, toast } from 'react-toastify';

export const ListUsers = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const [users, setUsers] = useState([])

    const handleDeleteUser = async (idUser, name) => {
        try {
            const result = await Swal.fire({
                title: `Hapus user ${name}?`,
                text: "Anda tidak akan dapat mengembalikan ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                await deleteUser(idUser);
                toast.success(`${name} berhasil dihapus`)
                fetchDataUser()
            }
        } catch (err) {
            toast.error(`Gagal menghapus ${name}. ${err}`)
        } finally {
            fetchDataUser()
        }
    }

    const fetchDataUser = async () => {
        try {
            dispatch(setLoading())
            let { data } = await getUsers()
            setUsers(data)
        } catch (err) {
            console.error('Error fetch product:', err);
        } finally {
            dispatch(unsetLoading())
        }
    }

    useEffect(() => {
        fetchDataUser()
    }, [])

    return (
        <div className="text-black w-full mb-3 mt-2 mr-4">
            <ToastContainer />
            <Link to={'/settings/add-user'}>
                <button className="px-3 py-2 rounded bg-blue-500 text-white mb-3">Tambah User</button>
            </Link>
            <table className="min-w-full divide-gray-200">
                <colgroup>
                    <col style={{ width: '10px' }} />
                    <col style={{ width: '100px' }} />
                </colgroup>
                <thead className="bg-gray-50 text-center">
                    <tr>
                        <th className="py-2 px-4">No</th>
                        <th className="py-2 px-4 w-[300px]">Email</th>
                        <th className="py-2 px-4 w-[300px]">Nama</th>
                        <th className="py-2 px-4 w-[300px]">Hak Akses</th>
                        <th className="py-2 px-4">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="py-2 px-4 border-b-2">Mengambil data ....</td>
                        </tr>
                    ) :
                        users.length > 0 ?
                            users.map((user, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">{user.full_name}</td>
                                    <td className="py-2 px-4">{user.role}</td>
                                    <td className="py-2 px-4 flex justify-center gap-3">
                                        <Link to={`/settings/edit-user/${user._id}`}>
                                            <button className="bg-blue-700 px-3 py-1 rounded-md text-white">Edit</button>
                                        </Link>
                                        <button onClick={() => handleDeleteUser(user._id, user.full_name)} className="bg-red-700 px-3 py-1 rounded-md text-white">Hapus</button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="5" className="py-2 px-4 border-b-2">Tidak ada user</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

