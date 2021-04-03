// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getLiabilities } from '../../../actions/liabilityActions';
// Import components
import AddLiability from './addLiability';
// Import style presets
import { buttonClasses, summaryClasses, tableFormContainerClasses } from '../../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  liability: state.liability
})

class LiabilityOptions extends Component {
  // Check for liability retrieval
  componentDidMount(){ this.props.getLiabilities();  };
  // Set a state to toggle liability addition
  state = { adding: false }
  // Define prop types
  static propTypes = {
    getLiabilities: PropTypes.func.isRequired,
    liability: PropTypes.object.isRequired
  }
  // When add liability is clicked, set the state to adding
  onAdd = () => this.setState({adding: !this.state.adding});

  render() {
    const { liabilities } = this.props.liability;
    return (
      <div className={tableFormContainerClasses}>
        <div className={summaryClasses}>
          <p>Total Value:</p>
          {/* Get the total liability value in dollars.cents format */}
          <p className="text-green-300">
            ${Intl.NumberFormat()
              .format(liabilities.reduce((total, liability) =>
                liability.value + total, 0).toFixed(2))
            }
          </p>
        </div>
        <div className="flex flex-col mt-2 sm:mt-6 p-2">
          <button onClick={this.onAdd}
                  className={this.state.adding ?
                    buttonClasses+" border-red-500 text-red-500 mb-8" :
                    buttonClasses+" border-green-500 text-blue-100 "}>
                  {this.state.adding ? "Cancel" : "New Liability"}
          </button>
          {this.state.adding && <AddLiability toggleAdd={this.onAdd}/>}
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, { getLiabilities })(LiabilityOptions);
