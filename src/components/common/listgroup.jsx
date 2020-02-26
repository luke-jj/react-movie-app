import React from 'react';

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {
  const getItemClasses = (item) => {
    const active = selectedItem[valueProperty] === item[valueProperty]
      ? 'active'
      : '';

    return `list-group-item ${active}`;
  };

  return (
    <ul className="list-group">
      { items.map(item => (
        <li
          key={item[valueProperty]}
          className={getItemClasses(item)}
        >
          <button
            className="page-link"
            onClick={() => onItemSelect(item)}
          >
            <span>{item[textProperty]}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
