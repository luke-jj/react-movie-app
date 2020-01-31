import React from 'react';

const Input = ({ name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
      />
      { error && <div className="alert alert-danger">{error}</div> }
    </div>
  );
};

export default Input;
