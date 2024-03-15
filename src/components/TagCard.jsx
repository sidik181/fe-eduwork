import { TagIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

export const TagCard = ({ tags, onClick }) => {
    const product = useSelector(state => state.products);
    return (
        <>
            {
                tags.map((tag, index) => {
                    return (
                        <div key={index} onClick={() => onClick(tag.name)} className={` ${product.tags?.includes(tag.name) ? 'bg-blue-600 text-white' : 'bg-gray-300'} cursor-pointer flex rounded items-center px-1.5 py-1 mr-2`}>
                            <TagIcon className="h-4 w-4" />
                            <span className="ml-1 text-xs">{tag.name}</span>
                        </div>
                    );
                })
            }
        </>
    );
};


TagCard.propTypes = {
    tags: PropTypes.array,
    onClick: PropTypes.func
}
