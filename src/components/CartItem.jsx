import { Link } from "react-router-dom"
import { formatPrice } from '../utils';
import { useDispatch, useSelector } from "react-redux";
import { updateProductQuantityState } from "../app/features/cart/cartSlice";
import { deleteCartItem, loadCart, updateCartAsync } from "../app/features/cart/cartService";
import { ToastContainer, toast } from "react-toastify";

export const CartItem = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items)

    const subTotal = cart.reduce((sum, item) => sum + item.sub_total, 0);

    const incrementCart = async (product) => {
        let qtyUpdated = product.qty + 1;
        await dispatch(updateCartAsync({ id: product._id, qty: qtyUpdated })).unwrap()
            .then(() => {
                dispatch(updateProductQuantityState({ id: product._id, qty: qtyUpdated }));
                dispatch(loadCart())
                toast.success(`Berhasil menambah jumlah pesanan ${product.name}`);
            })
            .catch((error) => {
                toast.error(`Gagal menambah jumlah pesanan ${product.name}. ${error}`);
            });
    };

    const decrementCart = async (product) => {
        let qtyUpdated = Math.max(product.qty - 1, 1);
        await dispatch(updateCartAsync({ id: product._id, qty: qtyUpdated })).unwrap()
            .then(() => {
                dispatch(updateProductQuantityState({ id: product._id, qty: qtyUpdated }));
                dispatch(loadCart())
                toast.success(`Berhasil menambah jumlah pesanan ${product.name}`);
            })
            .catch((error) => {
                toast.error(`Gagal menambah jumlah pesanan ${product.name}. ${error}`);
            });
    };

    const handleRemoveProductFromCart = async product => {
        await dispatch(deleteCartItem({ id: product._id })).unwrap()
            .then(() => {
                dispatch(loadCart())
                toast.success(`Berhasil menghapus product ${product.name} dari keranjang`);
            })
            .catch((error) => {
                toast.error(`Gagal menghapus product ${product.name}. ${error}`);
            });
    };

    return (
        <div className="text-black w-full">
            <ToastContainer />
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
                    {cart.length > 0 ?
                        cart.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td className="border text-[16px] py-1">
                                    <button onClick={() => handleRemoveProductFromCart(item)}>Delete</button>
                                </td>
                                <td className="border text-[16px] py-1">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSgpp2qhJYt_UKXsy4Dsctl3K_1TTr84XuA&usqp=CAU" alt={item.name} />
                                </td>
                                <td className="border text-[16px] py-1">{item.name}</td>
                                <td className="border text-[16px] py-1">{formatPrice(item.price)}</td>
                                <td className="border text-[16px] py-1">
                                    <button disabled={item.qty === 1} onClick={() => decrementCart(item)} className="border px-[10px] font-semibold bg-blue-400 text-white">-</button>
                                    <span className="text-lg mx-5">{item.qty}</span>
                                    <button onClick={() => incrementCart(item)} className="border px-[10px] font-semibold bg-blue-400 text-white">+</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="mb-3 py-2 px-4 border text-md font-semibold">
                                         Tidak ada barang di keranjang anda.!
                                    <Link to="/" className="ml-1 text-blue-700 underline">
                                             Mulai belanja
                                    </Link>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            <Link to={'/shipping-address'}>
                <button className='block bg-blue-600 py-1 text-white rounded-md text-center w-full'>Checkout</button>
            </Link>
        </div>
    )
}
