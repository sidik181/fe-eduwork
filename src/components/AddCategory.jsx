import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, unsetLoading } from '../app/features/loading/loadingSlice'
import { ToastContainer, toast } from 'react-toastify'
import { addCategory } from '../app/api/category'


export const AddCategory = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)

    const initialState = {
        category_name: '',
    }

    const validationSchema = Yup.object().shape({
        category_name: Yup.string().required('Nama kategori wajib diisi'),
    })

    const onSubmit = async values => {
        try {
            dispatch(setLoading())
            await addCategory({
                name: values.category_name,
            })
            toast.success(`Berhasil menambahkan kategori`)
            navigate('/settings/categories')
        } catch (err) {
            toast.error(`Gagal menambahkan ${err.message}`)
        } finally {
            dispatch(unsetLoading())
        }
    }


    return (
        <div className='w-full mr-4'>
            <ToastContainer />
            <h1 className="mb-3 text-black font-bold text-lg mt-2">Tambah Kategori</h1>
            <Formik initialValues={initialState} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ values, handleChange, handleSubmit, handleBlur, errors, touched, dirty, isValid }) => {
                    return (
                        <form onSubmit={handleSubmit} className="text-sm">
                            <div className="flex flex-col">
                                <label htmlFor="category_name" className="text-gray-700">Nama Kategori</label>
                                <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.category_name} name="category_name" id="category_name" className="bg-white mt-2 p-2 border border-gray-300 rounded text-sm text-gray-900" placeholder="Masukkan nama kategori"></input>
                                {touched.category_name && errors.category_name && <div style={{ color: 'red' }}> {errors.category_name}</div>}
                            </div>
                            <div className="my-4 w-full flex items-center justify-center space-x-4">
                                <Link to={'/settings/categories'} className='bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-center w-full'>
                                    <button className='uppercase'>Kembali</button>
                                </Link>
                                {loading ?
                                    <button
                                        disabled
                                        type="submit"
                                        className={` ${(!isValid || !dirty) ? 'bg-gray-300  rounded-lg px-8 py-2 text-gray-100 uppercase cursor-not-allowed w-full' : 'bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 transition duration-150 uppercase w-full'}`}
                                    >
                                        Proses...
                                    </button>
                                    :
                                    <button
                                        type="submit"
                                        className={` ${(!isValid || !dirty) ? 'bg-gray-300  rounded-lg px-8 py-2 text-gray-100 uppercase cursor-not-allowed w-full' : 'bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 transition duration-150 uppercase w-full'}`}
                                    >
                                        Tambah
                                    </button>
                                }
                            </div>

                        </form>
                    )
                }}
            </Formik>
        </div>
    )
}
