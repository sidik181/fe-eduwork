import { Formik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, unsetLoading } from '../app/features/loading/loadingSlice'
import { editProfile, getProfile } from '../app/api/auth'


export const EditProfile = () => {
    const { idProfile } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(state => state.loading)

    const [initialValue, setInitialValue] = useState({
        fullname: '',
        password: '',
        confirm_password: '',
    })

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Nama alamat wajib diisi'),
        password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
        confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Password tidak sama').required('Konfirmasi password harus diisi'),
    })

    const fetchDataProfile = async () => {
        try {
            const { data } = await getProfile(idProfile);
            setInitialValue((prevState) => ({
                ...prevState,
                fullname: data.full_name || '',
                password: '',
                confirm_password: '',
            }));
        } catch (err) {
            console.error(`Error fetching data profile: ${err}`);
        }
    };

    const onSubmit = async values => {
        try {
            dispatch(setLoading())
            await editProfile(idProfile, {
                full_name: values.fullname,
                password: values.password,
            })
            toast.success(`Profil berhasil diedit.`);
            navigate('/account')
        } catch (err) {
            toast.error(`Gagal mengedit. ${err}`)
        } finally {
            dispatch(unsetLoading())
        }
    }

    useEffect(() => {
        fetchDataProfile()
    }, [])
    return (
        <div className='w-full mr-4'>
            <ToastContainer />
            <h1 className="mb-3 text-black font-bold text-lg mt-2">Edit Profil</h1>
            <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize>
                {({ values, handleChange, handleSubmit, handleBlur, errors, touched, dirty, isValid }) => {
                    return (
                        <form onSubmit={handleSubmit} className="text-sm">
                            <div className='columns-2 gap-5'>
                                <div className="flex flex-col">
                                    <label htmlFor="fullname" className="text-gray-700">Nama Lengkap</label>
                                    <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.fullname} name="fullname" id="fullname" className="bg-white mt-2 p-2 border border-gray-300 rounded text-sm text-gray-900" placeholder="Masukkan nama lengkap"></input>
                                    {touched.fullname && errors.fullname && <div style={{ color: 'red' }}> {errors.fullname}</div>}
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password" className="text-gray-700">Password</label>
                                    <input type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" id="password" className="bg-white mt-2 p-2 border border-gray-300 rounded text-sm text-gray-900" placeholder="Masukkan password"></input>
                                    {touched.password && errors.password && <div style={{ color: 'red' }}> {errors.password}</div>}
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="confirm_password" className="text-gray-700">Ulangi Password</label>
                                    <input type="password" onChange={handleChange} onBlur={handleBlur} value={values.confirm_password} name="confirm_password" id="confirm_password" className="bg-white mt-2 p-2 border border-gray-300 rounded text-sm text-gray-900" placeholder="Masukkan ulang password"></input>
                                    {touched.confirm_password && errors.confirm_password && <div style={{ color: 'red' }}> {errors.confirm_password}</div>}
                                </div>
                            </div>
                            <div className="my-4 w-full flex items-center justify-center space-x-4">
                                <Link to={'/account'} className='bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-center w-full'>
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
