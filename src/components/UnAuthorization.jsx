import { Link } from "react-router-dom"

export const UnAuthorization = () => {
    return (
        <div className="text-black min-h-screen flex flex-col justify-center text-center align-middle">
            <h1 className="text-center font-bold text-9xl text">4 0 3</h1>
            <p className="my-5 text-2xl">Kamu tidak berhak mengakses halaman tersebut, silakan kembali</p>
            <p className="text-xl">Ke halaman
                <Link to={'/'} className="ml-1 text-blue-800 underline">
                    <span>utama</span>
                </Link>
            </p>
        </div>
    )
}