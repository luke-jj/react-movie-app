import React from 'react';

const Input = ({ name, label, type, value, error, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      className="form-control"
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
    { error && <div className="alert alert-danger">{error}</div> }
  </div>
);

export default Input;
