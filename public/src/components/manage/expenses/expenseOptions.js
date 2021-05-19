// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
         fancyText,
         errorMsgClasses }    from '../../tailwinds';
// Import server actions
import { clearErrors }        from '../../../actions/errorActions';
import { toggleExpenseEditing,
         toggleExpenseDeleting } from '../../../actions/expenseActions';

const ExpenseOptions = ( ) => {
  // Get the selected row from the store
  const selectedRow = useSelector( state => state.expense.selectedRow );
  const serverError = useSelector( state => state.error.msg.msg );
  const editing     = useSelector( state => state.expense.editing );
  const deleting    = useSelector( state => state.expense.deleting );
  // Set the internal component states
  const [adding,        setAdding]        = useState(false);
  const [editCols,      setEditCols]      = useState(false);
  const [editSelection, setEditSelection] = useState(false);

  // Update errors from the server
  const dispatch = useDispatch();
  const updateTimer = useRef(null);
  const setUpdate = () => { updateTimer.current = setTimeout(() => {
    dispatch(clearErrors());
    updateTimer.current = null; }, 5000);
  }
  useEffect(() => { !updateTimer.current && setUpdate() }, [serverError]);

  // When a button is clicked, set the corresponding state
  const onAdd     = () => setAdding(!adding);
  const onColEdit = () => setEditCols(!editCols);
  const onEdit    = () => { selectedRow !== null && selectedRow !== undefined
                            && dispatch(toggleExpenseEditing()) };
  const onDelete  = () => { selectedRow !== null && selectedRow !== undefined
                            && dispatch(toggleExpenseDeleting()) };

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
        {!adding && !editCols && !deleting && selectedRow !== null && selectedRow !== undefined &&
          <CondiButton onText="Cancel"         onColor="red"
                       offText="Edit Selected" offColor="blue"
                       toggle={editing}        onToggle={onEdit}
                       extraClasses={!editing && "mt-4"} />
        }
        {editing && <EditExpense toggleEdit={onEdit}/> }

        {/* Delete Selected Expense */}
        {!adding && !editCols && !editing && selectedRow !== null && selectedRow !== undefined &&
          <div>
            {deleting && <p className={fancyText+"mb-4 text-left"}>Are you sure you want to delete the selected expense?</p>}
            <CondiButton onText="Cancel"           onColor="blue"
                         offText="Delete Selected" offColor="red"
                         toggle={deleting}         onToggle={onDelete}
                         extraClasses="w-full"/>
          </div>
        }
        {deleting && <DeleteExpense toggleDelete={onDelete} /> }

        { serverError && <div className={errorMsgClasses}> {serverError} </div> }
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