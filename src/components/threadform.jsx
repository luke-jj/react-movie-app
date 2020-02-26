import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import { ThreadWrapper } from './thread';
import { saveThread } from '../services/forumService';

class ThreadForm extends Form {

  state = {
    data: {},
    genres: [],
    errors: {},
    submitting: false
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(2).max(255).required(),
    text: Joi.string().min(16).max(32767).required(),
  };

  doSubmit = async () => {
    this.setState({ submitting: true });
    const { data: thread } = await saveThread(this.state.data);
    this.props.history.push(`/forum/${thread._id}`);
  }

  render() {
    return (
      <ThreadWrapper>
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={this.state.submitting}>
            { this.renderInput('title', 'Title') }
            { this.renderTextarea('text', 'Text', 8) }
            { this.renderButton('Create Thread') }
          </fieldset>
        </form>
      </ThreadWrapper>
    );
  }
};

export default ThreadForm;
