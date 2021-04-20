// Import basics
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Import icons
import { BiColumns } from 'react-icons/bi';
// Import components
import AddExpense             from './addExpense';
import EditExpense            from './editExpense';
import DeleteExpense          from './deleteExpense';
import ExpenseColumnSelection from './expenseCols';
import CondiButton            from '../../inputs/condiButton';
// Import style presets
import { buttonClasses,
         cardContainerClasses,
         fancyText }          from '../../tailwinds';

const ExpenseOptions = ( ) => {
  // Get the selected row from the store
  const selectedRow = useSelector( state => state.expense.selectedRow );

  // Set the internal component states
  const [adding,        setAdding]        = useState(false);
  const [editing,       setEditing]       = useState(false);
  const [deleting,      setDeleting]      = useState(false);
  const [editCols,      setEditCols]      = useState(false);
  const [editSelection, setEditSelection] = useState(false);

  // When a button is clicked, set the corresponding state
  const onAdd     = () => setAdding(!adding);
  const onColEdit = () => setEditCols(!editCols);
  const onEdit    = () => { selectedRow !== null && selectedRow !== undefined
                            && setEditing(!editing) };
  const onDelete  = () => { selectedRow !== null && selectedRow !== undefined
                            && setDeleting(!deleting) };

  return (
    <div className={cardContainerClasses+"col-span-5 sm:col-span-1 p-2 self-start"}>
      <div className="flex flex-col p-2">

        <div className="flex flex-row justify-between">
          {/* Add New Expense */}
          {!editCols && !deleting && !editing &&
            <CondiButton onText="Cancel"      onColor="red"
                         offText="New Expense" offColor="green"
                         toggle={adding}      onToggle={onAdd}
                         extraClasses={adding ? "py-4 w-full" : "w-full mr-2"}/>
          }

          {/* Edit Visible Columns */}
          {!adding && !deleting && !editing &&
            <CondiButton onText="Ok"                       onColor="green"
                         offText=<BiColumns size="40px" /> offColor="blue"
                         toggle={editCols}                 onToggle={onColEdit}
                         extraClasses={editCols && "py-4 w-full"}/>
          }
        </div>
        {adding && <AddExpense toggleAdd={onAdd} /> }
        {editCols && <ExpenseColumnSelection /> }

        {/* Edit Selected Expense */}
        {!adding && !editCols && !deleting &&
          <CondiButton onText="Cancel"         onColor="red"
                       offText="Edit Selected" offColor="blue"
                       toggle={editing}        onToggle={onEdit}
                       extraClasses={!editing && "mt-4"} />
        }
        {editing && <EditExpense /> }

        {/* Delete Selected Expense */}
        {!adding && !editCols && !editing &&
          <div>
            {deleting && <p className={fancyText+"mb-4 text-left"}>Are you sure you want to delete the selected expense?</p>}
            <CondiButton onText="Cancel"           onColor="blue"
                         offText="Delete Selected" offColor="red"
                         toggle={deleting}         onToggle={onDelete}
                         extraClasses="w-full" />
          </div>
        }
        {deleting && <DeleteExpense toggleDelete={onDelete} /> }
      </div>
    </div>
  );
};

// Define the prop types and export
ExpenseOptions.propTypes = {
  adding:        PropTypes.bool,
  editing:       PropTypes.bool,
  deleting:      PropTypes.bool,
  editCols:      PropTypes.bool,
  editSelection: PropTypes.bool,
  selectedRow:   PropTypes.number
}
export default ExpenseOptions;
