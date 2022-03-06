// Import basics
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import dispatch actions
import { editBalance } from '../../../../../../actions/userActions.js';
// Import Icons
import { TiArrowBackOutline } from 'react-icons/ti';
import { GiCheckMark } from 'react-icons/gi';
// Import Components
import Button from '../../../../../input/button.js';
import Spinner from '../../../../../misc/spinner.js';
import Message from '../../../../../misc/message.js';
import TextEntry from '../../../../../input/textEntry.js';

const EditBalance = ({ toggle }) => {
  const { user: { balance }, error, loading } = useSelector(state => state.user);
  const [initial, setInitial] = useState(balance || 0);
  const [msgs, setMsgs] = useState([]);

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    let errors = [];
    if (isNaN(Number(initial))) {
      errors.push("Balance must be a number");
      setMsgs([...msgs, "Balance must be a number."]); }
    errors.length === 0 ?
      dispatch(editBalance({ balance: initial })) :
      setTimeout(() => {
        errors = [];
        setMsgs([]); }, 5000)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Button color="red"
        title="Go Back"
        icon={<TiArrowBackOutline size="20" />}
        onClick={toggle}
        extraClasses="mb-8" />
      {(loading) ? <Spinner /> :
        <form onSubmit={onSubmit} className="flex flex-col" >

          <TextEntry label="Initial Balance:"
            labelColor="text-yellow-400"
            name="initial"
            value={initial}
            extraClasses="mb-8"
            onChange={e => setInitial(e.target.value)}
            append="$" />

          <Button type="submit"
            label="Save Changes"
            icon={<GiCheckMark />} />

          {msgs.map(msg => <Message warning={msg} />)}
          {error && <Message error={error} />}
        </form>
      }
    </div>
  )
}

export default EditBalance;
