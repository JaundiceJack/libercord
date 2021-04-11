import { labelClasses, inputClasses } from '../tailwinds';

const CurrencyEntry = ({text, id, value, onChange}) => {
  return (
    <div className="flex flex-row my-2">
      <label className={labelClasses+"self-center"} for={id}>{text}:</label>
      <input id={id}
             name={id}
             className={inputClasses+"w-full pl-2 rounded-l-none"}
             type="number"
             min="0"
             step="0.01"
             value={value}
             onChange={onChange}/>
    </div>
  )
}

export default CurrencyEntry;
