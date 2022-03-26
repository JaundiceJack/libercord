// Import basics
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { getIncomes, toggleAdding, toggleEditing, toggleDeleting }
  from '../../../../actions/incomeActions.js';
// Import date functions
import { add, sub, isSameMonth, getMonth } from 'date-fns';
// Import Components
import IncomeGen     from './creation/incomeGen.js';
import IncomeDelete  from './creation/incomeDelete.js';
import IncomeTable   from './table/incomeTable.js';
import DetailWindow   from '../../../containers/detailWindow.js';
import GraphWindow    from '../../../containers/graphWindow.js';
//import IncomeOptions from './options/incomeOptions.js';
import IncomePie    from './chart/incomePie.js';
import Button        from '../../../input/button.js';
// Import Icons
import { GiReceiveMoney } from 'react-icons/gi';
import { AiOutlineEdit } from 'react-icons/ai';
import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc';
import { TiArrowBackOutline } from 'react-icons/ti';

const Income = ({ history }) => {
  // Get state variables from redux
  const { incomes, selected, adding, editing, deleting } = useSelector(state => state.income);
  const { user, error: userError } = useSelector(state => state.user);

  // Set a date to filter viewable incomes
  const [date, setDate] = useState(new Date());
  const nextMonth = () => { setDate(add(date, { months: 1 })) };
  const backMonth = () => { setDate(sub(date, { months: 1 })) };
  const nextYear = () => { setDate(add(date, { years: 1 })) };
  const backYear = () => { setDate(sub(date, { years: 1 })) };
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  // Get incomes upon page load
  const timer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!timer.current) {
      if (incomes.length === 0) dispatch(getIncomes());
      timer.current = setTimeout(() => { timer.current = null; }, 5000);
    }
  }, [dispatch, incomes]);

  // Redirect to login if token has expired
  useEffect(() => { (userError || !user.token) &&
    history.push('/login?redirect=income') }, [user, userError]);

  return (
    <div className={"flex flex-col mx-0 mt-4 sm:m-4 h-full "}>
      <div className="min-h-screen p-4 sm:p-0 grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-4">
        <DetailWindow header="Income" icon={<GiReceiveMoney />}
          year={date.getFullYear()} next={nextYear} prev={backYear}
          content={
            <div className="flex flex-col items-center justify-center w-full p-2">

              {(adding || editing || deleting) &&
                <Button color="red"  title="Go Back"
                  icon={<TiArrowBackOutline size="20" />}
                  extraClasses="w-14 self-center"
                  onClick={() => {
                    adding ? dispatch(toggleAdding()) :
                    editing ? dispatch(toggleEditing()) :
                    deleting && dispatch(toggleDeleting()) } } />
              }


              { adding   ? <IncomeGen /> :
                editing  ? <IncomeGen editing={true} /> :
                deleting ? <IncomeDelete /> :
                           <IncomeTable year={date.getFullYear()} /> }

              {!adding && !editing && !deleting &&
                <div className={"flex flex-row my-2 justify-center "}>
                  <Button color={"green"}
                    title="Add New Income"
                    icon={<VscDiffAdded size="20" />}
                    onClick={() => dispatch(toggleAdding()) } />
                  <Button color={"yellow"}
                    title="Edit Selected Income"
                    disabled={!selected}
                    icon={<AiOutlineEdit size="20" />}
                    onClick={() => dispatch(toggleEditing()) } />
                  <Button color={"red"}
                    title="Remove Selected Income"
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
                <IncomePie date={date} />
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}
/*
<div className="grid grid-cols-5">
  <IncomeOptions extraClasses="col-span-1" />
  {
    adding ? <IncomeGen extraClasses="col-span-4" /> :
    editing ? <IncomeGen editing={true} extraClasses="col-span-4" /> :
    deleting ? <IncomeDelete extraClasses="col-span-4" /> :
    <IncomeTable extraClasses="col-span-4" />
  }
</div>
*/
export default Income;
