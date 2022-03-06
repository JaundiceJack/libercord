// Import basics
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { addAsset, editAsset } from '../../../../../actions/assetActions.js';
// Import icons
import { GiCheckMark } from 'react-icons/gi';
// Import components
import TextEntry   from '../../../../input/textEntry.js';
import SelectEntry from '../../../../input/selectEntry.js';
import Button      from '../../../../input/button.js';
import Message     from '../../../../misc/message.js';
import Spinner     from '../../../../misc/spinner.js';

const AssetGen = ({ editing=false }) => {
  // Get state variables from redux
  const { selected, loading, error } = useSelector(state => state.asset);
  const categories = useSelector(state =>
      state.category.categories.filter(cat => cat.type === 'asset'));

  // Set validation error messages
  const [msgs, setMsgs] = useState([]);
  // If editing, use the selected asset values, otherwise set defaults
  const [asset, setAsset] = useState({
    name: editing ?
      (selected && selected.name) :
      "",
    category: editing ?
      (selected && selected.category) :
      categories ? categories[0] : "",
    amount: {
      owned: editing ?
        (selected && selected.amount.owned) :
        "",
      units: editing ?
        (selected && selected.amount.units) :
        "",
      unit_price: editing ?
        (selected && selected.amount.unit_price) :
        "",
    },
    date: editing ?
      (selected && selected.date) :
      Date.now(),
    currency: editing ?
      (selected && selected.currency) :
      "$",
    interest: editing ?
      (selected && selected.interest) :
      "",
  });
  // Set functions to modify the asset values from input elements
  const editInfo = e => { setAsset({...asset, [e.target.name]: e.target.value })}
  const editAmount = e => { setAsset({...asset, amount: { ...asset.amount, [e.target.name]: e.target.value } })}

  // Check for valid entries and send the asset to the server
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    if (asset.name === "")
      setMsgs([...msgs, "Asset name required."]);
    if (asset.category === "" || asset.category === null)
      setMsgs([...msgs, "Asset category required."]);
    if (asset.amount.owned === "" || asset.amount.owned === null)
      setMsgs([...msgs, "Amount owned required."]);
    if (msgs.length === 0) {
      editing ? dispatch(editAsset(selected._id, asset)) : dispatch(addAsset(asset));
    }
    else { setTimeout(() => { setMsgs([]); }, 5000); }
  }

  return (
    <form onSubmit={onSubmit}>
      {loading ? <Spinner /> :
        <div className="flex flex-col">
          <TextEntry   label="Name:"         name="name"     value={asset.name} onChange={editInfo} />
          <SelectEntry label="Category:"     name="category" value={asset.category} onChange={editInfo} />
          <TextEntry   label="Amount Owned:" name="owned"    value={asset.amount.owned} onChange={editAmount} />
          <TextEntry   label="Interest (If Applicable):" name="interest" value={asset.interest} onChange={editInfo} />
          <Button type="submit" label={editing ? "Save Changes" : "Save Asset"} icon={<GiCheckMark />} />
          {msgs.map(msg => {
            return <Message warning={msg} />
          })}
          {error && <Message error={error} />}
        </div>
      }
    </form>
  )
}

export default AssetGen;
