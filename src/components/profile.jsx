import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';

import auth from '../services/authService';
import Form from './common/form';
import { getCurrentUserDetails } from '../services/userService';

class Profile extends Form {

  state = {
    data: { name: '', email: '', isAdmin: false, password: '', passwordRepeat: '' },
    errors: {}
  };

  schema = {
    name: Joi.string().required().label('Username'),
    email: Joi.string().required().label('Email'),
    isAdmin: Joi.boolean().label('Admin Status'),
    password: Joi.string().label('Password'),
    passwordRepeat: Joi.string().label('Repeat Password'),
  };

  async componentDidMount() {
    const { data } = await getCurrentUserDetails();

    this.setState(state => {
      const prevData =  { ...state.data };

      return {
        data: Object.assign({}, prevData, data)
      }
    });
  }

  handleSubmit = () => {
    // TODO: implement user update
    console.log('submitting');
  };

  render() {
    if (!auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="form-container">
        <h2>User Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={!this.props.user.isAdmin}>
            { this.renderInput('name', 'Username') }
            { this.renderInput('email', 'Email') }
            { this.renderInput('isAdmin', 'Admin Status') }
            { this.renderInput('password', 'Password', 'password') }
            { this.renderInput('passwordRepeat', 'Repeat Password', 'password') }
            { this.renderButton('Save') }
          </fieldset>
        </form>
      </div>
    );
  }
};

export default Profile;
