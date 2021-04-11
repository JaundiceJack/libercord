// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect } from 'react-router-dom';
// Import server actions
import { register } from '../../actions/authActions';
// Import components
import TextEntry from '../inputs/textEntry';
// Import style presets
import {
  accountFormClasses,
  labelClasses,
  submitClasses,
  inputClasses,
  cardContainerClasses,
  headerTextClasses,
  hrCenterClasses } from '../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

class CreateAccount extends Component {
  // Initialize the component's state for each form field
  state = { name: "", email: "", password: "", pass2: "" };
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
          <div className={hrCenterClasses}></div>
          <div className="p-4">
            <TextEntry id="name"     text="Username" onChange={this.onChange} />
            <TextEntry id="email"    text="Email"    onChange={this.onChange} type="email" />
            <TextEntry id="password" text="Password" onChange={this.onChange} type="password" />
            <TextEntry id="pass2"    text="Confirm Password"
              onChange={this.onChange} type="password" />
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
