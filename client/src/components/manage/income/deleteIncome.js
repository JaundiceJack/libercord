// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { deleteIncome, getIncomes } from '../../../actions/incomeActions';
// Import style presets
import { buttonClasses } from '../../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  income: state.income
})

class DeleteIncome extends Component {
  // Check for income retrieval
  componentDidMount(){ this.props.getIncomes();  };
  // Define prop types
  static propTypes = {
    getIncomes: PropTypes.func.isRequired,
    deleteIncome: PropTypes.func,
    income: PropTypes.object.isRequired
  }

  // Prevent default submission and create the new income
  onDelete = (e) => {
    e.preventDefault();
    // TODO: if no income is selected, indicate
    this.props.deleteIncome(this.props.income.selectedIncome._id);
    // Hide the form on submission
    this.props.toggleDelete();
  };


  render() {
    return (
      <button type="button"
              onClick={this.onDelete}
              className={buttonClasses+"mt-6 border-red-500 text-red-100"}>
        Delete Income
      </button>
    );
  }
};

export default connect(mapStateToProps, { getIncomes, deleteIncome })(DeleteIncome);
