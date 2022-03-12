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
    <div className={"my-1 flex flex-row " + extraClasses} style={{minHeight: 40+"px"}}>

      {/* Input Label */}
      {label &&
        <div style={{minWidth: 100+"px"}}
          className={"col-span-2 flex items-center justify-end " +
          "pr-2 py-1 pl-1 rounded-l-lg bg-input-label "}>
          <p className={"text-right font-semibold font-jose " + labelColor }>
            {label}
          </p>
        </div>
      }

      {/* Text Input Entry */}
      <div className={"custom-select " + (!append && 'rounded-r-lg')}>
        <select name={name} value={value} onChange={onChange} disabled={disabled}
          className={"h-full focus:outline-none focus:ring-2 focus:ring-yellow-500 " +
            (!append && "rounded-r-lg ")}>
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value} className="text-black">
                {cap ? capitalize(option.name) : option.name}
              </option>
            )
          })}
        </select>
      </div>

      {/* A button or string placed after the input element */}
      {append &&
        (typeof append === 'string' || typeof append === 'number') ?
          <div className="w-16 flex items-center justify-center rounded-r-lg bg-input-append">
            <p className={"font-semibold font-jose " + labelColor}>
              {append}
            </p>
          </div> :
          append
      }
    </div>
  )
}

export default SelectEntry;
