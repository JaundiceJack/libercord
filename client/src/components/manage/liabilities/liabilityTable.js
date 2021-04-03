// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { getLiabilities, deleteLiability } from '../../../actions/liabilityActions';
// Import style presets
import { tableContainerClasses} from '../../tailwinds';
import DataTable from '../table';

// Define table columns
const columns = [
  { title: "Liability", field: "category" },
  { title: "Total Value",    field: "value" },
  { title: "Date Bought",    field: "date" }
]

// Map the redux state to the component properties
const mapStateToProps = (state) => ({
  liability: state.liability
})

class LiabilityTable extends Component {
  // Check for liability retrieval
  componentDidMount(){ this.props.getLiabilities(); };
  // Define prop types
  static propTypes = {
    getLiabilities: PropTypes.func.isRequired,
    deleteLiability: PropTypes.func,
    liability: PropTypes.object.isRequired
  }
  // Delete the selected liability from the state/server
  onDelete = liabilityID => { this.props.deleteLiability(liabilityID); };

  render () {
    const { liabilities } = this.props.liability;
    return (
      <div className={tableContainerClasses}>
        <DataTable data={liabilities} cols={columns}/>
      </div>
    )
  };
};

export default connect(mapStateToProps, { getLiabilities, deleteLiability })(LiabilityTable);
