import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({text, onSearch}) => (
  <div className="input-group my-3">
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={text}
      onChange={e => onSearch(e.currentTarget.value)}
    />
  </div>
);

SearchBox.propTypes = {
  text: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default SearchBox;
