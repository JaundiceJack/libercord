// Import Basics
import { useSelector, useDispatch } from 'react-redux'
// Import dispatch actions
import { deleteAsset, toggleDeleting } from '../../../../../actions/assetActions.js'
// Import components
import Spinner from '../../../../misc/spinner.js';
import Button from '../../../../input/button.js';
import Message from '../../../../misc/message.js';

const AssetDelete = () => {
  const { selected, loading, error } = useSelector(state => state.asset);

  // Send the delete request or go back to the previous screen
  const dispatch = useDispatch();
  const onDelete = () => { dispatch(deleteAsset(selected._id)) };
  const onCancel = () => { dispatch(toggleDeleting()) };

  return (
    <div className="">
      { loading ? <Spinner /> :
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-center">
            Are you sure you want to delete {selected.name}?</h3>
          <div className="w-full flex flex-row justify-center">
            <Button label="Delete It" color="green" onClick={onDelete} />
            <Button label="Cancel"    color="red"   onClick={onCancel} />
          </div>
        </div>
      }
      {error && <Message error={error} />}
    </div>
  )
}

export default AssetDelete;
