import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';

import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {

  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().email().required().label('Email'),
    password: Joi.string().min(5).required().label('Password'),
    name: Joi.string().required().label('Name')
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const response = await userService.register(data);
      // store token
      auth.loginWithJwt(response.headers['x-auth-token']);
      // redirect to homepage
      // this.props.history.replace('/');
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // updating the state will display the error as a validation error
        this.setState(state => {
          const errors = { ...state.errors };
          // assign the error message received from the server
          errors.username = ex.response.data;
          return { errors };
        });
      }
    }
  };

  render() {
    return (
      <div className="mx-auto form-container">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          { this.renderInput('username', 'Email') }
          { this.renderInput('password', 'Password', 'password') }
          { this.renderInput('name', 'Name') }
          <div className="mb-2" >
            <Link to="/login" tabIndex="-1">
              Already have an account? Click here!
            </Link>
          </div>
          { this.renderButton('Confirm') }
        </form>
      </div>
    );
  }
}

export default RegisterForm;
