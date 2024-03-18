import { Link } from "react-router-dom"
import { formatPrice } from '../utils';
import { deleteCart, editCart, getCarts } from "../app/api/cart";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateQuantity } from "../app/features/cart/actions";
import { useEffect, useState } from "react";

export const CartItem = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const cartItems =  useSelector(state => state.cart)
    console.log(cartItems)

    // const cart = useSelector(state => state.cart)
    // console.log(cart)

    // const loadCartData = () => {
    //     const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    //     setProducts(cartData);
    // };

    // useEffect(() => {
    //     loadCartData();
    // }, []);

    // const reloadCartData = async () => {
    //     await getCarts();
    //     loadCartData();
    // };

    const subTotal = products.reduce((sum, item) => sum + item.sub_total, 0);

    const incrementCart = async (productId, qty) => {
        let qtyUpdated = qty + 1;
        dispatch(updateQuantity(productId, qtyUpdated));
        await editCart(productId, qtyUpdated);
        // await reloadCartData();
    };

    const decrementCart = async (productId, qty) => {
        let qtyUpdated = Math.max(qty - 1, 1);
        dispatch(updateQuantity(productId, qtyUpdated));
        await editCart(productId, qtyUpdated);
        // await reloadCartData();
    };

    const handleRemoveProductFromCart = async productId => {
        dispatch(removeCartItem(productId));
        await deleteCart(productId);
        // await reloadCartData();
    };

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
                    {cartItems.length > 0 ?
                        cartItems.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td className="border text-[16px] py-1">
                                    <button onClick={handleRemoveProductFromCart(item._id)}>Delete</button>
                                </td>
                                <td className="border text-[16px] py-1">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSgpp2qhJYt_UKXsy4Dsctl3K_1TTr84XuA&usqp=CAU" alt={item.name} />
                                </td>
                                <td className="border text-[16px] py-1">{item.name}</td>
                                <td className="border text-[16px] py-1">{formatPrice(item.price)}</td>
                                <td className="border text-[16px] py-1">
                                    <button onClick={() => decrementCart(item._id, item.qty)} className="border px-[10px] font-semibold bg-blue-400 text-white cursor-pointer">-</button>
                                    <span className="text-lg mx-5">{item.qty}</span>
                                    <button onClick={() => incrementCart(item._id, item.qty)} className="border px-[10px] font-semibold bg-blue-400 text-white cursor-pointer">+</button>
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
                <span className='block bg-blue-600 py-1 text-white rounded-md text-center w-full cursor-pointer'>Checkout</span>
            </Link>
        </div>
    )
}
