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
import { formatDate } from '../../functions/dateFunctions';

const TableInst = ({
  data, cols,
  sortBy, sortDirection,
  selectedRow,
  onHeaderClick, onRowClick}) => {



  // Use a custom renderer to give the row the item's id and the onClick event
  const renderRow = ({ index, rowData, className, style, columns }) => {
    const item = data[index];
    return (
      <div className={className}
           key={item.id}
           dataKey={item.id}
           role="row"
           style={style}
           onClick={e => {onRowClick({e, index, rowData})}}>
        {columns}
      </div>
    );
  }

  // Apply styles to the header row, selected row, and others
  const rowClasses = ({index}) => {
    switch (index) {
      case -1:
        return tableHeaderClasses
      case selectedRow:
        return tableSelectedClasses
      default:
        return tableRowClasses
    }
  }

  const rowGetter = ({index}) => data[index]


  return (
    <div>
      <AutoSizer>
        {({width, height}) => (
          <Table
            width={width}
            height={window.innerHeight}
            headerHeight={40}
            headerClassName={"pt-2"}
            onHeaderClick={onHeaderClick}
            rowHeight={40}
            rowClassName={rowClasses}
            rowCount={data.length}
            rowRenderer={renderRow}
            rowGetter={rowGetter}
            sortBy={sortBy}
            sortDirection={sortDirection}>

              {cols.map(col => {
                return col.view && (
                  <Column
                    dataKey={col.name}
                    width={width}
                    disableSort={false}
                    headerRenderer={({ dataKey, sortBy, sortDirection }) => {
                      return (
                        <div className="flex flex-row cursor-pointer select-none font-jose">
                          {col.text}
                          {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
                        </div>
                      )
                    }}
                    cellRenderer={({ cellData }) => {
                      return col.name === 'date' ? formatDate(cellData) : cellData;
                    }}
                  />
                )
              })}

          </Table>
        )}
      </AutoSizer>
    </div>
  )

};

export default TableInst;
