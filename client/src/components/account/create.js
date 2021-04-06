// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect } from 'react-router-dom';
// Import server actions
import { register } from '../../actions/authActions';
// Import style presets
import { accountFormClasses, labelClasses, submitClasses, inputClasses } from '../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

const cardContainerClasses =
  "rounded-xl border-l border-gray-700 " +
  "bg-gradient-to-br from-gray-900 to-black  ";

const headerTextClasses =
  "bg-clip-text text-transparent font-semibold text-2xl text-center " +
  "bg-gradient-to-b from-gray-100 to-blue-400 ";

const hrClasses =
  "h-px w-full bg-gradient-to-r from-transparent via-yellow-600 to-transparent";

class CreateAccount extends Component {
  // Initialize the component's state for each form field
  state = { name: "", email: "", password: "", confPassword: "" };
  // Define prop types
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  }
  // On form submission, attempt to create a new user
  onSubmit = e => {
    e.preventDefault();
    // Validate entries

    // Register the new user
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.register(newUser);
  }
  // Set the state variables to the entered values
  onChange = e => { this.setState({ [e.target.name]: e.target.value }) };

  render () {
    return (
      <section className="mt-6 flex flex-col items-center mb-6">
        <form className={cardContainerClasses + "w-full sm:w-1/2"} onSubmit={this.onSubmit}>
          <div className="rounded-t-lg p-2 shadow-2xl">
            <h2 className={headerTextClasses}>
              Create an Account
            </h2>
          </div>
          <div className={hrClasses}></div>
          <div className="p-4">
            <div className="mb-1 grid justify-items-stretch">
              <label className={labelClasses} for="username">Username:</label>
              <input className={inputClasses} id="username"
              name="name" type="text" onChange={this.onChange} />
            </div>
            <div className="mb-1 grid justify-items-stretch">
              <label className={labelClasses} for="email">Email:</label>
              <input className={inputClasses} id="email"
              name="email" type="email" onChange={this.onChange} />
            </div>
            <div className="mb-1 grid justify-items-stretch">
              <label className={labelClasses} for="password">Password:</label>
              <input className={inputClasses} id="password"
              name="password" type="password" onChange={this.onChange} />
            </div>
            <div className="mb-4 grid justify-items-stretch">
              <label className={labelClasses} for="confPassword">Confirm Password:</label>
              <input className={inputClasses} id="confPassword"
              name="confPassword" type="password" onChange={this.onChange} />
            </div>
            <button className={submitClasses} type="submit">
              <p className="">Create</p>
            </button>
          </div>
        </form>
        {this.props.isAuthenticated && <Redirect to="/manage" />}
      </section>
    );
  }
};

export default connect(mapStateToProps, { register })(CreateAccount);
