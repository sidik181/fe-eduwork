import { useEffect, useState } from "react";
import { Card } from "../components/ProductCard";
import { useSelector, useDispatch } from 'react-redux';
import { Header } from "../components/Header";
import { fetchProducts, setCategory, setKeyword, toggleTags } from "../app/features/product/actions";
import { getCategories } from "../app/api/category";
import { getTagsByCategory } from "../app/api/tag";
import { SearchBar } from "../components/SearchBar";
import { TagCard } from "../components/TagCard";

export function Home() {
    const products = useSelector(state => state.products.data)
    const product = useSelector(state => state.products)
    const auth = useSelector(state => state.auth);

    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])

    const dispatch = useDispatch()

    const handleCategoryChange = e => {
        dispatch(setCategory(e.target.value))
    }

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
                <div className="mx-auto max-w-2xl px-4 mt-5 pb-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
                        {products.map((product, index) => (
                            <Card key={index} product={product} auth={auth} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
