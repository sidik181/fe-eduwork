import { Link } from "react-router-dom"
// import { addToCartOrUpdateQuantity } from '../app/features/cart/actions';
import { formatPrice } from '../utils';

export const CartItem = () => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]')
    const subTotal = products.reduce((sum, item) => sum + item.sub_total, 0)
    // const item = items.find(i => i.product._id === product._id);
    // const qty = item.qty;

    const incrementCart = () => {
        // dispatch(addToCartOrUpdateQuantity(product, qty + 1))
    }

    const decrementCart = () => {
        // dispatch(addToCartOrUpdateQuantity(product, Math.max(qty - 1, 1)))
    }

    return (
        <div className="text-black w-full">
            <h1 className="text-xl font-bold">{`Sub Total: ${formatPrice(subTotal)}`}</h1>
            <table className="w-full mt-5 mb-10 text-lg">
                <thead>
                    <tr>
                        <th className="border p-3 font-semibold">Aksi</th>
                        <th className="border p-3 font-semibold">Gambar</th>
                        <th className="border p-3 font-semibold">Nama Produk</th>
                        <th className="border p-3 font-semibold">Harga</th>
                        <th className="border p-3 font-semibold">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ?
                        products.map((product, index) => (
                            <tr key={index} className="text-center">
                                <td className="border text-[16px] py-1">
                                    <button>Delete</button>
                                </td>
                                <td className="border text-[16px] py-1">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSgpp2qhJYt_UKXsy4Dsctl3K_1TTr84XuA&usqp=CAU" alt={product.name} />
                                </td>
                                <td className="border text-[16px] py-1">{product.name}</td>
                                <td className="border text-[16px] py-1">{formatPrice(product.price)}</td>
                                <td className="border text-[16px] py-1">
                                    <span onClick={decrementCart} className="border px-[10px] font-semibold bg-blue-400 text-white cursor-pointer">-</span>
                                    <span className="text-lg mx-5">{product.qty}</span>
                                    <span onClick={incrementCart} className="border px-[10px] font-semibold bg-blue-400 text-white cursor-pointer">+</span>
                                    </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="mb-3 py-2 px-4 border text-md font-semibold">
                                         Tidak ada barang di keranjang anda.!
                                    <Link to="/" className="ml-3 text-blue-700 underline">
                                             Mulai belanja
                                    </Link>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            <Link to={'/shipping-address'}>
                <span className='block bg-blue-600 py-1 text-white rounded-md text-center w-full cursor-pointer'>Checkout</span>
            </Link>
        </div>
    )
}
