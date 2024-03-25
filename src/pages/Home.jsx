import { useEffect, useState } from "react";
import { Card } from "../components/ProductCard";
import { useSelector, useDispatch } from 'react-redux';
import { Header } from "../components/Header";
import { fetchProducts, setCategory, setKeyword, toggleTags } from "../app/features/product/actions";
import { getCategories } from "../app/api/category";
import { getTagsByCategory } from "../app/api/tag";
import { SearchBar } from "../components/SearchBar";
import { TagCard } from "../components/TagCard";
import { updateProductQuantityState, addItemState } from "../app/features/cart/cartSlice"
import { ToastContainer, toast } from "react-toastify";
import { addItemToCart, loadCart, updateCartAsync } from "../app/features/cart/cartService";
import PaginationButton from "../components/PaginationButton";

export function Home() {
    const products = useSelector(state => state.products.data)
    const status = useSelector(state => state.products.status)
    const product = useSelector(state => state.products)
    const auth = useSelector(state => state.auth.user)
    const cart = useSelector(state => state.cart.items)

    const dispatch = useDispatch()

    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])

    const handleCategoryChange = e => {
        dispatch(setCategory(e.target.value))
    }

    const updateOrAddProductToCart = async selectedProduct => {
        const existingCartItem = cart.find(item => item.product._id === selectedProduct._id);

        if (existingCartItem) {
            let qtyUpdated = existingCartItem.qty + 1;
            await dispatch(updateCartAsync({ id: existingCartItem._id, qty: qtyUpdated })).unwrap()
                .then(() => {
                    dispatch(updateProductQuantityState({ id: existingCartItem._id, qty: qtyUpdated }));
                    dispatch(loadCart())
                    toast.success(`Berhasil menambah jumlah pesanan ${selectedProduct.name} ke keranjang`);
                })
                .catch((error) => {
                    toast.error(`Gagal menambah jumlah pesanan ${selectedProduct.name}. ${error}`);
                });
        } else {
            const itemsToAdd = [
                {
                    product: {
                        _id: selectedProduct._id,
                    },
                    qty: 1
                }
            ]

            await dispatch(addItemToCart({ items: itemsToAdd })).unwrap()
                .then(() => {
                    dispatch(addItemState({ itemsToAdd }));
                    dispatch(loadCart())
                    toast.success(`${selectedProduct.name} berhasil ditambahkan ke keranjang`);
                })
                .catch((error) => {
                    toast.error(`Gagal menambahkan ${selectedProduct.name} ke keranjang. ${error}`);
                });
        }
    };

    useEffect(() => {
        dispatch(fetchProducts())
        getCategories()
            .then(({ data }) => setCategories(data))
        getTagsByCategory(product.category)
            .then(({ data }) => setTags(data))
    }, [dispatch, product.category, product.tags, product.keyword])
    return (
        <>
            <Header />
            <div className="bg-white text-gray-900">
                <ToastContainer />
                <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h1 className="text-2xl font-bold text-left tracking-tight text-gray-900">Daftar Produk</h1>
                    <div className="flex overflow-auto mt-5 items-center">
                        <select defaultValue='' onClick={handleCategoryChange} className="bg-white border p-1 border-gray-300 text-sm text-gray-900" name="category" id="category">
                            <option value=''>Pilih Kategori</option>
                            {categories.map((category, index) => {
                                return (<option key={index} value={category.name}>{category.name}</option>)
                            })}
                        </select>
                        <SearchBar onChange={e => dispatch(setKeyword(e.target.value))} />
                        <TagCard onClick={tag => dispatch(toggleTags(tag))} tags={tags} />
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {status === 'proccess' ? (
                            <span className="text-black text-md">Mengambil data ...</span>
                        ) :
                            products.length > 0 ?
                                products.map((product, index) => (
                                    <Card key={index} product={product} updateOrAddProductToCart={() => updateOrAddProductToCart(product)} auth={auth} />
                                )) :
                                <span className="text-black text-md">Tidak ada produk</span>
                        }
                        {status === 'error' && <span className="text-black text-md">Gagal mengambil data. Silakan refresh kembali browser anda</span>}
                    </div>
                    <PaginationButton />
                </div>
            </div>
        </>
    )
}
