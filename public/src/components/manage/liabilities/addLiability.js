// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { addLiability } from '../../../actions/liabilityActions';
// Import style presets
import { labelClasses, submitClasses, inputClasses, selectClasses } from '../../tailwinds';
// Import icons
import { GiCheckMark } from 'react-icons/gi';
// Import a helper function for date inputs
import { currentDate } from '../../../functions/dateFunctions';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  liability: state.liability
})

class AddLiability extends Component {
  // Make a state to hold the liability in creation
  state = { name: "", category: "Student Loan", value: null, date: currentDate()};
  // Define prop types
  static propTypes = {
    addLiability: PropTypes.func,
    liability: PropTypes.object.isRequired
  }
  categories = ["Student Loan", "Mortgage", "Tax"];
  // Prevent default submission and create the new liability
  onSubmit = (e) => {
    e.preventDefault();
    // Validate entries

    // Create a new liability
    const newLiability = {
      name:     this.state.name,
      category: this.state.category,
      value:    this.state.value,
      date:     this.state.date
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
      <form onSubmit={this.onSubmit} className="">
        <div className="mb-1 grid justify-items-stretch">
          <label className={labelClasses} for="value">Name:</label>
          <input id="name" className={inputClasses}
                 name="name" type="text" onChange={this.onChange}/>
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
          <label className={labelClasses} for="value">Total Value:</label>
          <input id="value" className={inputClasses} step="0.01"
                 name="value" type="number" min="0" value={this.state.value}
                 onChange={this.onChange}/>
        </div>
        <div className="mb-4 grid justify-items-stretch">
          <label className={labelClasses} for="date">Date:</label>
          <input className={inputClasses}
                 name="date" type="date" value={this.state.date}
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

export default connect(mapStateToProps, { addLiability })(AddLiability);
