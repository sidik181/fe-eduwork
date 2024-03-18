import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, unsetLoading } from '../app/features/loading/loadingSlice'
import { addUser } from '../app/api/user'
import { ToastContainer, toast } from 'react-toastify'
import { CustomInput, SelectInput } from './ComponentForm'


export const AddUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)

    const initialState = {
        fullname: '',
        email: '',
        password: '',
        confirm_password: '',
        role: ''
    }

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Nama alamat wajib diisi'),
        email: Yup.string().email().required('Email harus diisi'),
        password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
        confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Password tidak sama').required('Konfirmasi password harus diisi'),
        role: Yup.string().oneOf(['admin', 'user'], 'Periksa lagi role yang anda input').required('Role harus diisi')
    })

    const onSubmit = async values => {
        try {
            dispatch(setLoading())
            await addUser({
                full_name: values.fullname,
                email: values.email,
                password: values.password,
                role: values.role
            })
            toast.success(`Berhasil menambahkan user`)
            navigate('/settings/users')
        } catch (err) {
            toast.error(`Gagal menambahkan ${err.message}`)
        } finally {
            dispatch(unsetLoading())
        }
    }


    return (
        <div className='w-full mr-4 mb-4'>
            <ToastContainer />
            <h1 className="mb-3 text-black font-bold text-lg mt-2">Tambah User</h1>
            <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty }) => (
                    <Form autoComplete='off' noValidate>
                        <div className='grid grid-cols-2 gap-4'>
                            <CustomInput
                                label="Nama User:"
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
                            <SelectInput
                                label="Pilih Role:"
                                name="role"
                            >
                                <option disabled value="">Pilih Role User</option>
                                <option value='admin'>Admin</option>
                                <option value='user'>User</option>
                            </SelectInput>
                        </div>
                        <div className='grid grid-cols-2 gap-4 mt-4'>
                            <Link
                                to={'/settings/users'}
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
