import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = itemsCount / pageSize;

  // render nothing if just one page
  if (Math.ceil(pageCount) === 1) {
    return null;
  }

  const pages = _.range(1, pageCount + 1);

  return (
    <div>
      <ul className="pagination">
        {
          pages.map(page => {
            return (
              <li className={currentPage === page ? 'page-item active' : 'page-item'} key={page}>
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
