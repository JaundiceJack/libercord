// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getExpenses, updateExpenseCol } from '../../../actions/expenseActions';
// Import components
import CheckboxEntry from '../../inputs/checkboxEntry';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({ expense: state.expense })

class ColSelect extends Component {
  // Check for expense retrieval
  componentDidMount(){ this.props.getExpenses();  };
  // Define prop types
  static propTypes = {
    getExpenses: PropTypes.func.isRequired,
    updateExpenseCol: PropTypes.func.isRequired,
    expense: PropTypes.object.isRequired
  }
  // change the visible columns when checked
  onChange = e => {
    const col = {name: e.target.name, text: e.target.value, view: e.target.checked}
    this.props.updateExpenseCol(col); };

  render() {
    const { columns } = this.props.expense;
    return (
      <div className="mt-2">
        {columns.map(col => {
          return (
            <CheckboxEntry id={col.name}
                           text={col.text}
                           checked={col.view}
                           onChange={this.onChange} />
          )
        })}
      </div>
    );
  }
};

export default connect(mapStateToProps, { getExpenses, updateExpenseCol })(ColSelect);
