import { labelClasses, inputClasses } from '../tailwinds';

const DateEntry = ({text, id, value, onChange, required = false}) => {
  return (
    <div className="flex flex-row my-2">
      <label className={labelClasses+"self-center"} for={id}>{text}:</label>
      <input id={id}
             name={id}
             className={inputClasses+"w-full pl-2 rounded-l-none"}
             type="date"
             value={value}
             onChange={onChange}
             required={required} />
    </div>
  )
}

export default DateEntry;
