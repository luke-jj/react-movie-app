import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Joi from 'joi-browser';
import styled from 'styled-components';

import Spinner from './common/spinner';
import { getThread, getPosts, createPost } from '../services/forumService';

class Thread extends Component {

  state = {
    data: { text: '' },
    errors: {},
    submitting: false,
    thread: { lastReply: {}, user: {} },
    posts: []
  }

  schema = {
    text: Joi.string().min(1).max(32767).required()
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleChange = (e) => {
    const data = { ...this.state.data };
    data.text = e.currentTarget.value.trim();
    this.setState({ data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) {
      return;
    }

    const { text } = this.state.data;
    e.currentTarget.reset();
    this.setState({ submitting: true });
    const { data: post } = await createPost(this.state.thread._id, { text });

    this.setState(state => {
      return {
        posts: [
          ...state.posts,
          post
        ],
        submitting: false
      };
    });
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    Promise.all([getThread(id), getPosts(id)])
      .then(result => {
        this.setState({
          thread: result[0].data,
          posts: [ ...result[1].data ],
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.props.history.replace('/not-found');
        }
      });
  }

  formatDate(date) {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm a")
  }

  render() {
    const { thread, posts, errors, submitting } = this.state;

    if (!thread.title) {
      return <Spinner />;
    }

    return (
      <ThreadWrapper className="container pt-5">
        <div className="card mb-3">
          <div className="card-header">
            <h3>{thread.title}</h3>
            <small>
              by {thread.user.name} - {this.formatDate(thread.date)}
            </small>
          </div>
          <div className="card-body">
            <p className="card-text">{thread.text}</p>
          </div>
        </div>
        {
          posts.map(post => {
            const lines = post.text.split(/(\r\n|\n|\r)/gm);

            return (
              <div className="card mb-3" key={post._id}>
                <div className="card-header">
                  <small>
                    by {post.user.name} - {this.formatDate(post.date)}
                  </small>
                </div>
                <div className="card-body">
                  <div className="card-text">
                    { lines.map((line, index) => <p key={index}>{line}</p>) }
                  </div>
                </div>
              </div>
            );
          })
        }
        { this.props.user ? (
          <form className="m-5" onSubmit={this.handleSubmit}>
            <fieldset disabled={submitting}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Reply<br/>Text</span>
                </div>
                <textarea
                  className="form-control"
                  onChange={this.handleChange}
                  rows="4"
                  aria-label="Text">
                </textarea>
              </div>
              <div>
                { errors.text &&
                  <div className="alert alert-danger">{errors.text}</div>
                }
              </div>
              <div className="m-3">
                <button
                  type="submit"
                  className="btn btn-primary float-right">Post Reply</button>
              </div>
            </fieldset>
          </form>
        ) : (
          <div className="text-center">
            <Link to="/login">
              <button className="btn btn-outline-primary ">
                Login To Reply
              </button>
            </Link>
          </div>
        )}
      </ThreadWrapper>
    );
  }
}

export const ThreadWrapper = styled.div`
  width: 800px;
  margin: 70px auto 120px;
`;

export default Thread;
