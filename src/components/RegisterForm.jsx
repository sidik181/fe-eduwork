import { Link} from "react-router-dom"
import logoURL from "../assets/logo.png"
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from 'yup'
import { register } from "../app/api/auth"
import { Form, Formik } from "formik"
import { ToastContainer, toast } from "react-toastify"
import { CustomInput } from "./ComponentForm"

export function RegisterForm() {
    const initialState = {
        email: '',
        password: '',
    }

    const loading = useSelector(state => state.loading)
    const [errorMessage, setErrorMessage] = useState('')

    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Nama lengkap harus diisi'),
        email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
        password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
        confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Password tidak sama').required('Konfirmasi password harus diisi'),
    })

    const onSubmit = async (values, { resetForm }) => {
        dispatch(setLoading())
        const { data } = await register(values)
        if (data.error) {
            setErrorMessage(data.message)
            toast.error(`Gagal menambahkan user. ${data.message}`)
        } else {
            setErrorMessage('')
            toast.success(`Berhasil menambahkan user ${data.name}`)
            resetForm()
        }
        unsetLoading()
    }
    return (
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <ToastContainer />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to={'/'}>
                    <img
                        className="mx-auto w-auto"
                        src={logoURL}
                        alt="Jejualan"
                    />
                </Link>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Daftarkan diri anda
                </h2>
                {errorMessage ?
                    <h2 className="mt-5 text-center text-md text-red-600">{errorMessage}</h2> : ''
                }
            </div>
            <div className={`${errorMessage ? 'mt-5' : 'mt-10'} text-left sm:mx-auto sm:w-full sm:max-w-sm`}>
                <Formik
                    initialValues={initialState}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isValid, dirty }) => (
                        <Form autoComplete='off' noValidate>
                            <div className='grid flex-row gap-2'>
                                <CustomInput
                                    label="Nama Lengkap:"
                                    name="fullname"
                                    type="text"
                                    placeholder="Masukkan nama anda"
                                />
                                <CustomInput
                                    label="Email (Username):"
                                    name="email"
                                    type="email"
                                    placeholder="Masukkan email anda"
                                />
                                <CustomInput
                                    label="Password:"
                                    name="password"
                                    type="password"
                                    placeholder="Masukkan password anda"
                                />
                                <CustomInput
                                    label="Konfirmasi Passowrd:"
                                    name="confirm_password"
                                    type="password"
                                    placeholder="Masukkan password anda kembali"
                                />
                                {loading ? (
                                    <button
                                        disabled
                                        type="submit"
                                        className='bg-blue-500 mt-3 w-full hover:bg-blue-700 cursor-not-allowed rounded-md px-8 py-2 text-center uppercase'
                                    >
                                        Proses ...
                                    </button>
                                ) : (
                                    <button
                                        disabled={!isValid || !dirty}
                                        type="submit"
                                        className='bg-blue-500 mt-3 hover:bg-blue-700 rounded-md px-8 py-2 text-center uppercase'
                                    >
                                        Daftar
                                    </button>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Sudah punya akun?
                    <a href="login" className="font-semibold ml-1 leading-6 text-indigo-600 hover:text-indigo-500">
                        Login!
                    </a>
                </p>
            </div>
        </div>
    )
}
