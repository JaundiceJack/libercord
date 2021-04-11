import { selectClasses, labelClasses, inputClasses } from '../tailwinds';

const SelectEntry = ({text, id, value, onChange, options}) => {
  return (
    <div className="flex flex-row my-2">
      <label className={labelClasses+"self-center"} for={id}>{text}:</label>
      <div className="relative flex w-full">
        <svg className="w-2 h-2 absolute top-0 right-0 mr-4 mt-4 pointer-events-none"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 412 232">
          <path d={"M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 " +
                   "0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 " +
                   "11.279 7.323 17.677 7.323s12.796-2.441 " +
                   "17.678-7.322l181-181c9.763-9.764 9.763-25.592 " +
                   "0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"}
                fill="#648299"
                fill-rule="nonzero"/>
        </svg>
        <select id={id}
                name={id}
                className={selectClasses+"rounded-l-none"}
                value={value}
                onChange={onChange}>
          {options.map((option) => {
            return <option value={option}>{option}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default SelectEntry;
