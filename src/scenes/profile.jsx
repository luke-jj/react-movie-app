import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

import auth from '../services/authService';
import AuthContainer from '../components/authcontainer';
import Form from '../components/common/form';
import {
  getCurrentUserDetails,
  deleteCurrentUser
} from '../services/userService';

class Profile extends Form {
  state = {
    data: {
      name: '',
      email: '',
      isAdmin: false,
      password: '',
      passwordRepeat: ''
    },
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

    this.setState(state => ({
      data: Object.assign({}, { ...state.data }, data)
    }));
  }

  handleSubmit = () => {
    // TODO: implement user update
    console.log('submitting');
  };

  async handleDelete() {
    try {
      await deleteCurrentUser();
      auth.logout();
      window.location = '/';
    } catch (ex) {
      toast('Something went wrong or not authorized to delete this account.');
    }
  }

  render() {
    if (!auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <AuthContainer className="container pt-5">
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
        <button
          disabled={!this.props.user}
          className="btn btn-danger mt-5"
          data-toggle="modal"
          data-target="#deleteModal"
          type="button"
        >
          Delete Account
        </button>

        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteUserModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="deleteUserModal"
                >
                  User Account Deletion
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to leave?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  No, I want to stay.
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.handleDelete}
                >
                  Yes, delete my account.
                </button>
              </div>
            </div>
          </div>
        </div>
      </AuthContainer>
    );
  }
};

export default Profile;
