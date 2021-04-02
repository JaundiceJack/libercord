// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getAssets, deleteAsset } from '../../../actions/assetActions.js';
// Import the table
import Table from '../table';

// Define table columns
const columns = [
  { title: "Asset",    field: "name", },
  { title: "Category", field: "category", hidden: false },
  { title: "Owned",    field: "amount" },
  { title: "Value",    field: "value",    type: 'currency', defaultSort: 'desc' },
]

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  asset: state.asset
})

class AssetTable extends Component {
  // Check for asset retrieval
  componentDidMount(){ this.props.getAssets(); };
  // Define prop types
  static propTypes = {
    getAssets: PropTypes.func.isRequired,
    deleteAsset: PropTypes.func,
    asset: PropTypes.object.isRequired
  }
  // Delete the selected asset from the state/server
  onDelete = assetID => { this.props.deleteAsset(assetID); };

  render () {
    const { assets } = this.props.asset;
    return (
      <Table data={assets} columns={columns} onDelete={this.onDelete}/>
    )
  };
};

export default connect(mapStateToProps, { getAssets, deleteAsset })(AssetTable);
