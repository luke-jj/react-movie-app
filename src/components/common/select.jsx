import React from 'react';

const Select = ({ name, label, type, value, error, items, onChange}) => {

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      >
        {
          items && items.map(item => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))
        }
      </select>
      { error && <div className="alert alert-danger">{error}</div> }
    </div>
  );
};

export default Select;
