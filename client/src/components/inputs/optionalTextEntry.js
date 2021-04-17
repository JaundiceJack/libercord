import { buttonClasses, labelClasses, inputClasses } from '../tailwinds';

const OptionalTextEntry = ({onText, offText, id, value, toggle, onToggle, onChange}) => {
  return (
    <div className="grid grid-cols-5 my-2">
      <button type="button"
              className={toggle ?
                buttonClasses+"col-span-2 text-blue-200 border-red-500 rounded-r-none whitespace-nowrap" :
                buttonClasses+"col-span-5 text-blue-200 border-blue-300 " }
              onClick={onToggle}>
        {toggle ? "- "+onText : "+ "+offText}
      </button>
      {toggle &&
      <input id={id}
             className={toggle ?
               inputClasses+"p-2 col-span-3 rounded-l-none" :
               inputClasses}
             name={id}
             value={value}
             type="text"
             placeholder={offText}
             onChange={onChange}/>}
    </div>
  )
}

export default OptionalTextEntry;
