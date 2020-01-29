import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {

  const getItemClasses = (item) => {
    let classes = 'list-group-item ';
    classes += selectedItem === item ? 'active' : '';

    return classes;
  };

  return (
    <ul className="list-group">
      {
        items.map(item => {
          return (
            <li
              key={item[valueProperty]}
              className={getItemClasses(item)}
              onClick={() => onItemSelect(item)}
            >
              {item[textProperty]}
            </li>
          );
        })
      }
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
