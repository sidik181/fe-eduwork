import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCities, getDistricts, getProvinces, getSubDisctricts } from '../app/api/wilayah'
import { setLoading, unsetLoading } from '../app/features/loading/loadingSlice'
import { ToastContainer, toast } from 'react-toastify'
import { CustomInput, SelectInput, TextArea } from './ComponentForm'
import { editDeliveryAddress, getDeliveryAddressById } from '../app/api/deliveryAddress'


export const EditAddress = () => {
    const { idDeliveryAddress } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)

    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])
    const [subDistricts, setSubDistricts] = useState([])

    const [initialValues, setInitialValues] = useState({
        nama_alamat_pengiriman: '',
        nama_jalan: '',
        detail: '',
        provinsi: '',
        kabupaten_kota: '',
        kecamatan: '',
        kelurahan_desa: ''
    })

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

    const fetchDataDeliveryAddress = async () => {
        try {
            const { data } = await getDeliveryAddressById(idDeliveryAddress)
            setInitialValues({
                product_name: data.name,
                description: data.description,
                price: data.price,
                image: '',
                category: data.category.name,
                tags: data.tags.map(tag => tag.name)
            })
        } catch (err) {
            console.error(`Error fetching data product, ${err}`)
        }
    }

    const onSubmit = async values => {
        try {
            dispatch(setLoading())
            await editDeliveryAddress(idDeliveryAddress, {
                nama_alamat: values.nama_alamat,
                detail_alamat: values.detail_alamat,
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
        fetchDataDeliveryAddress()
        fetchProvinces()
    }, [])
    return (
        <div className='w-full mr-4 mb-4'>
            <ToastContainer />
            <h1 className="mb-3 text-black font-bold text-lg mt-2">Edit Alamat Pengiriman</h1>
            <Formik
                initialValues={initialValues}
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
                                value={initialValues.nama_alamat_pengiriman || ''}
                                placeholder="Masukkan nama alamat"
                            />
                            <CustomInput
                                label="Nama Jalan:"
                                name="nama_jalan"
                                type="text"
                                value={initialValues.nama_jalan || ''}
                                placeholder="Masukkan nama jalan"
                            />
                            <div className="col-span-2">
                                <TextArea
                                    label="Detail Alamat Pengiriman:"
                                    name="detail_alamat"
                                    type="text-area"
                                    rows="4"
                                    value={initialValues.detail_alamat || ''}
                                    placeholder="Masukkan deskripsi produk"
                                />
                            </div>
                            <SelectInput
                                label="Pilih Provinsi:"
                                name="provinsi"
                                value={initialValues.provinsi || ''}
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
                                value={initialValues.kabupaten_kota || ''}
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
                                value={initialValues.kecamatan || ''}
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
                                value={initialValues.kelurahan_desa || ''}
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
                                    Edit
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
