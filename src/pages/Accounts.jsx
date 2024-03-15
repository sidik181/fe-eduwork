import { Outlet } from 'react-router-dom'
import { SidebarAccount } from '../components/SidebarAccount'
import { Header } from '../components/Header'

export const Accounts = () => {
    return (
        <>
            <Header />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className='border'>
                    <div className='text-black px-4 py-3 bg-slate-300'>
                        <h1 className="text">Akun</h1>
                    </div>
                    <div className='flex gap-4 overflow-x-auto'>
                        <SidebarAccount />
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
