// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { addExpense } from '../../../actions/expenseActions';
// Import components
import CurrencyEntry from '../../inputs/currencyEntry';
import SelectEntry from '../../inputs/selectEntry';
import DateEntry from '../../inputs/dateEntry';
import OptionalTextEntry from '../../inputs/optionalTextEntry';
// Import style presets
import { labelClasses, submitClasses, inputClasses, selectClasses, buttonClasses } from '../../tailwinds';
// Import icons
import { GiCheckMark } from 'react-icons/gi';
// Import a helper function for date inputs
import { currentDate } from '../../helpers';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  expense: state.expense
})

// so i'd like to put pill-like labels next to user inputs
// but i also want the inputs to work standalone
// the easiest way is to just make multiple components
// so, one component will be a labeled text entry,
// another would be a standalone text entry,
// then move the checkboxes into a component,
// maybe a labeled and standalone select component


class AddExpense extends Component {
  // Make a state to hold the expense in creation
  state = { category: "Grocery",
            location: "",
            value: null,
            date: currentDate(),
            addLoc: false,
            addName: false
          };
  // Define prop types
  static propTypes = {
    addExpense: PropTypes.func,
    expense: PropTypes.object.isRequired
  }
  categories = ["Grocery", "Gas", "Rent", "Dining Out"];
  // Prevent default submission and create the new expense
  onSubmit = (e) => {
    e.preventDefault();
    // Validate entries

    // Create a new expense
    const newExpense = {
      category: this.state.category,
      location: this.state.location,
      name:     this.state.name,
      value:    this.state.value,
      date:     this.state.date + ' 00:00:00'
    }
    // Send the new expense to the server/state to be added
    this.props.addExpense(newExpense);
    // Hide the form on submission
    this.props.toggleAdd();
  };
  // Set the state variables to the entered values
  onChange = e => { this.setState({ [e.target.name]: e.target.value }) };
  onAddLoc = () => { this.setState({ addLoc: !this.state.addLoc }) };
  onAddName = () => { this.setState({ addName: !this.state.addName }) };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="flex flex-col">
        <div className="mb-4"></div>
        <SelectEntry id="category"
                     text="Type"
                     value={this.state.category}
                     onChange={this.onChange}
                     options={this.categories} />


        <CurrencyEntry id="value"
                       text="Paid"
                       value={this.state.value}
                       onChange={this.onChange} />
        <DateEntry id="date"
                   text="Date"
                   value={this.state.date}
                   onChange={this.onChange} />
       <OptionalTextEntry id="location"
                          onText="Loc"
                          offText="Location"
                          value={this.state.location}
                          toggle={this.state.addLoc}
                          onToggle={this.onAddLoc}
                          onChange={this.onChange}/>
       <OptionalTextEntry id="name"
                         onText="Name"
                         offText="Name"
                         value={this.state.name}
                         toggle={this.state.addName}
                         onToggle={this.onAddName}
                         onChange={this.onChange}/>
        <div className="mb-4"></div>
        <button type="submit" className={submitClasses}>
          <GiCheckMark />
          <p className="ml-2">Save Expense</p>
        </button>
      </form>
    );
  }
};

export default connect(mapStateToProps, { addExpense })(AddExpense);
