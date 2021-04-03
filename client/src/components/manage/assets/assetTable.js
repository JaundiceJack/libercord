// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getAssets, deleteAsset } from '../../../actions/assetActions';
// Import style presets
import { tableContainerClasses} from '../../tailwinds';
import DataTable from '../table';

// Define table columns
const columns = [
  { title: "Asset",    field: "name", },
  { title: "Category", field: "category" },
  { title: "Owned",    field: "amount" },
  { title: "Value",    field: "value" },
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
      <div className={tableContainerClasses}>
        <DataTable data={assets} cols={columns}/>
      </div>
    )
  };
};

export default connect(mapStateToProps, { getAssets, deleteAsset })(AssetTable);
