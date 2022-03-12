import { useState } from 'react';
import { TiBackspaceOutline } from 'react-icons/ti';
import { GoTrashcan } from 'react-icons/go'
import TextEntry from './textEntry.js';
import SelectEntry from './selectEntry.js';
import Button from './button.js';

const FormSelection = ({
  items,      values,
  label,      name,
  newLabel,   newName,
  onEdit,     onEditNew,
  showDelete=true, onDelete,
 }) => {
  // Make form toggles
  const [adding, setAdding] = useState(false);
  const toggleNew = () => {
    onEditNew({ target: { name: [newName], value: "" } });
    setAdding(!adding) };
  const [deleting, setDeleting] = useState(false);
  const toggleDelete = () => { setDeleting(!deleting) };

  const item = items.find(item => {
    if (values) return item._id === values[name]
    else return false;
  })

  return (
    <div className="flex flex-row">

    {deleting ?
      <div className="flex flex-row items-center my-4">
        <p className="text-yellow-400 text-center font-semibold mr-2">
          {`Remove ${name} ${item && item.name}?`}</p>
        <Button label="Yes" icon={<GoTrashcan />} onClick={onDelete} color="red" title="Remove Option" />
        <Button label="No" icon={<TiBackspaceOutline />} onClick={toggleDelete} title="Cancel" />
      </div> :
    (adding || items.length === 0) ?
      <TextEntry label={label} labelColor="text-yellow-400"
        name={newName}
        onChange={onEditNew}
        extraClasses="w-full"
        placeholder={`Enter new ${name}`}
        value={(values && values[newName]) || ""}
        append={items.length > 0 &&
          <Button icon={<TiBackspaceOutline/>}
            color="gray"
            title="Return to selections"
            onClick={toggleNew}
            appended={true} />} /> :
      <SelectEntry label={label} labelColor="text-yellow-400"
        name={name}
        onChange={onEdit}
        extraClasses="w-full"
        value={(values && values[name]) || ""}
        options={items.map(item => { return { name: item.name, value: item._id }})}
        append={
          <Button label="New"
            color="yellow"
            onClick={toggleNew}
            appended={true} />} />
    }

    {showDelete && !deleting && !adding &&
      <button type="button"
        onClick={toggleDelete} title="Remove option"
        className="transform duration-300 hover:scale-110 mx-2">
        <GoTrashcan color="#f54"/>
      </button>
    }
    </div>
  )
}

export default FormSelection;
