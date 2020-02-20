import React, { Component } from 'react';

class Bookmarks extends Component {

  render() {
    const { bookmarks } = this.props;
    console.log(bookmarks);

    return (
      <div>
        <h2>Bookmarks</h2>
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
