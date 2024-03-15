import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, unsetLoading } from '../app/features/loading/actions'
import { ToastContainer, toast } from 'react-toastify'
import { addDeliveryAddress } from '../app/api/deliveryAddress'
import { CustomInput, SelectInput, TextArea } from './ComponentForm'
import { getCities, getDistricts, getProvinces, getSubDisctricts } from '../app/api/wilayah'


export const AddAddress = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)

    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])
    const [subDistricts, setSubDistricts] = useState([])

    const initialState = {
        nama_alamat_pengiriman: '',
        nama_jalan: '',
        detail: '',
        provinsi: '',
        kabupaten_kota: '',
        kecamatan: '',
        kelurahan_desa: ''
    }

    const validationSchema = Yup.object().shape({
        nama_alamat_pengiriman: Yup.string().required('Nama alamat wajib diisi'),
        nama_jalan: Yup.string().required('Nama jalan wajib diisi'),
        detail: Yup.string().required('Detail alamat harus diisi'),
        provinsi: Yup.string().required('Provinsi harus diisi'),
        kabupaten_kota: Yup.string().required('Kabupaten/Kota harus diisi'),
        kecamatan: Yup.string().required('Kecamatan harus diisi'),
        kelurahan_desa: Yup.string().required('Kelurahan/Desa harus diisi'),
    })

    const fetchProvinces = async () => {
        try {
            const { data } = await getProvinces()
            setProvinces(data.value.map((province) => ({
                id: province.id,
                name: province.name
            })));
        } catch (error) {
            console.error(error);
        }
    }

    const fetchCities = async idProvince => {
        try {
            const { data } = await getCities(idProvince)
            setCities(data.value.map((city) => ({
                id: city.id,
                name: city.name
            })));
        } catch (error) {
            console.error(error);
        }
    }

    const fetchDistricts = async idCity => {
        try {
            const { data } = await getDistricts(idCity)
            setDistricts(data.value.map((district) => ({
                id: district.id,
                name: district.name
            })));
        } catch (error) {
            console.error(error);
        }
    }

    const fetchSubDistricts = async idDistrict => {
        try {
            const { data } = await getSubDisctricts(idDistrict)
            setSubDistricts(data.value.map((subDistrict) => ({
                id: subDistrict.id,
                name: subDistrict.name
            })));
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = async values => {
        try {
            dispatch(setLoading())
            await addDeliveryAddress({
                nama_alamat_pengiriman: values.nama_alamat_pengiriman,
                nama_jalan: values.nama_jalan,
                detail: values.detail,
                provinsi: values.provinsi,
                kabupaten_kota: values.kabupaten_kota,
                kecamatan: values.kecamatan,
                kelurahan: values.kelurahan_desa
            })
            toast.success(`Berhasil menambahkan alamat pengiriman`)
            navigate('/account/address')
        } catch (err) {
            toast.error(`Gagal menambahkan ${err.message}`)
        } finally {
            dispatch(unsetLoading())
        }
    }

    useEffect(() => {
        fetchProvinces()
    }, [])
    return (
        <div className='w-full mr-4 mb-4'>
            <ToastContainer />
            <h1 className="mb-3 text-black font-bold text-lg mt-2">Tambah Alamat Pengiriman</h1>
            <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ isValid, dirty, values, handleChange }) => (
                    <Form autoComplete='off' noValidate>
                        <div className='grid grid-cols-2 gap-4'>
                            <CustomInput
                                label="Nama Alamat Pengiriman:"
                                name="nama_alamat_pengiriman"
                                type="text"
                                placeholder="Masukkan nama alamat"
                            />
                            <CustomInput
                                label="Nama Jalan:"
                                name="nama_jalan"
                                type="text"
                                placeholder="Masukkan nama jalan"
                            />
                            <div className="col-span-2">
                                <TextArea
                                    label="Detail Alamat Pengiriman:"
                                    name="detail"
                                    type="text-area"
                                    rows="4"
                                    placeholder="Masukkan deskripsi produk"
                                />
                            </div>
                            <SelectInput
                                label="Pilih Provinsi:"
                                name="provinsi"
                                placeholder="Pilih Provinsi"
                                onChange={(e) => {
                                    handleChange(e);
                                    const selectedId = e.target.value;
                                    fetchCities(selectedId)
                                }}
                            >
                                <option disabled value="">Pilih Provinsi</option>
                                {provinces?.map((province, i) => (
                                    <option key={province.id} value={province.id}>{province.name}</option>
                                ))}
                            </SelectInput>
                            <SelectInput
                                label="Pilih Kabupaten/Kota:"
                                name="kabupaten_kota"
                                placeholder="Pilih Kabupaten/Kota"
                                onChange={(e) => {
                                    handleChange(e);
                                    const selectedId = e.target.value;
                                    fetchDistricts(selectedId)
                                }}
                                disabled={!values.provinsi}
                            >
                                <option disabled value="">Pilih Kabupaten/Kota</option>
                                {cities?.map((city, i) => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </SelectInput>
                            <SelectInput
                                label="Pilih Kecamatan:"
                                name="kecamatan"
                                placeholder="Pilih Kecamatan"
                                onChange={(e) => {
                                    handleChange(e);
                                    const selectedId = e.target.value;
                                    fetchSubDistricts(selectedId)
                                }}
                                disabled={!values.kabupaten_kota}
                            >
                                <option disabled value="">Pilih Kecamatan</option>
                                {districts?.map((district, i) => (
                                    <option key={district.id} value={district.id}>{district.name}</option>
                                ))}
                            </SelectInput>
                            <SelectInput
                                label="Pilih Kelurahan/Desa:"
                                name="kelurahan_desa"
                                placeholder="Pilih Kelurahan/Desa"
                                disabled={!values.kecamatan}
                            >
                                <option disabled value="">Pilih Kelurahan/Desa</option>
                                {subDistricts?.map((subDistrict, i) => (
                                    <option key={subDistrict.id} value={subDistrict.id}>{subDistrict.name}</option>
                                ))}
                            </SelectInput>
                        </div>
                        <div className='grid grid-cols-2 gap-4 mt-4'>
                            <Link
                                to={'/account/address'}
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
