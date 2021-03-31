import { GiCheckMark } from 'react-icons/gi';

// Connect redux to manage the state
import { connect } from 'react-redux';
import { addAsset } from '../../../actions/assetActions.js';
import PropTypes from 'prop-types';

import React, { Component } from 'react';

import { formClasses, labelClasses, submitClasses, inputClasses, selectClasses } from '../../tailwinds';

class AddAsset extends Component {
  // Make a state to hold the asset in creation
  state = { name: "", category: "Cryptocurrency", amount: "", interest: ""};
  categories = ["Cryptocurrency", "Precious Metals", "Stocks", "Real Estate"];
  // Prevent default submission and create the new asset
  onSubmit = (e) => {
    e.preventDefault();
    const newAsset = {
      name:     this.state.name,
      category: this.state.category,
      amount:   this.state.amount,
      interest: this.state.interest
    }
    // Send the new asset to the server/state to be added
    this.props.addAsset(newAsset);
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
          <p className="ml-2">Save Asset</p>
        </button>
      </form>
    );
  }
};


AddAsset.propTypes = {
  addAsset: PropTypes.func,
  asset: PropTypes.object.isRequired
}

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  asset: state.asset
})

export default connect(mapStateToProps,
   { addAsset })
   (AddAsset);
