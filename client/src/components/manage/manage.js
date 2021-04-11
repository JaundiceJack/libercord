// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect } from 'react-router-dom';
// Import the section selection
import ManageNav from './manageNav';
// Import the summary page
import Summary from './summary/summary';
// Import options
import AssetOptions from './assets/assetOptions';
import IncomeOptions from './income/incomeOptions';
import ExpenseOptions from './expenses/expenseOptions';
import LiabilityOptions from './liabilities/liabilityOptions';
// Import tables
import AssetTable from './assets/assetTable';
import IncomeTable from './income/incomeTable';
import ExpenseTable from './expenses/expenseTable';
import LiabilityTable from './liabilities/liabilityTable';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

class Manage extends Component {
  state = { section: 'summary' };
  static propTypes = { isAuthenticated: PropTypes.bool }
  // Switch to the clicked section of manage (summary/expenses/income/assets/liabilities)
  changeSection = nextSection => { this.setState({section: nextSection}); }

  render () {
    return (
      <div>
        {this.props.isAuthenticated ?
          <section className="pt-2 flex flex-col mb-6">
            <ManageNav currentSection={this.state.section} changeSection={this.changeSection} />
            {this.state.section === 'summary' &&
            <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
              <Summary />
            </div>
            }
            {this.state.section === 'expenses' &&
              <div className="grid grid-cols-5 gap-4 mt-6 sm:px-6">
                <ExpenseOptions />
                <ExpenseTable />
              </div>
            }
            {this.state.section === 'income' &&
              <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
                <IncomeOptions />
                <IncomeTable />
              </div>
            }
            {this.state.section === 'assets' &&
              <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
                <AssetOptions />
                <AssetTable />
              </div>
            }
            {this.state.section === 'liabilities' &&
              <div className="flex flex-col sm:flex-row items-start mt-6 sm:px-6">
                <LiabilityOptions />
                <LiabilityTable />
              </div>
            }
          </section> :
          <Redirect to="/" />
        }
      </div>
    );
  }
};

/*


 */

export default connect(mapStateToProps)(Manage);
