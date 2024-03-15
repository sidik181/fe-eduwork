import { Link } from "react-router-dom"

export const UnAuthenticated = () => {
    return (
        <div className="text-black min-h-screen flex flex-col justify-center text-center align-middle">
            <h1 className="text-center font-bold text-9xl text">4 0 1</h1>
            <p className="my-5 text-2xl">Kamu belum login, silakan login terlebih dahulu</p>
            <p className="text-xl">Ke halaman
                <Link to={'/login'} className="ml-1 text-blue-800 underline">
                    <span>login</span>
                </Link>
            </p>
        </div>
    )
}