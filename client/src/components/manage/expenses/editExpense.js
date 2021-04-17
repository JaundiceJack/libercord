// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { editExpense, getExpenses } from '../../../actions/expenseActions';
// Import components
import CurrencyEntry from '../../inputs/currencyEntry';
import SelectEntry from '../../inputs/selectEntry';
import DateEntry from '../../inputs/dateEntry';
import OptionalTextEntry from '../../inputs/optionalTextEntry';
// Import style presets
import { labelClasses, submitClasses, inputClasses, selectClasses, buttonClasses } from '../../tailwinds';
// Import icons
import { GiCheckMark } from 'react-icons/gi';
import { inputDate } from '../../helpers';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  expense: state.expense
})

class EditExpense extends Component {
  // Check for expense retrieval
  componentDidMount(){ this.props.getExpenses(); };
  componentWillReceiveProps(nextProps) {
    const {selectedExpense} = nextProps.expense;
    this.setState({
      category: selectedExpense.category,
      location: selectedExpense.location,
      value:    selectedExpense.value,
      name:     selectedExpense.name,
      date:     inputDate(selectedExpense.date),
      addLoc:   selectedExpense.location ? true : false,
      addName:  selectedExpense.name ? true : false
    })
  }
  // Make a state to hold the selected expense's info for editing
  state = {
    category: this.props.expense.selectedExpense.category,
    location: this.props.expense.selectedExpense.location,
    value:    this.props.expense.selectedExpense.value,
    name:     this.props.expense.selectedExpense.name,
    date:     inputDate(this.props.expense.selectedExpense.date),
    addLoc:   this.props.expense.selectedExpense.location ? true : false,
    addName:  this.props.expense.selectedExpense.name ? true : false
  };
  // Define prop types
  static propTypes = {
    getExpenses: PropTypes.func.isRequired,
    editExpense: PropTypes.func.isRequired,
    expense: PropTypes.object.isRequired
  }

  // TODO: get the categories from the state
  categories = ["Grocery", "Gas", "Rent", "Dining Out"];

  // Prevent default submission and create the new expense
  onSubmit = (e) => {
    e.preventDefault();
    // Validate entries

    // Create an expense from the entries
    const edits = {
      _id:      this.props.expense.selectedExpense._id,
      category: this.state.category,
      location: this.state.location,
      name:     this.state.name,
      value:    this.state.value,
      date:     this.state.date + ' 00:00:00'
    }
    // Send the new expense to the server/state to be added
    this.props.editExpense(edits);
    // Hide the form on submission
    this.props.toggleEdit();
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
                          offText="Item Name"
                          value={this.state.name}
                          toggle={this.state.addName}
                          onToggle={this.onAddName}
                          onChange={this.onChange}/>
        <div className="mb-4"></div>
        <button type="submit" className={submitClasses}>
          <GiCheckMark />
          <p className="ml-2">Save Changes</p>
        </button>
      </form>
    );
  }
};

export default connect(mapStateToProps, { editExpense, getExpenses })(EditExpense);
