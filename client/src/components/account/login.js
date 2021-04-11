// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect } from 'react-router-dom';
// Import server actions
import { login } from '../../actions/authActions';
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

class Login extends Component {
  // Initialize the component's state for each form field
  state = { email: "", password: "" };
  // Define prop types
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }
  // On form submission, attempt to log in
  onSubmit = (e) => {
    e.preventDefault();
    // Validate entries

    // Attempt logging in
    const currentUser = {
      email:    this.state.email,
      password: this.state.password
    };
    this.props.login(currentUser);
  }
  // Set the state variables to the entered values
  onChange = e => { this.setState({ [e.target.name]: e.target.value }) };

  render () {
    return (
      <section className="mt-6 flex flex-col items-center mb-6">
        <form className={cardContainerClasses + "w-full sm:w-1/2"} onSubmit={this.onSubmit}>
          <div className="rounded-t-lg p-2 shadow-2xl">
            <h2 className={headerTextClasses}>
              Login
            </h2>
          </div>
          <div className={hrCenterClasses}></div>
          <div className="p-4">
            <TextEntry id="email"
                       text="Email"
                       type="email"
                       onChange={this.onChange} />
            <TextEntry id="password"
                       text="Password"
                       type="password"
                       onChange={this.onChange} />
            <button className={submitClasses+"mt-6"} type="submit">
              <p className="">Login</p>
            </button>
          </div>
        </form>
        {this.props.isAuthenticated && <Redirect to="/manage" />}
      </section>
    );
  }
};

export default connect(mapStateToProps, { login })(Login);
