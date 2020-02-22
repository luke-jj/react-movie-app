import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {

  const getItemClasses = (item) => {
    let classes = 'list-group-item ';
    classes += selectedItem[valueProperty] === item[valueProperty] ? 'active' : '';

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
            >
              <button
                className="page-link"
                onClick={() => onItemSelect(item)}
              >
                <span>{item[textProperty]}</span>
              </button>
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
