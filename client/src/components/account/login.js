import React, { Component } from 'react';
// Connect redux to manage the state
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formClasses, labelClasses, submitClasses, inputClasses } from '../tailwinds';

class Login extends Component {
  state = { email: "", password: "" };

  // Attempt to login
  onSubmit = (e) => {
    e.preventDefault();
    console.log("new user test");
  }
  // Set the state variables to the entered values
  onChange = e => { this.setState({ [e.target.name]: e.target.value }) };

  render () {
    return (
      <section className="mt-6 flex flex-col items-center mb-6">
        <form className={formClasses + "w-full sm:w-1/2"} onSubmit={this.onSubmit}>
          <div className="w-full bg-gray-900 p-4 rounded-t-md border-b border-green-900">
            <h2 className="font-bold font-medium text-sm text-blue-200 text-center">Login</h2>
          </div>
          <div className="p-4">
            <div className="mb-1 grid justify-items-stretch">
              <label className={labelClasses} for="email">Email:</label>
              <input className={inputClasses} id="email" name="email" type="email" onChange={this.onChange} />
            </div>
            <div className="mb-4 grid justify-items-stretch">
              <label className={labelClasses} for="password">Password:</label>
              <input className={inputClasses} id="password" name="password" type="password" onChange={this.onChange} />
            </div>
            <button className={submitClasses} type="submit">
              <p className="">Login</p>
            </button>
          </div>
        </form>
      </section>
    );
  }
};

export default Login;
