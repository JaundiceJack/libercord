// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getAssets } from '../../../actions/assetActions';
// Import components
import AddAsset from './addAsset';
// Import style presets
import { buttonClasses, summaryClasses, tableFormContainerClasses } from '../../tailwinds';

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  asset: state.asset
})

class AssetOptions extends Component {
  // Check for asset retrieval
  componentDidMount(){ this.props.getAssets();  };
  // Set a state to show or hide the asset adder
  state = { adding: false }
  // Define prop types
  static propTypes = {
    getAssets: PropTypes.func.isRequired,
    asset: PropTypes.object.isRequired
  }
  // When add asset is clicked, set the state to adding
  onAdd = () => this.setState({adding: !this.state.adding});

  render() {
    const { assets } = this.props.asset;
    return (
      <div className={tableFormContainerClasses}>
        <div className={summaryClasses}>
          <p>Total Value:</p>
          {/* Get the total asset value in dollars.cents format */}
          <p className="text-green-300">
            ${Intl.NumberFormat()
              .format(assets.reduce((total, asset) =>
                asset.value + total, 0).toFixed(2))
            }
          </p>
        </div>
        <div className="flex flex-col ml-0 mt-2 sm:mt-6 p-2">
          <button onClick={this.onAdd}
                  className={this.state.adding ?
                    buttonClasses+" border-red-500 text-red-500 mb-8" :
                    buttonClasses+" border-green-500 text-blue-100 "}>
                  {this.state.adding ? "Cancel" : "New Asset"}
          </button>
          {this.state.adding && <AddAsset toggleAdd={this.onAdd}/>}
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, { getAssets })(AssetOptions);
