import { labelClasses, inputClasses } from '../tailwinds';

const TextEntry = ({text, id, onChange, type='text'}) => {
  return (
    <div className="grid grid-cols-6 my-2">
      <label className={labelClasses+"col-span-2 text-right"} for={id}>{text}:</label>
      <input id={id}
             name={id}
             className={inputClasses+"col-span-4 pl-2 rounded-l-none"}
             type={type}
             onChange={onChange}/>
    </div>
  )
}

export default TextEntry;
