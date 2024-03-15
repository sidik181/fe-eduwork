import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, unsetLoading } from '../app/features/loading/actions'
import { ToastContainer, toast } from 'react-toastify'
import { addProduct } from '../app/api/product'
import { useEffect, useState } from 'react'
import { getCategories } from '../app/api/category'
import { getTags } from '../app/api/tag'
import { CheckboxInput, CustomInput, SelectInput, TextArea } from './ComponentForm'


export const AddProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const initialValues = {
        product_name: '',
        description: '',
        price: null,
        image: '',
        category: '',
        tags: [],
    }

    const categorySchema = categories.map(category => category.name)
    const tagSchema = tags.map(tag => tag.name)

    const validationSchema = Yup.object().shape({
        product_name: Yup.string().required('Nama produk wajib diisi'),
        description: Yup.string().required('Deskripsi harus diisi'),
        price: Yup.number().min(1000, 'Harga produk minimal 1.000').required('Harga harus diisi'),
        image: Yup.string().required('Gambar harus diisi'),
        category: Yup.string().oneOf(categorySchema, 'Kategori tidak valid').required('Kategori harus diisi'),
        tags: Yup.array()
            .of(Yup.string().required('Tag wajib diisi'))
            .min(1, 'Setidaknya satu tag harus dipilih')
            .test(
                'is-valid-tag',
                'Satu atau lebih tag tidak valid',
                (tags) => {
                    return tags.every(tag => tagSchema.includes(tag))
                }
            )
    })

    const fetchCategories = async () => {
        try {
            const { data } = await getCategories();
            setCategories(data)
        } catch (err) {
            console.error(`Error fetching data categories: ${err}`);
        }
    }

    const fetchTags = async () => {
        try {
            const { data } = await getTags();
            setTags(data)
        } catch (err) {
            console.error(`Error fetching data tags: ${err}`);
        }
    }

    const onSubmit = async values => {
        try {
            dispatch(setLoading())
            await addProduct({
                name: values.product_name,
                description: values.description,
                price: values.price,
                image_url: values.image,
                category: values.category,
                tags: values.tags
            })
            toast.success(`Berhasil menambahkan produk`)
            navigate('/settings')
        } catch (err) {
            toast.error(`Gagal menambahkan ${err.message}`)
        } finally {
            dispatch(unsetLoading())
        }
    }

    useEffect(() => {
        fetchCategories()
        fetchTags()
    }, [])
    return (
        <div className='w-full mr-4 mb-4'>
            <ToastContainer />
            <h1 className="mb-3 text-black font-bold text-lg mt-2">Tambah Produk</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty, touched, errors }) => (
                    <Form autoComplete='off' noValidate>
                        <div className='grid grid-cols-2 gap-4'>
                            <CustomInput
                                label="Nama Produk:"
                                name="product_name"
                                type="text"
                                placeholder="Masukkan nama produk"
                            />
                            <SelectInput
                                label="Kategori Produk:"
                                name="category"
                            >
                                <option disabled value="">Pilih Kategori Produk</option>
                                {categories?.map((category, index) => (
                                    <option key={index} value={category.name}>{category.name}</option>
                                ))}
                            </SelectInput>
                            <div className="col-span-2">
                                <TextArea
                                    label="Deskripsi:"
                                    name="description"
                                    type="text-area"
                                    rows="4"
                                    placeholder="Masukkan deskripsi produk"
                                />
                            </div>
                            <CustomInput
                                label="Harga Produk:"
                                name="price"
                                type="number"
                                placeholder="Masukkan harga produk"
                            />
                            <div className="row-span-2">
                                <h1 className='text-black'>Pilih Tag Produk:</h1>
                                {touched.tags && errors.tags && <div style={{ color: 'red' }}> {errors.tags}</div>}
                                {tags?.map((tag, index) => (
                                    <CheckboxInput
                                        key={index}
                                        label={tag.name}
                                        name="tags"
                                        type="checkbox"
                                        value={tag.name || ''}
                                    />
                                ))}
                            </div>
                            <CustomInput
                                label="Gambar Produk:"
                                name="image"
                                type="file"
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4 mt-4'>
                            <Link
                                to={'/settings'}
                                className='bg-blue-500 hover:bg-blue-700 rounded-md px-8 py-2 text-center'>
                                <button
                                    className='uppercase'
                                >
                                    Kembali
                                </button>
                            </Link>
                            {loading ? (

                                <button
                                    disabled
                                    type="submit"
                                    className='bg-blue-500 hover:bg-blue-700 cursor-not-allowed rounded-md px-8 py-2 text-center uppercase'
                                >
                                    Proses ...
                                </button>
                            ) : (

                                <button
                                    disabled={!isValid || !dirty}
                                    type="submit"
                                    className='bg-blue-500 hover:bg-blue-700 rounded-md px-8 py-2 text-center uppercase'
                                >
                                    Tambah
                                </button>
                            )
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
