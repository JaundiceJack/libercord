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
    <div className={"my-1 flex flex-row " + extraClasses} style={{minHeight: 40+"px"}}>

      {/* Input Label */}
      {label &&
        <div style={{minWidth: 100+"px"}} 
          className={"flex items-center justify-end " +
          "px-2 py-1 rounded-l-lg bg-input-label "}>
          <p className={"text-right font-semibold font-jose " + labelColor}>
            {label}
          </p>
        </div>
      }

      {/* Text Input Entry */}
      <input type={type} value={value} name={name} onChange={onChange}
        disabled={disabled} placeholder={placeholder}
        className={
          "w-full px-2 opacity-100 disabled:opacity-70 focus:outline-none " +
          "focus:ring-2 focus:ring-yellow-500 bg-input-entry text-black " +
          (!append && "rounded-r-lg " ) + (!label && "rounded-l-lg ")}/>

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

export default TextEntry;
