// Import basic react stuff
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Import style presets
import { tableContainerClasses} from '../tailwinds';
// Import the react virtualized table component and it's sort direction
import TableInst from './tableInst';
import { SortDirection } from 'react-virtualized';

const TableA = ({
  data, cols,
  selectedRow,
  selectDatum, userSorted }) => {

  // Set local state variables
  const [sortDirection,     setDirection]     = useState(SortDirection.DESC);
  const [sortBy,            setSortBy]        = useState('date');
  const [prevSortBy,        setPrevSortBy]    = useState(null);
  const [prevSortDirection, setPrevDirection] = useState(null);
  const [sortedList,        setSortedList]    = useState(data);

  // sortList is a function given to Array.prototype.sort to sort the data
  const sortList = (dataKey) => {
    return (a, b) => {
      if      (!a[dataKey]) return 1
      else if (!b[dataKey]) return -1
      else if (a[dataKey] < b[dataKey])
        return -1;
      else if (a[dataKey] > b[dataKey])
        return 1;
      else return 0;
    };
  }

  // Update the table when the data changes
  const updateTimer = React.useRef(null);
  function setUpdate() {
    const nextSort = data.sort(sortList(sortBy));
    setSortedList(sortDirection === SortDirection.DESC ?
      nextSort.reverse() : nextSort );
  	updateTimer.current = setTimeout(() => {
      updateTimer.current = null; }, 1000);
  }
  React.useEffect(() => { !updateTimer.current && setUpdate() }, [data]);
  React.useEffect(() => { return () =>
    { updateTimer.current && clearTimeout(updateTimer.current); }; }, []);

  // Set the state's selected row for highlighting & editing
  const onRowClick = ({ event, index, rowData }) => {
    selectDatum({rowData, index}); };

  // Sort the table by the clicked header
  const onHeaderClick = ({ columnData, dataKey, event }) => {
    const nextSort = data.sort(sortList(dataKey));
    setSortBy(dataKey);
    setDirection(sortDirection === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC)
    setSortedList(sortDirection === SortDirection.DESC ? nextSort : nextSort.reverse());
    // Deselect the selected row or move the index
    userSorted();
  }

  return (
    <div className={tableContainerClasses + "col-span-5 sm:col-span-4"}>
      <TableInst
        data={sortedList}
        cols={cols}
        sortBy={sortBy}
        sortDirection={sortDirection}
        selectedRow={selectedRow}
        onHeaderClick={onHeaderClick}
        onRowClick={onRowClick}
         />
    </div>
  )
};

TableA.defaultProps = {
  selectDatum: PropTypes.func,
  userSorted: PropTypes.func
}
export default TableA;
