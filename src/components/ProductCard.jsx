import PropTypes from 'prop-types';
import { formatPrice } from '../utils';
import { TagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

export const Card = ({ product, auth, updateOrAddProductToCart }) => {
    const loadingAddCart = useSelector(state => state.cart.status)

    return (
        <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSgpp2qhJYt_UKXsy4Dsctl3K_1TTr84XuA&usqp=CAU" alt={product.name} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>
            <div className="mt-4 flex justify-between">
                <div className="text-left">
                    <h2 className="text-gray-900 mb-2 font-semibold">{product.name}</h2>
                    <p className="text-sm font-medium text-gray-900 mb-2">{product.category.name}</p>
                    <div className="mt-1 text-gray-500 flex">
                        {product.tags.map((tag, index) => (
                            <div className="bg-gray-300 rounded px-1.5 py-1 flex items-center mr-2" key={index}>
                                <TagIcon className="h-4 w-4" />
                                <span className="ml-1 text-xs">{tag.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-xl font-medium text-gray-700">{formatPrice(product.price)}</p>
            </div>
            <button disabled={!auth || loadingAddCart === 'loading'} onClick={() => auth && updateOrAddProductToCart(product)} className={`${auth ? 'bg-blue-800' : 'bg-gray-300 cursor-not-allowed'} h-10 w-full rounded-md mt-2 flex justify-center items-center`}>
                <ShoppingCartIcon className="h-7 w-7 text-white" />
            </button>
        </div>
    )
}

Card.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string,
        category: PropTypes.object,
        tags: PropTypes.array,
        price: PropTypes.number,
    }).isRequired,
    auth: PropTypes.shape({
        auth: PropTypes.object,
    }),
    updateOrAddProductToCart: PropTypes.func
};
