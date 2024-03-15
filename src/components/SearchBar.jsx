import PropTypes from 'prop-types';

export const SearchBar = ({ onChange }) => {
  const handleChange = e => {
    onChange(e);
  }

  return (
    <div className="flex mx-3">
      <input
        onChange={handleChange}
        type="text"
        placeholder="Cari Produk...."
        className="border-2  w-32 lg:w-52 bg-white py-1 px-3 rounded-md text-sm focus:outline-none text-black"
      />
    </div>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func
}
