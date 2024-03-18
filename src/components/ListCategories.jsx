import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCategory, getCategories } from '../app/api/category';
import { setLoading, unsetLoading } from '../app/features/loading/loadingSlice';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

export const ListCategories = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const handleDeleteCategory = async (idCategory, name) => {
        try {
            const result = await Swal.fire({
                title: `Hapus kategori ${name}?`,
                text: "Anda tidak akan dapat mengembalikan ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                await deleteCategory(idCategory);
                toast.success(`Kategori ${name} berhasil dihapus`)
                fetchCategories()
            }
        } catch (err) {
            toast.error(`Gagal menghapus ${name}. ${err}`)
        } finally {
            fetchCategories()
        }
        await deleteCategory(idCategory)
        navigate('/settings/categories')
    }

    const fetchCategories = async () => {
        try {
            dispatch(setLoading())
            const { data } = await getCategories()
            setCategories(data);
        } catch (err) {
            console.error(`Error fetching categories, ${err}`)
        } finally {
            dispatch(unsetLoading())
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className="text-black w-full mb-3 mt-2 mr-4">
            <ToastContainer />
            <Link to={'/settings/add-category'}>
                <button className="px-3 py-2 rounded bg-blue-500 text-white mb-3">Tambah Kategori</button>
            </Link>
            <table className="min-w-full divide-gray-200">
                <colgroup>
                    <col style={{ width: '10px' }} />
                    <col style={{ width: '100px' }} />
                </colgroup>
                <thead className="bg-gray-50 text-center">
                    <tr>
                        <th className="py-2 px-4">No</th>
                        <th className="py-2 px-4 w-[300px]">Nama Kategori</th>
                        <th className="py-2 px-4">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center">
                    {loading ? (
                        <tr>
                            <td colSpan="3" className="py-2 px-4 border-b-2">Mengambil data ...</td>
                        </tr>
                    ) :
                        categories.length > 0 ?
                            categories.map((category, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{category.name}</td>
                                    <td className="py-2 px-4 flex justify-center gap-3">
                                        <Link to={`/settings/edit-category/${category._id}`}>
                                            <button className="bg-blue-700 px-3 py-1 rounded-md text-white">Edit</button>
                                        </Link>
                                        <button onClick={() => handleDeleteCategory(category._id, category.name)} className="bg-red-700 px-3 py-1 rounded-md text-white">Hapus</button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="3" className="py-2 px-4 border-b-2">Tidak ada kategori</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
