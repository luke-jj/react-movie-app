import React, { Component } from 'react';

import Table from './common/table';

class Posts extends Component {

  state = {
    posts: [ {id: '123', title: 'blah'} ],
    sortColumn: { order: 'asc', path: 'title' }
  };

  columns = [
    { path: 'title', label: 'Title'},
    { key: 'update', content: (item) => <button className="btn btn-info btn-sm" onClick={() => this.handleUpdate(item)}>Update</button> },
    { key: 'delete', content: (item) => <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(item)}>Delete</button> },
  ];

  handleAdd = () => {
    console.log('adding post..');
  };

  handleUpdate = post => {
    console.log('updating post..', post);
  };

  handleDelete = post => {
    console.log('deleting post..', post);
  };

  handleSort = (sortColumn) => {
    this.setState(prevState => {
      return { sortColumn };
    });
  };

  render() {
    return (
      <div>
        <button className="btn btn-primary mb-3" onClick={this.handleAdd}>
          Create New Thread
        </button>
        <Table
          sortColumn={this.state.sortColumn}
          columns={this.columns}
          data={this.state.posts}
          onSort={this.handleSort}
        />
      </div>
    );
  }
}

export default Posts;
