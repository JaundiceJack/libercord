import { useDispatch } from 'react-redux';
// Import list/table library components
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
// Import functions
import { formatDateMMDD } from '../../functions/dates.js';
import { capitalize } from '../../functions/strings.js';

const ScrollWindow = ({ selected, items, onSelect }) => {
  // Compose row classes
  const dispatch = useDispatch();
  const rowC = "font-semibold text-gray-800 py-1 px-2 hover:text-white " +
               "truncate grid grid-cols-12 gap-x-6 " +
               "cursor-pointer select-none capitalize ";
  const oddRow  = rowC + " bg-gray-300 hover:bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 ";
  const evenRow = rowC + " bg-gray-400 hover:bg-gradient-to-b from-gray-400 via-gray-500 to-gray-400 ";
  const selRow  = rowC + " bg-green-400 hover:bg-gradient-to-b from-green-400 via-green-500 to-green-400 ";

  // Assign row classes for alternating colors
  const rowClasses = (index, id) => {
    if (selected && selected._id === id) return selRow;
    else {
      if (index % 2) return evenRow
      else return oddRow;
    }
  }

  // Create a format for displaying rows
  const Row = ({ index, style }) => {
    const item = items[index];
    return (
      <div onClick={() => dispatch(onSelect(item))}
        title={item && item.name}
        className={ rowClasses(index, item._id) }
        style={style}>
        <p className="col-span-2">
          {item && (item.date ?
            formatDateMMDD(item.date) :
            formatDateMMDD(item.date))}</p>
        <p className="col-span-6">{item && item.source ? item.source : item.location}</p>
        <p className="col-span-4">{item && item.value && item.value.toFixed(2) + " $"}</p>
      </div>
    )
  }

  return (
    <AutoSizer >
      {({ height, width }) => (
        <List
          className="rounded-b-md shadow-xl h-full bg-gray-100 border-r border-l border-gray-700 "
          height={height}
          width={width}
          itemCount={items.length}
          itemSize={35}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  )
}

export default ScrollWindow;
