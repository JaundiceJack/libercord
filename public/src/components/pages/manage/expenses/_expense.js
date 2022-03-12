// Import basics
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { getExpenses, toggleAdding, toggleEditing, toggleDeleting }
  from '../../../../actions/expenseActions.js';
// Import Components
import ExpenseGen     from './creation/expenseGen.js';
import ExpenseDelete  from './creation/expenseDelete.js';
import ExpenseTable   from './table/expenseTable.js';
//import ExpenseOptions from './options/expenseOptions.js';
import ExpensePie     from './chart/expensePie.js';
import Button         from '../../../input/button.js';
// Import Icons
import { AiOutlineEdit } from 'react-icons/ai';
import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc';
import { TiArrowBackOutline } from 'react-icons/ti';

const Expense = ({ history }) => {
  // Get state variables from redux
  const { expenses, selected, adding, editing, deleting } = useSelector(state => state.expense);

  // Get expenses upon page load
  const timer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!timer.current) {
      if (expenses.length === 0) dispatch(getExpenses());
      timer.current = setTimeout(() => { timer.current = null; }, 5000);
    }
  }, [dispatch, expenses]);

  return (
    <div className={"flex flex-col mx-0 mt-4 sm:m-4 h-full "}>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="bg-content bg-shadow rounded-lg h-120 flex flex-col justify-center p-2">
          {(adding || editing || deleting) &&
            <Button color="red"
              title="Go Back"
              icon={<TiArrowBackOutline size="20" />}
              extraClasses="w-14 self-center"
              onClick={() => {
                adding ? dispatch(toggleAdding()) :
                editing ? dispatch(toggleEditing()) :
                deleting && dispatch(toggleDeleting());
              }} />
          }


          {adding ? <ExpenseGen /> :
            editing ? <ExpenseGen editing={true} /> :
              deleting ? <ExpenseDelete /> :
                <ExpenseTable /> }

          <div className={"flex flex-row my-2 justify-center "}>
            {!adding && !editing && !deleting &&
              <Button color={"green"}
                title="Add New Expense"
                icon={<VscDiffAdded size="20" />}
                onClick={() => dispatch(toggleAdding()) } />}
            {!adding && !editing && !deleting &&
              <Button color={"yellow"}
                title="Edit Selected Expense"
                disabled={!selected}
                icon={<AiOutlineEdit size="20" />}
                onClick={() => dispatch(toggleEditing()) } />}
            {!adding && !editing && !deleting &&
              <Button color={"red"}
                title="Remove Selected Expense"
                disabled={!selected}
                icon={<VscDiffRemoved size="20" />}
                onClick={() => dispatch(toggleDeleting()) } />}
          </div>
        </div>
        <div className="lg:col-span-2 bg-content bg-shadow rounded-lg h-120 p-4">
          <ExpensePie />
        </div>
      </div>
    </div>
  )
}

/*

<div className="grid grid-cols-5">
  <ExpenseOptions extraClasses="col-span-1" />
  {
    adding ? <ExpenseGen extraClasses="col-span-4" /> :
    editing ? <ExpenseGen editing={true} extraClasses="col-span-4" /> :
    deleting ? <ExpenseDelete extraClasses="col-span-4" /> :
    <ExpenseTable extraClasses="col-span-4" />
  }
</div>
*/

export default Expense;
