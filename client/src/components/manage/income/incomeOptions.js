// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getIncomes } from '../../../actions/incomeActions';
// Import components
import AddIncome from './addIncome';
import EditIncome from './editIncome';
import DeleteIncome from './deleteIncome';
import ColSelect from './incomeCols';
// Import style presets
import {
  buttonClasses,
  cardContainerClasses,
  headerTextClasses,
  hrCenterClasses } from '../../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  income: state.income
})

class IncomeOptions extends Component {
  // Check for income retrieval
  componentDidMount(){ this.props.getIncomes();  };
  // Set a state to toggle income addition
  state = { adding: false,
            editing: false,
            deleting: false,
            editCols: false,
            editSel: false }
  // Define prop types
  static propTypes = {
    getIncomes: PropTypes.func.isRequired,
    income: PropTypes.object.isRequired
  }
  // When a button is clicked, set the corresponding state
  onAdd = () => this.setState({adding: !this.state.adding});
  onColEdit = () => this.setState({editCols: !this.state.editCols});
  onEdit = () => { if(this.props.income.selectedIncome)
                   this.setState({editing: !this.state.editing})};
  onDelete = () => { if(this.props.income.selectedIncome)
                     this.setState({deleting: !this.state.deleting})};

  render() {
    const { incomes } = this.props.income;
    const { selectedId } = this.props.income;
    return (
      <div className={cardContainerClasses+"col-span-5 sm:col-span-1 p-2 self-start"}>
        <div className="flex flex-col p-2">
          {/* Add New Income */}
          {!this.state.editCols &&
           !this.state.deleting &&
           !this.state.editing &&
            <button onClick={this.onAdd}
              className={this.state.adding ?
                buttonClasses+"mb-2 border-red-500 text-red-500" :
                buttonClasses+"mb-2 py-4 border-green-500 text-blue-100 "}>
              {this.state.adding ? "Cancel" : "New Income"}
            </button>
          }
          {this.state.adding &&
            <AddIncome toggleAdd={this.onAdd} />
          }

          {/* Edit Visible Columns */}
          {!this.state.adding &&
           !this.state.deleting &&
           !this.state.editing &&
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

          {/* Edit Selected Income */}
          {!this.state.adding &&
           !this.state.editCols &&
           !this.state.deleting &&
            <button onClick={this.onEdit}
              className={this.state.editing ?
                buttonClasses+"border-red-500 text-red-500" :
                buttonClasses+"border-blue-300 text-blue-100 "}>
              {this.state.editing ? "Cancel" : "Edit Selected"}
            </button>
          }
          {this.state.editing &&
            <EditIncome toggleEdit={this.onEdit} />
          }

          {/* Delete Selected Income */}
          {!this.state.adding &&
           !this.state.editCols &&
           !this.state.editing &&
            <button onClick={this.onDelete}
              className={this.state.deleting ?
                buttonClasses+"border-blue-500 text-blue-100" :
                buttonClasses+"mt-6 border-red-500 text-blue-100"}>
              {this.state.deleting ? "Cancel" : "Delete Selected"}
            </button>
          }
          {this.state.deleting &&
            <DeleteIncome toggleDelete={this.onDelete} />
          }

        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, { getIncomes })(IncomeOptions);
