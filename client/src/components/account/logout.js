import React, { Component } from 'react';

const formClasses =
  "flex flex-col mb-3 justify-items-center " +
  "rounded-md bg-gradient-to-bl from-gray-900 to-gray-700"

const labelClasses =
  "font-bold font-medium text-sm text-blue-200 "

const submitClasses =
  "flex flex-row items-center justify-center p-4 w-full " +
  "font-bold font-medium text-sm text-green-500 " +
  "rounded-xl border-b-2 border-green-400 cursor-pointer " +
  "bg-gradient-to-br from-gray-900 to-gray-700 " +
  "hover:text-green-400 hover:border-blue-400 " +
  "hover:bg-gradient-to-tl hover:from-gray-700 hover:to-gray-900 "

const inputClasses =
  "my-1 p-2 w-full " +
  "text-gray-600  " +
  "rounded-xl " +
  "bg-white " +
  "focus:outline-none focus:ring-4 ring-green-500 "

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
        <form className={formClasses} onSubmit={this.onSubmit}>
          <div className="w-full bg-gray-900 p-4 rounded-t-md border-b border-green-900">
            <h2 className="font-bold font-medium text-sm text-blue-200 text-center">Login:</h2>
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
