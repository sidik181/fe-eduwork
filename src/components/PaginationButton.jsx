import ReactPaginate from 'react-paginate';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage } from '../app/features/product/actions';


const PaginationButton = () => {
    const dispatch = useDispatch()

    const products = useSelector(state => state.products)

    const handlePageClick = data => {
        const selectedPage = data.selected + 1;
        dispatch(setPage(selectedPage));
        dispatch(fetchProducts());
    };

    return (
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel={
                    <span className='w-8 h-8 p-1 flex items-center justify-center bg-gray-300 rounded-md'>
                        <ArrowRightIcon />
                    </span>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={Math.ceil(products.totalItems / products.perPage)}
                previousLabel={
                    <span className='w-8 h-8 p-1 flex items-center justify-center bg-gray-300 rounded-md'>
                        <ArrowLeftIcon />
                    </span>
                }
                renderOnZeroPageCount={null}
                containerClassName='flex items-center justify-center gap-2 mt-8 mb-4'
                pageLinkClassName='block border-solid w-8 h-8 flex items-center justify-center rounded-md'
                pageClassName='hover:bg-gray-300 rounded-md'
                activeClassName='bg-blue-600 text-white rounded-md hover:bg-blue-600'
            />
        </div>
    )
}

export default PaginationButton
