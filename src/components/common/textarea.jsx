import React from 'react';

const Textarea = ({ name, label, rows, value, error, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <textarea
      className="form-control"
      id={name}
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
    />
    { error && <div className="alert alert-danger">{error}</div> }
  </div>
);

export default Textarea;
