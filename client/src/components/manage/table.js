// Import basic react stuff
import React, { Component } from 'react';
// Import components from react virtualized
import {
  Column,
  Table,
  AutoSizer,
  SortDirection,
  SortIndicator
} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
// Import style presets
import { tableRowClasses, tableSelectedClasses, tableHeaderClasses } from '../tailwinds'
// Import a helper function for date display
import { formatDate } from '../helpers';

export default class DataTable extends Component {


  // Use a custom renderer to give the row the item's id and the onClick event
  renderRow = ({ index, rowData, className, style, columns }) => {
    const item = this.props.data[index];
    return (
      <div className={className}
           key={item.id}
           dataKey={item.id}
           role="row"
           style={style}
           onClick={e => {this.props.onRowClick({e, index, rowData})}}>
        {columns}
      </div>
    );
  }

  renderHeader = (dataKey, sortBy, sortDirection, column) => {
    return (
      <div className="flex flex-row cursor-pointer select-none">
        {column.text}
        {this.props.sortBy === dataKey &&
          <SortIndicator sortDirection={sortDirection} />
        }
      </div>
    );
  }

  rowClasses = ({index}) => {
    // Apply different styles to the header row
    switch (index) {
      case -1:
        return tableHeaderClasses
      case this.props.selectedRow:
        return tableSelectedClasses
      default:
        return tableRowClasses
    }
  }

  rowGetter = ({index}) => this.props.data[index]

  render() {
    return (
      <div>
        <AutoSizer>
          {({width, height}) => (
            <Table
              width={width}
              height={window.innerHeight}
              headerHeight={40}
              headerClassName={"pt-2"}
              onHeaderClick={this.props.onHeaderClick}
              rowHeight={40}
              rowClassName={this.rowClasses}
              rowCount={this.props.data.length}
              rowRenderer={this.renderRow}
              rowGetter={this.rowGetter}
              sortBy={this.props.sortBy}
              sortDirection={this.props.sortDirection}>

                {this.props.cols.map(col => {
                  return col.view && (
                    <Column dataKey={col.name}
                            width={width}
                            disableSort={false}
                            headerRenderer={({dataKey, sortBy, sortDirection}) =>
                              this.renderHeader(dataKey, sortBy, sortDirection, col)}
                            cellRenderer={({ cellData }) => {
                              return col.name === 'date' ? formatDate(cellData) : cellData;
                            }} />
                  )
                })}

            </Table>
          )}
        </AutoSizer>
      </div>
    )
  }
};
