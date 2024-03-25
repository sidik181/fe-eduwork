import { Link, useNavigate } from "react-router-dom"
import { userLogout } from "../app/features/auth/authSlice"
import { useDispatch } from "react-redux"
import { logoutUser } from "../app/api/auth"
import { clearCartState } from "../app/features/cart/cartSlice"

export const SidebarAccount = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logoutUser()
        dispatch(userLogout())
        dispatch(clearCartState())
        navigate('/')
    }

    return (
        <div className="text-black">
            <ul>
                <Link to={'/account'}>
                    <li className="border py-2 px-4 w-80 cursor-pointer hover:bg-slate-100 active:text-white active:bg-blue-500">Profil</li>
                </Link>
            </ul>
            <ul>
                <Link to={'orders'}>
                    <li className="border py-2 px-4 w-80 cursor-pointer hover:bg-slate-100 active:text-white active:bg-blue-500">Pemesanan</li>
                </Link>
            </ul>
            <ul>
                <Link to={'address'}>
                    <li className="border py-2 px-4 w-80 cursor-pointer hover:bg-slate-100 active:text-white active:bg-blue-500">Alamat Pengiriman</li>
                </Link>
            </ul>
            <ul>
                <li onClick={handleLogout} className="border py-2 px-4 w-80 cursor-pointer hover:bg-slate-100 active:text-white active:bg-blue-500">Logout</li>
            </ul>
        </div>
    )
}
