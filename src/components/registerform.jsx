import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import * as userService from '../services/userService';

class RegisterForm extends Form {

  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().email().required().label('Username'),
    password: Joi.string().min(5).required().label('Password'),
    name: Joi.string().required().label('Name')
  };

  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        // assign the error message received from the server
        errors.username = ex.response.data;
        // updating the state will display the error as a validation error
        this.setState(state => {
          return { errors };
        });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          { this.renderInput('username', 'Username') }
          { this.renderInput('password', 'Password', 'password') }
          { this.renderInput('name', 'Name') }
          { this.renderButton('Register') }
        </form>
      </div>
    );
  }
}

export default RegisterForm;
