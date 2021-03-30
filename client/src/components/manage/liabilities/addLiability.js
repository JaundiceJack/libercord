import { GiCheckMark } from 'react-icons/gi';

// Connect redux to manage the state
import { connect } from 'react-redux';
import { addLiability } from '../../../actions/liabilityActions.js';
import PropTypes from 'prop-types';

import React, { Component } from 'react';


const formClasses =
  "flex flex-col mb-3 px-2 py-4 " +
  "rounded-md "

const labelClasses =
  "font-bold font-medium text-sm text-blue-200 "

const submitClasses =
  "flex flex-row items-center justify-center m-2 px-3 py-2 " +
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

const selectClasses =
  "my-1 p-2 border w-full border-gray-300 rounded-xl " +
  "text-gray-600 bg-white " +
  "hover:border-gray-400 focus:outline-none appearance-none ";

class AddLiability extends Component {
  // Make a state to hold the liability in creation
  state = { name: "", category: "Mortgage", value: 0, interest: 0, date: Date.now};
  categories = ["Mortgage", "Student Loan"];
  // Prevent default submission and create the new liability
  onSubmit = (e) => {
    e.preventDefault();
    const newLiability = {
      name:     this.state.name,
      category: this.state.category,
      value:   this.state.value,
      interest: this.state.interest,
      date: this.state.date
    }
    // Send the new liability to the server/state to be added
    this.props.addLiability(newLiability);
    // Hide the form on submission
    this.props.toggleAdd();
  };
  // Set the state variables to the entered values
  onChange = e => { this.setState({ [e.target.name]: e.target.value }) };

  render() {
    return (
      <form onSubmit={this.onSubmit} className={formClasses}>
        <div className="mb-1 grid justify-items-stretch">
          <label className={labelClasses} for="name">Name:</label>
          <input id="name"
                 className={inputClasses}
                 name="name" type="text" placeholder="Gold, Tesla, S&P, etc."
                 onChange={this.onChange}/>
        </div>
        <div className="mb-1 grid justify-items-stretch">
          <label className={labelClasses} for="cat">Category:</label>
          <div className="relative inline-flex">
            <svg className="w-2 h-2 absolute top-0 right-0 mr-4 mt-5 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 412 232">
              <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/>
            </svg>
            <select id="cat" className={selectClasses}
                    name="category" onChange={this.onChange} value={this.state.category}>
              {this.categories.map((option) => {
                return <option value={option}>{option}</option>
              })}
            </select>
          </div>
        </div>
        <div className="mb-1 grid justify-items-stretch">
          <label className={labelClasses} for="amount">Amount:</label>
          <input id="amount" className={inputClasses}
                 name="amount" type="number" min="0"
                 onChange={this.onChange}/>
        </div>
        <div className="mb-1 grid justify-items-stretch">
          <label className={labelClasses} for="interest">Interest (If Applicable):</label>
          <input className={inputClasses}
                 name="interest" type="number" min="0"
                 onChange={this.onChange}/>
        </div>
        <button type="submit" className={submitClasses}>
          <GiCheckMark />
          <p className="ml-2">Save Liability</p>
        </button>
      </form>
    );
  }
};


AddLiability.propTypes = {
  addLiability: PropTypes.func,
  liability: PropTypes.object.isRequired
}

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  liability: state.liability
})

export default connect(mapStateToProps,
   { addLiability })
   (AddLiability);
