import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setLoading, unsetLoading } from '../app/features/loading/actions'
import { editTag, getTagById } from '../app/api/tag'
import { ToastContainer, toast } from 'react-toastify'


export const EditTag = () => {
    const { idTag } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(state => state.loading)

    const [initialValue, setIntialValue] = useState({
        tag_name: '',
    })

    const validationSchema = Yup.object().shape({
        tag_name: Yup.string().required('Nama tag wajib diisi'),
    })

    const fetchTags = async () => {
        try {
            const { data } = await getTagById(idTag)
            setIntialValue({
                tag_name: data.name,
            })
        } catch (err) {
            console.error(`Error fetching data tag, ${err}`)
        }
    }
    const onSubmit = async values => {
        try {
            dispatch(setLoading())
            await editTag(idTag, {
                name: values.tag_name
            })
            toast.success(`Tag ${values.tag_name} berhasil diedit`);
            navigate('/settings/tags')
        } catch (err) {
            toast.error(`Gagal mengedit ${values.tag_name}. ${err}`)
        } finally {
            dispatch(unsetLoading())
        }
    }

    useEffect(() => {
        fetchTags()
    }, [])
    return (
        <div className='w-full mr-4'>
            <ToastContainer />
            <h1 className="mb-3 text-black font-bold text-lg mt-2">Edit Tag</h1>
            <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize>
                {({ values, handleChange, handleSubmit, handleBlur, errors, touched, dirty, isValid }) => {
                    return (
                        <form onSubmit={handleSubmit} className="text-sm">
                            <div className="flex flex-col">
                                <label htmlFor="tag_name" className="text-gray-700">Nama Tag</label>
                                <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.tag_name} name="tag_name" id="tag_name" className="bg-white mt-2 p-2 border border-gray-300 rounded text-sm text-gray-900" placeholder="Masukkan nama kategori"></input>
                                {touched.tag_name && errors.tag_name && <div style={{ color: 'red' }}> {errors.tag_name}</div>}
                            </div>
                            <div className="my-4 w-full flex items-center justify-center space-x-4">
                                <Link to={'/settings/tags'} className='bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-center w-full'>
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
                                        Edit
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
