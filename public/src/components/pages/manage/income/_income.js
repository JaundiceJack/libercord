// Import basics
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { getIncomes, toggleAdding, toggleEditing, toggleDeleting }
  from '../../../../actions/incomeActions.js';
// Import Components
import IncomeGen     from './creation/incomeGen.js';
import IncomeDelete  from './creation/incomeDelete.js';
import IncomeTable   from './table/incomeTable.js';
//import IncomeOptions from './options/incomeOptions.js';
import IncomePie    from './chart/incomePie.js';
import Button        from '../../../input/button.js';
// Import Icons

import { AiOutlineEdit } from 'react-icons/ai';
import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc';
import { TiArrowBackOutline } from 'react-icons/ti';

const Income = ({ history }) => {
  // Get state variables from redux
  const { incomes, selected, adding, editing, deleting } = useSelector(state => state.income);

  // Get incomes upon page load
  const timer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!timer.current) {
      if (incomes.length === 0) dispatch(getIncomes());
      timer.current = setTimeout(() => { timer.current = null; }, 5000);
    }
  }, [dispatch, incomes]);

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


          {adding ? <IncomeGen /> :
            editing ? <IncomeGen editing={true} /> :
              deleting ? <IncomeDelete /> :
                <IncomeTable /> }

          <div className={"flex flex-row my-2 justify-center "}>
            {!adding && !editing && !deleting &&
              <Button color={"green"}
                title="Add New Income"
                icon={<VscDiffAdded size="20" />}
                onClick={() => dispatch(toggleAdding()) } />}
            {!adding && !editing && !deleting &&
              <Button color={"yellow"}
                title="Edit Selected Income"
                disabled={!selected}
                icon={<AiOutlineEdit size="20" />}
                onClick={() => dispatch(toggleEditing()) } />}
            {!adding && !editing && !deleting &&
              <Button color={"red"}
                title="Remove Selected Income"
                disabled={!selected}
                icon={<VscDiffRemoved size="20" />}
                onClick={() => dispatch(toggleDeleting()) } />}
          </div>
        </div>
        <div className="lg:col-span-2 bg-content bg-shadow rounded-lg h-120 p-4">
          <IncomePie />
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
