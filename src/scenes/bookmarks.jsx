import React, { Component } from 'react';

class Bookmarks extends Component {

  render() {
    const { bookmarks } = this.props;

    return (
      <div>
        <h2>Watchlist</h2>
        <ul>
        {
          bookmarks.map(bookmark => <li key={bookmark._id}>{bookmark.title}</li>)
        }
        </ul>
      </div>
    );
  }
}

export default Bookmarks;
