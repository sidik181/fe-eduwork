import { useEffect, useState } from "react"
import { getProfile } from "../app/api/auth"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice"

export const Profile = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const [profile, setProfile] = useState({})

    const fetchProfile = async () => {
        try {
            dispatch(setLoading())
            let { data } = await getProfile()
            setProfile(data)
        } catch (err) {
            console.error('Error fetch profile:', err);
        } finally {
            dispatch(unsetLoading())
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])
    return (
        <div className="text-black w-full mt-2 mr-4">
            <div className="flex justify-between items-center mb-3 flex-wrap">
                <h1 className="font-bold text-lg">Profil</h1>
                <Link to={`/account/edit/${profile._id}`}>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md">Edit Profil</button>
                </Link>
            </div>
            <table className="min-w-full divide-y divide-gray-200 mb-3">
                <colgroup>
                    <col style={{ width: '100px' }} />
                    <col style={{ width: '100px' }} />
                </colgroup>
                <tbody className="bg-white divide-y divide-gray-200 text-left">
                    {loading ? (
                        <>
                            <tr className="align-top">
                                <td className="py-2 px-4 border">Nama</td>
                                <td className="py-2 px-4 border">Loading...</td>
                            </tr>
                            <tr className="align-top">
                                <td className="py-2 px-4 border">Email</td>
                                <td className="py-2 px-4 border">Loading...</td>
                            </tr>
                            <tr className="align-top">
                                <td className="py-2 px-4 border">Hak Akses</td>
                                <td className="py-2 px-4 border">Loading...</td>
                            </tr>
                        </>
                    ) : (
                        <>
                            <tr className="align-top">
                                <td className="py-2 px-4 border">Nama</td>
                                <td className="py-2 px-4 border">{profile.full_name}</td>
                            </tr>
                            <tr className="align-top">
                                <td className="py-2 px-4 border">Email</td>
                                <td className="py-2 px-4 border">{profile.email}</td>
                            </tr>
                            <tr className="align-top">
                                <td className="py-2 px-4 border">Hak Akses</td>
                                <td className="py-2 px-4 border">{profile.role}</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div >
    )
}
