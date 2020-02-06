import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import { login } from '../services/authService';

class LoginForm extends Form {

  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      const { data } = await login(username, password);
      localStorage.setItem('token', data);
      this.props.history.replace('/');
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
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          { this.renderInput('username', 'Username') }
          { this.renderInput('password', 'Password', 'password') }
          { this.renderButton('Login') }
        </form>
      </div>
    );
  }
}

export default LoginForm;
