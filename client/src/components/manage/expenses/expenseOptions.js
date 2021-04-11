// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getExpenses } from '../../../actions/expenseActions';
// Import components
import AddExpense from './addExpense';
import ColSelect from './expenseCols';
// Import style presets
import {
  buttonClasses,
  cardContainerClasses,
  headerTextClasses,
  hrCenterClasses } from '../../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  expense: state.expense
})

class ExpenseOptions extends Component {
  // Check for expense retrieval
  componentDidMount(){ this.props.getExpenses();  };
  // Set a state to toggle expense addition
  state = { adding: false, editCols: false, editSel: false }
  // Define prop types
  static propTypes = {
    getExpenses: PropTypes.func.isRequired,
    expense: PropTypes.object.isRequired
  }
  // When a button is clicked, set the corresponding state
  onAdd = () => this.setState({adding: !this.state.adding});
  onColEdit = () => this.setState({editCols: !this.state.editCols});


  render() {
    const { expenses } = this.props.expense;
    return (
      <div className={cardContainerClasses+"col-span-5 sm:col-span-1 p-2 self-start"}>
        <div className="flex flex-col p-2">
          {!this.state.editCols && !this.state.editSel &&
            <button onClick={this.onAdd}
              className={this.state.adding ?
                buttonClasses+"mb-2 border-red-500 text-red-500" :
                buttonClasses+"mb-2 py-4 border-green-500 text-blue-100 "}>
              {this.state.adding ? "Cancel" : "New Expense"}
            </button>
          }
          {this.state.adding &&
            <AddExpense toggleAdd={this.onAdd}/>
          }
          {!this.state.adding && !this.state.editSel &&
            <button onClick={this.onColEdit}
              className={this.state.editCols ?
                buttonClasses+"mb-2 border-green-500 text-blue-100" :
                buttonClasses+"mb-2 border-blue-300 text-blue-100 "}>
              {this.state.editCols ? "Ok" : "Show/Hide Columns"}
            </button>
          }
          {this.state.editCols &&
            <ColSelect toggleAdd={this.onAdd}/>
          }
          {!this.state.adding && !this.state.editCols &&
            <button onClick={this.onAdd}
              className={this.state.editing ?
                buttonClasses+"border-red-500 text-red-500" :
                buttonClasses+"border-blue-300 text-blue-100 "}>
              {this.state.editing ? "Cancel" : "Edit Selected"}
            </button>
          }
          {this.state.editSel &&
            <AddExpense toggleAdd={this.onAdd}/>
          }
          {!this.state.adding && !this.state.editCols && !this.state.editSel &&
            <button onClick=""
              className={buttonClasses+" mt-6 border-red-500 text-blue-100"}>
              Delete Selected
            </button>
          }

        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, { getExpenses })(ExpenseOptions);
