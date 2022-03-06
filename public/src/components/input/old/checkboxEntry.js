import { inputClasses } from '../tailwinds';

const CheckboxEntry = ({text, id, checked, onChange}) => {
  return (
    <div className="mb-4 p-2 flex flex-col hover:bg-gray-800 rounded-lg">
      <label className={"font-bold font-medium text-sm text-blue-200 grid grid-cols-2 text-right"}
             for={id}>
        {text}
        <input className={inputClasses+"ml-4"}
               id={id}
               name={id}
               type="checkbox"
               checked={checked}
               value={text}
               onChange={onChange}/>
      </label>
    </div>
  )
}

export default CheckboxEntry;
