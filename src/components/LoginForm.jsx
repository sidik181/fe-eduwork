import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logoURL from "../assets/logo.png"
import { loginUser } from "../app/api/auth"
import { useDispatch } from "react-redux"
import { userLogin } from "../app/features/auth/actions"
import { Formik } from 'formik'
import * as Yup from 'yup'

export function LoginForm() {
    const initialState = {
        email: '',
        password: '',
    }

    const statusList = {
        idle: 'idle',
        process: 'process',
        success: 'success',
        error: 'error'
    }

    const [status, setStatus] = useState(statusList.idle)
    const [errorMessage, setErrorMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
        password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
    })

    const onSubmit = async (values, {resetForm}) => {
        setStatus(statusList.process)
        const { data } = await loginUser(values)
        if (data.error) {
            setErrorMessage(data.message)
            setStatus(statusList.error)
        } else {
            const  { token, user } = data
            dispatch(userLogin({ user, token }));
            setErrorMessage('')
            resetForm()
            navigate('/')
        }
        setStatus(statusList.success)
    }
    return (
        <div className="flex flex-1 flex-col min-h-full justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to={'/'}>
                    <img
                        className="mx-auto w-auto"
                        src={logoURL}
                        alt="Jejualan"
                    />
                </Link>
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login ke akun anda
                </h1>
                {errorMessage ?
                    <h2 className="mt-5 text-center text-md text-red-600">{errorMessage}</h2> : ''
                }
            </div>
            <div className={`${errorMessage ? 'mt-5' : 'mt-10'} text-left sm:mx-auto sm:w-full sm:max-w-sm`}>
                <Formik initialValues={initialState} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {({ values, handleChange, handleSubmit, handleBlur, touched, errors }) => {
                        return (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Alamat email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            autoComplete="email"
                                            className="block w-full bg-gray-300 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {touched.email && errors.email && <div style={{ color: 'red' }}> {errors.email}</div>}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Kata sandi
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            autoComplete="current-password"
                                            className="block w-full bg-gray-300 p-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {touched.password && errors.password && <div style={{ color: 'red' }}> {errors.password}</div>}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={status === statusList.process}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {status === statusList.process ? 'Loading...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        )
                    }}
                </Formik>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Belum punya akun?{' '}
                    <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Daftar di sini!
                    </a>
                </p>
            </div>
        </div>
    )
}
