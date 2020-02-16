import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import http from '../services/httpService';
import Table from './common/table';
import config from '../config';

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
    const { data: posts } = await http.get(config.FORUM);
    this.setState({ posts });
  }

  handleCreate = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await http.post(config.FORUM, obj);

    this.setState(state => {
      return {
        posts: [
          post,
          ...state.posts
        ]
      };
    });
  };

  handleUpdate = async post => {
    post.title = 'UPDATED';
    await http.put(`${config.FORUM}/${post.id}`, post);
    // http.patch(`${apiEndpoint}/${post.id}`, { title: post.title });

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
      await http.delete(`${config.FORUM}/${post.id}`);
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
        <ToastContainer />
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
