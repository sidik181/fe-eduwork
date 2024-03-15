import axios from 'axios'

const API_WILAYAH_URL = import.meta.env.VITE_API_WILAYAH_URL
const API_KEY_WILAYAH = import.meta.env.VITE_API_KEY_WILAYAH

export const getProvinces = async () => {
    return await axios.get(`${API_WILAYAH_URL}/wilayah/provinsi?api_key=${API_KEY_WILAYAH}`)
}

export const getCities = async idProvince => {
    return await axios.get(`${API_WILAYAH_URL}/wilayah/kabupaten?api_key=${API_KEY_WILAYAH}&id_provinsi=${idProvince}`)
}

export const getDistricts = async idCity => {
    return await axios.get(`${API_WILAYAH_URL}/wilayah/kecamatan?api_key=${API_KEY_WILAYAH}&id_kabupaten=${idCity}`)
}

export const getSubDisctricts = async idDistrict => {
    return await axios.get(`${API_WILAYAH_URL}/wilayah/kelurahan?api_key=${API_KEY_WILAYAH}&id_kecamatan=${idDistrict}`)
}
