const TextEntry = ({
  type="text",
  label="",
  labelColor="text-black",
  append="",
  placeholder="",
  name,
  value,
  onChange,
  disabled=false,
  extraClasses=""
}) => {
  return (
    <div className={"my-1 grid grid-cols-6 h-10 " + extraClasses}>
      {label &&
        <p className={"col-span-2 flex items-center justify-end text-right " +
          "pr-2 py-1 pl-1 font-semibold font-jose rounded-l-lg bg-input-label " +
          labelColor}>
          {label}
        </p>
      }
      <input type={type} value={value} name={name} onChange={onChange}
        disabled={disabled} placeholder={placeholder}
        className={
          "h-full pl-2 bg-gray-100 w-full opacity-100 " + (!append && "rounded-r-lg " ) +
          "disabled:opacity-70 text-black self-end focus:outline-none " +
          "focus:ring-2 focus:ring-yellow-500 bg-input-entry " +
          (( label &&  append) ? "col-span-3" :
           (!label && !append) ? "col-span-4" :
                                 "col-span-3"
          )
        }/>
      {append &&
        (
          (typeof append === 'string' || typeof append === 'number') ?
            <p className={"col-span-1 flex items-center justify-center font-semibold font-jose " +
            "rounded-r-lg bg-input-append " + labelColor}>
              {append}
            </p> :
            append
        )
      }
    </div>
  )
}

export default TextEntry;
