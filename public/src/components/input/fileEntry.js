import { IoTrashOutline } from 'react-icons/io5';
import Button from './button.js';

const FileEntry = ({
  label="",
  labelColor="text-black",
  id="file",
  append="",
  placeholder="",
  name,
  onChange,
  disabled=false,
  value,
  extraClasses=""
}) => {

  const clearFile = () => {
    document.getElementById(id).value = null;
  }

  return (
    <div className={"grid grid-cols-12 " + extraClasses}>
      {label &&
        <p className={"mr-2 col-span-3 text-right font-semibold self-center " + labelColor}>
          {label}
        </p>
      }
      <input type="file" multiple id={id} name={name} onChange={onChange}
        disabled={disabled} placeholder={placeholder} value={value}
        className={
          "mb-4 ml-8 sm:ml-0 font-mont font-semibold text-transparent rounded " +
          "bg-clip-text bg-gradient-to-b from-yellow-400 to-white " +
          "disabled:opacity-70 self-end focus:outline-none " + labelColor + " " +
          "focus:ring-2 focus:ring-yellow-500 col-span-7 "
        }/>
      <Button
        icon={<IoTrashOutline />}
        textColor="red"
        onClick={clearFile}
        extraClasses="mx-auto self-center" />
    </div>
  )
}

export default FileEntry;
