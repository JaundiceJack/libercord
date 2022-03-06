// Import basics
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { addLiability, editLiability } from '../../../../../actions/liabilityActions.js';
// Import icons
import { GiCheckMark } from 'react-icons/gi';
// Import components
import TextEntry   from '../../../../input/textEntry.js';
import SelectEntry from '../../../../input/selectEntry.js';
import Button      from '../../../../input/button.js';
import Message     from '../../../../misc/message.js';
import Spinner     from '../../../../misc/spinner.js';

const LiabilityGen = ({ editing=false }) => {
  // Get state variables from redux
  const { selected, loading, error } = useSelector(state => state.liability);
  const categories = useSelector(state =>
      state.category.categories.filter(cat => cat.type === 'liability'));

  // Set validation error messages
  const [msgs, setMsgs] = useState([]);
  // If editing, use the selected liability values, otherwise set defaults
  const [liability, setLiability] = useState({
    name: editing ?
      (selected && selected.name) :
      "",
    category: editing ?
      (selected && selected.category) :
      categories ? categories[0] : "",
    balance: {
      initial: editing ?
        (selected && selected.balance.initial) :
        "",
      remaining: editing ?
        (selected && selected.balance.remaining) :
        "",
      payed_total: editing ?
        (selected && selected.balance.payed_total) :
        "",
      payed_interest: editing ?
        (selected && selected.balance.payed_interest) :
        "",
      payed_principle: editing ?
        (selected && selected.balance.payed_principle) :
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
  // Set functions to modify the liability values from input elements
  const editInfo = e => { setLiability({...liability, [e.target.name]: e.target.value })}
  const editBalance = e => { setLiability({...liability, balance: { ...liability.balance, [e.target.name]: e.target.value } })}

  // Check for valid entries and send the liability to the server
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    if (liability.name === "")
      setMsgs([...msgs, "Liability name required."]);
    if (liability.category === "" || liability.category === null)
      setMsgs([...msgs, "Liability category required."]);
    if (liability.balance.initial === "" || liability.balance.initial === null)
      setMsgs([...msgs, "Amount owned required."]);
    if (msgs.length === 0) {
      editing ? dispatch(editLiability(selected._id, liability)) : dispatch(addLiability(liability));
    }
    else { setTimeout(() => { setMsgs([]); }, 5000); }
  }

  return (
    <form onSubmit={onSubmit}>
      {loading ? <Spinner /> :
        <div className="flex flex-col">
          <TextEntry   label="Name:"         name="name"     value={liability.name} onChange={editInfo} />
          <SelectEntry label="Category:"     name="category" value={liability.category} onChange={editInfo} />
          <TextEntry   label="Amount Owed:"  name="owed"    value={liability.balance.initial} onChange={editBalance} />
          <TextEntry   label="Interest (If Applicable):" name="interest" value={liability.interest} onChange={editInfo} />
          <Button type="submit" label={editing ? "Save Changes" : "Save Liability"} icon={<GiCheckMark />} />
          {msgs.map(msg => {
            return <Message warning={msg} />
          })}
          {error && <Message error={error} />}
        </div>
      }
    </form>
  )
}

export default LiabilityGen;
