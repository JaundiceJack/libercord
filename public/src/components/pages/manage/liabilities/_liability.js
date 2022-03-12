// Import basics
//import { useSelector } from 'react-redux';
// Import Components
import Header           from '../../../misc/header.js';
//import LiabilityGen     from './creation/liabilityGen.js';
//import LiabilityDelete  from './creation/liabilityDelete.js';
//import LiabilityTable   from './table/liabilityTable.js';
//import LiabilityOptions from './options/liabilityOptions.js';
// Import Icons
import { GiImprisoned } from 'react-icons/gi';

const Liability = ({ history }) => {
  // Get state variables from redux
  //const { adding, editing, deleting } = useSelector(state => state.liability);

  return (
    <div className={"flex flex-col m-4 h-full "}>
      <Header text="Debts" icon={<GiImprisoned />} />

      <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="bg-content bg-shadow rounded-lg h-120"></div>
        <div className="bg-content bg-shadow rounded-lg h-120"></div>
        <div className="bg-content bg-shadow rounded-lg h-120"></div>
      </div>
    </div>
  )
}

/*

<div className="grid grid-cols-5">
  <LiabilityOptions extraClasses="col-span-1" />
  {
    adding ? <LiabilityGen extraClasses="col-span-4" /> :
    editing ? <LiabilityGen editing={true} extraClasses="col-span-4" /> :
    deleting ? <LiabilityDelete extraClasses="col-span-4" /> :
    <LiabilityTable extraClasses="col-span-4" />
  }
</div>
*/

export default Liability;
