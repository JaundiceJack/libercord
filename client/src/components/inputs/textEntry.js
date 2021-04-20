import { labelClasses, inputClasses } from '../tailwinds';

const TextEntry = ({text, id, onChange, type='text'}) => {

  const extraLabelClasses = " w-40 text-right whitespace-nowrap "
  const extraInputClasses = " w-full pl-2 rounded-l-none "

  return (
    <div className="flex flex-row my-2">
      <label className={labelClasses + extraLabelClasses}
             for={id}>{text}:</label>
      <input id={id}
             name={id}
             className={inputClasses + extraInputClasses}
             type={type}
             onChange={onChange}/>
    </div>
  )
}

export default TextEntry;
