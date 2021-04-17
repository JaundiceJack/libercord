// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { editIncome, getIncomes } from '../../../actions/incomeActions';
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
  income: state.income
})

class EditIncome extends Component {
  // Check for income retrieval
  componentDidMount(){ this.props.getIncomes(); };
  componentWillReceiveProps(nextProps) {
    const {selectedIncome} = nextProps.income;
    this.setState({
      category: selectedIncome.category,
      location: selectedIncome.location,
      value:    selectedIncome.value,
      name:     selectedIncome.name,
      date:     inputDate(selectedIncome.date),
      addLoc:   selectedIncome.location ? true : false,
      addName:  selectedIncome.name ? true : false
    })
  }
  // Make a state to hold the selected income's info for editing
  state = {
    category: this.props.income.selectedIncome.category,
    location: this.props.income.selectedIncome.location,
    value:    this.props.income.selectedIncome.value,
    name:     this.props.income.selectedIncome.name,
    date:     inputDate(this.props.income.selectedIncome.date),
    addLoc:   this.props.income.selectedIncome.location ? true : false,
    addName:  this.props.income.selectedIncome.name ? true : false
  };
  // Define prop types
  static propTypes = {
    getIncomes: PropTypes.func.isRequired,
    editIncome: PropTypes.func.isRequired,
    income: PropTypes.object.isRequired
  }

  // TODO: get the categories from the state
  categories = ["Grocery", "Gas", "Rent", "Dining Out"];

  // Prevent default submission and create the new income
  onSubmit = (e) => {
    e.preventDefault();
    // Validate entries

    // Create an income from the entries
    const edits = {
      _id:      this.props.income.selectedIncome._id,
      category: this.state.category,
      location: this.state.location,
      name:     this.state.name,
      value:    this.state.value,
      date:     this.state.date + ' 00:00:00'
    }
    // Send the new income to the server/state to be added
    this.props.editIncome(edits);
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

export default connect(mapStateToProps, { editIncome, getIncomes })(EditIncome);
