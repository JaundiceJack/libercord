// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import icons
import { BiColumns } from 'react-icons/bi';
// Import components
import AddIncome             from './addIncome';
import EditIncome            from './editIncome';
import DeleteIncome          from './deleteIncome';
import IncomeColumnSelection from './incomeCols';
import CondiButton           from '../../inputs/condiButton';
// Import style presets
import { buttonClasses,
         cardContainerClasses,
         fancyText,
         errorMsgClasses }   from '../../tailwinds';
// Import server actions
import { clearErrors }       from '../../../actions/errorActions';

const IncomeOptions = ( ) => {
  // Get the selected row from the store
  const selectedRow = useSelector( state => state.income.selectedRow );
  const serverError = useSelector( state => state.error.msg.msg );
  // Set the internal component states
  const [adding,        setAdding]        = useState(false);
  const [editing,       setEditing]       = useState(false);
  const [deleting,      setDeleting]      = useState(false);
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
                            && setEditing(!editing) };
  const onDelete  = () => { selectedRow !== null && selectedRow !== undefined
                            && setDeleting(!deleting) };

  return (
    <div className={cardContainerClasses+"col-span-5 sm:col-span-1 p-2 self-start"}>
      <div className="flex flex-col p-2">

        <div className="flex flex-row justify-between">
          {/* Add New Income */}
          {!editCols && !deleting && !editing &&
            <CondiButton onText="Cancel"      onColor="red"
                         offText="New Income" offColor="green"
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
        {adding && <AddIncome toggleAdd={onAdd} /> }
        {editCols && <IncomeColumnSelection /> }

        {/* Edit Selected Income */}
        {!adding && !editCols && !deleting && selectedRow !== null && selectedRow !== undefined &&
          <CondiButton onText="Cancel"         onColor="red"
                       offText="Edit Selected" offColor="blue"
                       toggle={editing}        onToggle={onEdit}
                       extraClasses={!editing && "mt-4"} />
        }
        {editing && <EditIncome toggleEdit={onEdit}/> }

        {/* Delete Selected Income */}
        {!adding && !editCols && !editing && selectedRow !== null && selectedRow !== undefined &&
          <div>
            {deleting && <p className={fancyText+"mb-4 text-left"}>Are you sure you want to delete the selected income?</p>}
            <CondiButton onText="Cancel"           onColor="blue"
                         offText="Delete Selected" offColor="red"
                         toggle={deleting}         onToggle={onDelete}
                         extraClasses="w-full"/>
          </div>
        }
        {deleting && <DeleteIncome toggleDelete={onDelete} /> }

        { serverError && <div className={errorMsgClasses}> {serverError} </div> }
      </div>
    </div>
  );
};

// Define the prop types and export
IncomeOptions.propTypes = {
  adding:        PropTypes.bool,
  editing:       PropTypes.bool,
  deleting:      PropTypes.bool,
  editCols:      PropTypes.bool,
  editSelection: PropTypes.bool,
  selectedRow:   PropTypes.number
}
export default IncomeOptions;
