// Import basics
//import { useSelector } from 'react-redux';
// Import Components
import Header       from '../../../misc/header.js';
//import AssetGen     from './creation/assetGen.js';
//import AssetDelete  from './creation/assetDelete.js';
//import AssetTable   from './table/assetTable.js';
//import AssetOptions from './options/assetOptions.js';
// Import Icons
//import { AiOutlineLineChart } from 'react-icons/ai';
import DetailWindow from '../../../containers/detailWindow.js';
import { GiPayMoney } from 'react-icons/gi';

const Asset = ({ history }) => {
  // Get state variables from redux
  //const { adding, editing, deleting } = useSelector(state => state.asset);

  return (
    <div className={"flex flex-col mx-0 mt-4 sm:m-4 h-full "}>
      <div className="min-h-screen p-4 sm:p-0 grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-4">

          <DetailWindow header="Assets" icon={<GiPayMoney />} year="2022" content={
            <div className="">
              
            </div>
          } />

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
