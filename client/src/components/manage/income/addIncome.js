// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { addIncome } from '../../../actions/incomeActions';
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
  income: state.income
})

class AddIncome extends Component {
  // Make a state to hold the income in creation
  state = { category: "Grocery",
            source: "",
            value: null,
            date: currentDate(),
            addSource: false,
          };
  // Define prop types
  static propTypes = {
    addIncome: PropTypes.func,
    income: PropTypes.object.isRequired
  }
  categories = ["Job", "Stimulus", "Lucky Find", "Windfall"];
  // Prevent default submission and create the new income
  onSubmit = (e) => {
    e.preventDefault();
    // Validate entries

    // Create a new income
    const newIncome = {
      category: this.state.category,
      source: this.state.source,
      value:    this.state.value,
      date:     this.state.date + ' 00:00:00'
    }
    // Send the new income to the server/state to be added
    this.props.addIncome(newIncome);
    // Hide the form on submission
    this.props.toggleAdd();
  };
  // Set the state variables to the entered values
  onChange = e => { this.setState({ [e.target.name]: e.target.value }) };
  onAddSrc = () => { this.setState({ addSource: !this.state.addSource }) };
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
       <OptionalTextEntry id="source"
                          onText="Src"
                          offText="Source"
                          value={this.state.source}
                          toggle={this.state.addSource}
                          onToggle={this.onAddSrc}
                          onChange={this.onChange}/>
        <div className="mb-4"></div>
        <button type="submit" className={submitClasses}>
          <GiCheckMark />
          <p className="ml-2">Save Income</p>
        </button>
      </form>
    );
  }
};

export default connect(mapStateToProps, { addIncome })(AddIncome);
