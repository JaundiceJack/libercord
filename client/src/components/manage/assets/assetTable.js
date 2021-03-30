import Table from '../table.js';
import React, { Component } from 'react';
// Connect redux to manage the state
import { connect } from 'react-redux';
import { getAssets, deleteAsset } from '../../../actions/assetActions.js';
import PropTypes from 'prop-types';

// Define table columns
const columns = [
  { title: "Asset",    field: "name", },
  { title: "Category", field: "category", hidden: false },
  { title: "Owned",    field: "amount" },
  { title: "Value",    field: "value",    type: 'currency', defaultSort: 'desc' },
]

class AssetTable extends Component {
  // Check for asset retrieval
  componentDidMount(){ this.props.getAssets(); };
  // Delete the selected asset from the state/server
  onDelete = assetID => { this.props.deleteAsset(assetID); };

  render () {
    const { assets } = this.props.asset;
    return (
      <Table data={assets} columns={columns} onDelete={this.onDelete}/>
    )
  };
};

// Define prop-types
AssetTable.propTypes = {
  getAssets: PropTypes.func.isRequired,
  deleteAsset: PropTypes.func,
  asset: PropTypes.object.isRequired
}

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  asset: state.asset
})

export default connect(mapStateToProps,
   { getAssets, deleteAsset })
   (AssetTable);
