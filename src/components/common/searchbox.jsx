import React from 'react';

const SearchBox = ({text, onSearch}) => {
  return (
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
};

export default SearchBox;
