import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

import forumService from '../services/forumService';
import Table from '../components/common/table';
import Spinner from '../components/common/spinner';

class Forum extends Component {
  state = {
    threads: [ { user: {}, lastReply: {}, } ],
    sortColumn: { order: 'asc', path: 'title' },
    loading: true
  };

  columns = [
    {
      path: 'title',
      key: 'title',
      label: 'Title',
      width: '200px',
      content: thread => (
        <Fragment>
          <Link to={`/forum/${thread._id}`}>{thread.title}</Link>
          <br />
          <small>by {thread.user.name}</small>
        </Fragment>
      )
    },
    {
      path: 'lastReply',
      key: 'lastReply',
      label: 'Last Reply',
      width: '230px',
      content: thread => (
        <small>
          { thread.lastReply.username ? (
            `by ${thread.lastReply.username}`
          ) : (
            '-'
          )}
          <br/>
          { thread.lastReply.date ? (
            this.formatDate(thread.lastReply.date)
          ) : (
            ''
          )}
        </small>
      )
    },
    {
      key: 'repliesCount',
      path: 'repliesCount',
      label: 'Replies',
      content: thread => <p className="pl-4">{thread.repliesCount}</p>
    },
    {
      key: 'delete',
      content: thread => (
        <button
          disabled={!this.props.user || !this.props.user.isAdmin}
          className="btn btn-danger btn-sm"
          onClick={() => this.handleDelete(thread)}
        >
          Delete
        </button>
      )
    }
  ];

  formatDate(date) {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
  }

  async componentDidMount() {
    const { data: threads } = await forumService.getThreads();
    this.setState({ threads, loading: false });
  }

  handleDelete = async thread => {
    const originalThreads = this.state.threads;

    this.setState(state => {
      const threads = this.state.threads.filter(t => t._id !== thread._id);

      return { threads };
    });

    try {
      await forumService.deleteThread(thread._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('This thread does not exist or has already been deleted.');
      }

      this.setState({ threads: originalThreads });
    }
  };

  handleSort = (sortColumn) => this.setState(state => ({ sortColumn }));

  render() {
    return (
      <div>
        <ToastContainer />
        <div className="d-flex justify-content-between">
          <h2 className="mb-4">Forum</h2>
          { this.props.user ? (
            <Link to="/forum/new">
              <button className="btn btn-primary mb-4">
                Create New Thread
              </button>
            </Link>
          ) : (
            <button className="btn btn-primary mb-4 disabled">
              Create New Thread
            </button>
          )}
        </div>
        { this.state.loading ? (
          <Spinner />
        ) : (
          <Table
            sortColumn={this.state.sortColumn}
            columns={this.columns}
            data={this.state.threads}
            onSort={this.handleSort}
          />
        )}
      </div>
    );
  }
}

export default Forum;
