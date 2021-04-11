// Import basic react stuff
import React, { Component } from 'react';
// Import components from react virtualized
import { Column, Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
// Import style presets
import { tableRowClasses, tableHeaderClasses } from '../tailwinds'
// Import a helper function for date display
import { formatDate } from '../helpers';

export default class DataTable extends Component {
  renderRow = ({ index, rowData, className, style, columns }) => {
    // Use a custom renderer to give the rows the item's id
    const item = this.props.data[index];
    return (
      <div className={className}
           key={item.id}
           role="row"
           style={style}>
        {columns}
      </div>
    );
  }

  renderHeader = () => {

  }

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
              rowHeight={30}
              rowClassName={({index}) => {
                // Apply different styles to the header row
                return index === -1 ?
                tableHeaderClasses :
                tableRowClasses}
              }
              onRowMouseOver={({ event, index, rowData }) => {
                console.log(rowData);
              }}
              onRowRightClick={({ event, index, rowData }) => {
                console.log(rowData);
              }}
              rowCount={this.props.data.length}
              rowRenderer={this.renderRow}
              rowGetter={({index}) => this.props.data[index]}>
                {this.props.cols.map(col => {
                  // Format the date columns
                  return col.view && (col.name !== 'date' ?
                  <Column label={col.text} dataKey={col.name} width={width} /> :
                  <Column label={col.text} dataKey={col.name} width={width}
                    cellRenderer={({cellData}) => {return formatDate(cellData)}}/>
                )
              })}
            </Table>
          )}
        </AutoSizer>
      </div>
    )
  }
};
