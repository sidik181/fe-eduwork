import { CartItem } from "../components/CartItem"
import { Header } from "../components/Header"

export const Cart = () => {
    return (
        <>
            <Header />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className='min-w-full border'>
                    <div className='text-black px-4 py-3 bg-slate-300'>
                        <h1 className="text">Keranjang Belanja</h1>
                    </div>
                    <div className='overflow-x-auto p-4 flex items-center justify-center gap-4'>
                        <CartItem />
                    </div>
                </div>
            </div>
        </>
    )
}
