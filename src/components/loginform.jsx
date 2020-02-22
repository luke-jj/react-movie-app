import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Joi from 'joi-browser';

import auth from '../services/authService';
import Form from './common/form';

class LoginForm extends Form {

  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
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
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="form-container mx-auto">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          { this.renderInput('username', 'Email') }
          { this.renderInput('password', 'Password', 'password') }
          <div className="mb-2">
            <Link to="/register" tabIndex="-1">
              Not registered yet? Click here!
            </Link>
          </div>
          { this.renderButton('Login') }
        </form>
      </div>
    );
  }
}

export default LoginForm;
