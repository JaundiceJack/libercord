// Import basics
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { getExpenses, toggleAdding, toggleEditing, toggleDeleting }
  from '../../../../actions/expenseActions.js';
// Import date functions
import { add, sub, isSameMonth, getMonth } from 'date-fns';
// Import Components
import ExpenseGen     from './creation/expenseGen.js';
import ExpenseDelete  from './creation/expenseDelete.js';
import ExpenseTable   from './table/expenseTable.js';
import DetailWindow   from '../../../containers/detailWindow.js';
import GraphWindow    from '../../../containers/graphWindow.js';
//import ExpenseOptions from './options/expenseOptions.js';
import ExpensePie     from './chart/expensePie.js';
import Button         from '../../../input/button.js';
// Import Icons
import { AiOutlineEdit } from 'react-icons/ai';
import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc';
import { TiArrowBackOutline } from 'react-icons/ti';
import { GiPayMoney } from 'react-icons/gi';

const Expense = ({ history }) => {
  // Get state variables from redux
  const { expenses, selected, adding, editing, deleting } = useSelector(state => state.expense);
  // Set a date to filter viewable expenses
  const [date, setDate] = useState(new Date());
  const nextMonth = () => { setDate(add(date, { months: 1 })) };
  const backMonth = () => { setDate(sub(date, { months: 1 })) };
  const nextYear = () => { setDate(add(date, { years: 1 })) };
  const backYear = () => { setDate(sub(date, { years: 1 })) };
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

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
      <div className="min-h-screen p-4 sm:p-0 grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-4">
        <DetailWindow header="Expenses" icon={<GiPayMoney />}
          year={date.getFullYear()} next={nextYear} prev={backYear}
          content={
            <div className="flex flex-col items-center justify-center w-full p-2">

              {(adding || editing || deleting) &&
                <Button color="red" title="Go Back"
                  icon={<TiArrowBackOutline size="20" />}
                  extraClasses="w-14 self-center"
                  onClick={() => {
                    adding ? dispatch(toggleAdding()) :
                    editing ? dispatch(toggleEditing()) :
                    deleting && dispatch(toggleDeleting()) } } />
              }

              { adding   ? <ExpenseGen /> :
                editing  ? <ExpenseGen editing={true} /> :
                deleting ? <ExpenseDelete /> :
                           <ExpenseTable year={date.getFullYear()}/>
              }

              {!adding && !editing && !deleting &&
                <div className={"flex flex-row my-2 justify-center "}>
                  <Button color={"green"}
                    title="Add New Expense"
                    icon={<VscDiffAdded size="20" />}
                    onClick={() => dispatch(toggleAdding()) } />
                  <Button color={"yellow"}
                    title="Edit Selected Expense"
                    disabled={!selected}
                    icon={<AiOutlineEdit size="20" />}
                    onClick={() => dispatch(toggleEditing()) } />
                  <Button color={"red"}
                    title="Remove Selected Expense"
                    disabled={!selected}
                    icon={<VscDiffRemoved size="20" />}
                    onClick={() => dispatch(toggleDeleting()) } />
                </div>
              }

            </div>
          }
        />
        <div className="lg:col-span-2">
          <GraphWindow year={`${months[getMonth(date)]} ${date.getFullYear()}`}
            next={nextMonth} prev={backMonth}
            content={
              <div className="flex flex-col items-center justify-center w-full p-2">
                <ExpensePie date={date} />
              </div>
            }/>
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
