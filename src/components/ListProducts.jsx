import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct, getProducts } from '../app/api/product';
import { formatPrice } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, unsetLoading } from '../app/features/loading/loadingSlice';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const ListProducts = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const [products, setProducts] = useState([])

    const handleDeleteProduct = async (idProduct, name) => {
        try {
            const result = await Swal.fire({
                title: `Hapus produk ${name}?`,
                text: "Anda tidak akan dapat mengembalikan ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                await deleteProduct(idProduct)
                toast.success(`Produk ${name} berhasil dihapus`)
                fetchDataPoducts()
            }
        } catch (err) {
            toast.error(`Gagal menghapus ${name}. ${err}`)
        }
    }

    const fetchDataPoducts = async () => {
        try {
            dispatch(setLoading())
            const response = await getProducts();
            const { data } = response.data
            setProducts(data);
        } catch (err) {
            console.error(`Error fetching product, ${err}`)
        } finally {
            dispatch(unsetLoading())
        }
    };

    useEffect(() => {
        fetchDataPoducts();
    }, []);
    return (
        <div className="text-black w-full mb-3 mr-4 mt-2">
            <ToastContainer />
            <Link to={'/settings/add-product'}>
                <button className="px-3 py-2 rounded bg-blue-500 text-white mb-3">Tambah Produk</button>
            </Link>
            <table className="min-w-full divide-gray-200">
                <colgroup>
                    <col style={{ width: '10px' }} />
                    <col style={{ width: '100px' }} />
                </colgroup>
                <thead className="bg-gray-50 text-center">
                    <tr>
                        <th className="py-2 px-4">No</th>
                        <th className="py-2 px-4 w-[300px]">Nama Produk</th>
                        <th className="py-2 px-4 w-[300px]">Kategori</th>
                        <th className="py-2 px-4 w-[300px]">Tag</th>
                        <th className="py-2 px-4 w-[300px]">Harga</th>
                        <th className="py-2 px-4">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center">
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="py-2 px-4 border-b-2">Mengambil data ...</td>
                        </tr>
                    ) :
                        products.length > 0 ?
                            products.map((product, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{product.name}</td>
                                    <td className="py-2 px-4">{product.category.name}</td>
                                    <td className="py-2 px-4">{product.tags.map(tag => tag.name).join(', ')}</td>
                                    <td className="py-2 px-4">{formatPrice(product.price)}</td>
                                    <td className="flex justify-center items-center align-center gap-3">
                                        <Link to={`/settings/edit-product/${product._id}`}>
                                            <button className="bg-blue-700 px-3 py-1 rounded-md text-white">Edit</button>
                                        </Link>
                                        <button onClick={() => handleDeleteProduct(product._id, product.name)} className="bg-red-700 px-3 py-1 rounded-md text-white">Hapus</button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="6" className="py-2 px-4 border-b-2">Tidak ada produk</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
