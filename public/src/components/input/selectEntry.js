import { capitalize } from '../../functions/strings.js';

const SelectEntry = ({
  label="",
  labelColor="text-black",
  append="",
  name,
  value,
  onChange,
  options=[],
  cap=true,
  disabled=false,
  extraClasses=""
}) => {


  return (
    <div className={"my-1 grid grid-cols-6" + extraClasses} style={{minHeight: 32+"px"}}>
      {label &&
        <p className={"col-span-2 flex items-center justify-end pr-2 font-semibold font-jose " +
          "rounded-l-lg bg-input-label " + labelColor }>
          {label}
        </p>
      }

      <div className={"custom-select " +
        (append ? 'col-span-3' : 'col-span-4 rounded-r-lg')}>
        <select name={name} value={value} onChange={onChange} disabled={disabled}
          className={"h-full focus:outline-none rounded-r-lg focus:ring-2 focus:ring-yellow-500 " }>
          {options.map((option, index) => {
            return <option key={index} value={option.value} className="text-black">
              {cap ? capitalize(option.name) : option.name}
              </option>
          })}
        </select>
      </div>

      {append &&
        (
          (typeof append === 'string' || typeof append === 'number') ?
            <p className="text-blue-100 font-semibold font-jose ml-2"> {append} </p> :
            append
        )
      }
    </div>
  )
}

export default SelectEntry;
