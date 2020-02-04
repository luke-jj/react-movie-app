import React, { Component } from 'react';
import axios from 'axios';

import Table from './common/table';

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

axios.interceptors.responses.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log('Logging the error.', error);
    alert('an unexpected error occurred.');
  }

  return Promise.reject(error);
});

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


  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleCreate = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await axios.post(apiEndpoint, obj);

    this.setState(prevState => {
      return {
        posts: [
          post,
          ...prevState.posts
        ]
      };
    });
  };

  handleUpdate = async post => {
    post.title = 'UPDATED';
    await axios.put(`${apiEndpoint}/${post.id}`, post);
    // axios.patch(`${apiEndpoint}/${post.id}`, { title: post.title });

    this.setState(prevState => {
      const posts = [...prevState.posts];
      const index = posts.indexOf(post);
      posts[index] = {...post};

      return { posts };
    });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    this.setState(prevState => {
      const posts = this.state.posts.filter(p => p.id !== post.id);

      return { posts };
    });

    try {
      await axios.delete(`${apiEndpoint}/${post.id}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert('This post does not exist or has already been deleted.');
      }

      this.setState({ posts: originalPosts });
    }
  };

  handleSort = (sortColumn) => {
    this.setState(prevState => {
      return { sortColumn };
    });
  };

  render() {
    return (
      <div>
        <button className="btn btn-primary mb-3" onClick={this.handleCreate}>
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
