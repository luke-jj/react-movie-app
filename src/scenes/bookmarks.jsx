import React from 'react';
import PropTypes from 'prop-types';

const Bookmarks = ({ bookmarks }) => (
  <div className="container pt-5">
    <h2>Watchlist</h2>
    <ul>
    {
      bookmarks.map(bookmark => <li key={bookmark._id}>{bookmark.title}</li>)
    }
    </ul>
  </div>
);

Bookmarks.propTypes = {
  user: PropTypes.object,
  bookmarks: PropTypes.array.isRequired
};

export default Bookmarks;
