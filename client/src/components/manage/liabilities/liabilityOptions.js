import AddLiability from './addLiability.js';

// Connect redux to manage the state
import { connect } from 'react-redux';
import { getLiabilities } from '../../../actions/liabilityActions.js';
import PropTypes from 'prop-types';

import React, { Component } from 'react';

const buttonClasses =
  "mb-2 px-3 py-2 " +
  "font-bold font-medium text-sm  " +
  "rounded-xl border-b " +
  "bg-gradient-to-br from-black to-gray-700 " +
  "hover:bg-gradient-to-tl hover:from-gray-700 hover:to-black " +
  "focus:outline-none";

const summaryClasses =
  "self-start flex flex-col px-5 py-3 w-full " +
  "text-lg text-gray-100 text-center font-bold " +
  "rounded-lg border-b border-gray-500 " +
  "bg-gradient-to-br from-black to-gray-700 ";

class LiabilityOptions extends Component {
  // Check for liability retrieval
  componentDidMount(){ this.props.getLiabilities();  };
  state = { adding: false }
  onAdd = () => this.setState({adding: !this.state.adding});
  //total = liabilities.reduce((total, liability) => liability.value + total, 0).toFixed(2);

  render() {
    const { liabilities } = this.props.liability;
    return (
      <div className="w-full sm:w-1/4 flex flex-col sm:flex-row align-center sm:flex-col sm:mr-6 mb-6 sm:mb-0 p-3 bg-gradient-to-br from-gray-700 to-gray-500 rounded-md ring-2 ring-gray-500">
        <div className={summaryClasses}>
          <p>Total Value:</p>
          <p className="text-green-300">
            ${Intl.NumberFormat().format(liabilities.reduce((total, liability) => liability.value + total, 0).toFixed(2))}
          </p>
        </div>
        <div className="flex flex-col ml-0 mt-2 sm:mt-6">
          <button onClick={this.onAdd}
                  className={this.state.adding ? buttonClasses+" border-red-500 text-red-500 " : buttonClasses+" border-green-500 text-blue-100 "}>
                  {this.state.adding ? "Cancel" : "New Liability"}</button>
          {this.state.adding && <AddLiability toggleAdd={this.onAdd}/>}
        </div>
      </div>
    );
  }
};

//{!this.state.adding && <button className={buttonClasses+" border-yellow-500 text-blue-100 "}>Edit Currency</button>}

LiabilityOptions.propTypes = {
  getLiabilities: PropTypes.func.isRequired,
  liability: PropTypes.object.isRequired
}

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  liability: state.liability
})

export default connect(mapStateToProps,
  { getLiabilities })
  (LiabilityOptions);
