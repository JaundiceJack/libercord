// Import basics
//import { useSelector } from 'react-redux';
// Import Components
import Header       from '../../../misc/header.js';
//import AssetGen     from './creation/assetGen.js';
//import AssetDelete  from './creation/assetDelete.js';
//import AssetTable   from './table/assetTable.js';
//import AssetOptions from './options/assetOptions.js';
// Import Icons
import { AiOutlineLineChart } from 'react-icons/ai';

const Asset = ({ history }) => {
  // Get state variables from redux
  //const { adding, editing, deleting } = useSelector(state => state.asset);

  return (
    <div className={"flex flex-col m-4 h-full "}>
      <Header text="Assets" icon={<AiOutlineLineChart />} />

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
  <AssetOptions extraClasses="col-span-1" />
  {
    adding ? <AssetGen extraClasses="col-span-4" /> :
    editing ? <AssetGen editing={true} extraClasses="col-span-4" /> :
    deleting ? <AssetDelete extraClasses="col-span-4" /> :
    <AssetTable extraClasses="col-span-4" />
  }
</div>
*/
export default Asset;
