import { Link } from "react-router-dom"

export const SidebarSettings = () => {
    return (
        <div className="text-black">
            <ul>
                <Link to={'/settings'}>
                    <li className="border py-2 px-4 w-80 cursor-pointer hover:bg-slate-100 active:text-white active:bg-blue-500">Produk</li>
                </Link>
            </ul>
            <ul>
                <Link to={'categories'}>
                    <li className="border py-2 px-4 w-80 cursor-pointer hover:bg-slate-100 active:text-white active:bg-blue-500">Kategori</li>
                </Link>
            </ul>
            <ul>
                <Link to={'tags'}>
                    <li className="border py-2 px-4 w-80 cursor-pointer hover:bg-slate-100 active:text-white active:bg-blue-500">Tag</li>
                </Link>
            </ul>
            <ul>
                <Link to={'users'}>
                    <li className="border py-2 px-4 w-80 cursor-pointer hover:bg-slate-100 active:text-white active:bg-blue-500">User</li>
                </Link>
            </ul>
        </div>
    )
}
