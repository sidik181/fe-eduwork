import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { deleteTag, getTags } from '../app/api/tag';
import { setLoading, unsetLoading } from '../app/features/loading/loadingSlice';

export const ListTags = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const [tags, setTags] = useState([])

    const handleDeleteTag = async (idTag, name) => {
        try {
            const result = await Swal.fire({
                title: `Hapus tag ${name}?`,
                text: "Anda tidak akan dapat mengembalikan ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                await deleteTag(idTag);
                toast.success(`Tag ${name} berhasil dihapus`)
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
            let { data } = await getTags()
            setTags(data)
        } catch (err) {
            console.error('Error fetch tags:', err);
        } finally {
            dispatch(unsetLoading())
        }
    }

    useEffect(() => {
        fetchTags()
    }, [])
    return (
        <div className="text-black w-full mb-3 mt-2 mr-4">
            <ToastContainer />
            <Link to={'/settings/add-tag'}>
                <button className="px-3 py-2 rounded bg-blue-500 text-white mb-3">Tambah Tag</button>
            </Link>
            <table className="min-w-full divide-gray-200">
                <colgroup>
                    <col style={{ width: '10px' }} />
                    <col style={{ width: '100px' }} />
                </colgroup>
                <thead className="bg-gray-50 text-center">
                    <tr>
                        <th className="py-2 px-4">No</th>
                        <th className="py-2 px-4 w-[300px]">Nama Tag</th>
                        <th className="py-2 px-4">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center">
                    {loading ? (
                        <tr>
                            <td colSpan="3" className="py-2 px-4 border-b-2">Mengambil data ....</td>
                        </tr>
                    ) :
                        tags.length > 0 ?
                            tags.map((tag, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{tag.name}</td>
                                    <td className="py-2 px-4 flex justify-center gap-3">
                                        <Link to={`/settings/edit-tag/${tag._id}`}>
                                            <button className="bg-blue-700 px-3 py-1 rounded-md text-white">Edit</button>
                                        </Link>
                                        <button onClick={() => handleDeleteTag(tag._id, tag.name)} className="bg-red-700 px-3 py-1 rounded-md text-white">Hapus</button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="3" className="py-2 px-4 border-b-2">Tidak ada tag</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
