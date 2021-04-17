// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getIncomes, updateIncomeCol } from '../../../actions/incomeActions';
// Import components
import CheckboxEntry from '../../inputs/checkboxEntry';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({ income: state.income })

class ColSelect extends Component {
  // Check for income retrieval
  componentDidMount(){ this.props.getIncomes();  };
  // Define prop types
  static propTypes = {
    getIncomes: PropTypes.func.isRequired,
    updateIncomeCol: PropTypes.func.isRequired,
    income: PropTypes.object.isRequired
  }
  // change the visible columns when checked
  onChange = e => {
    const col = {name: e.target.name, text: e.target.value, view: e.target.checked}
    this.props.updateIncomeCol(col); };

  render() {
    const { columns } = this.props.income;
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

export default connect(mapStateToProps, { getIncomes, updateIncomeCol })(ColSelect);
