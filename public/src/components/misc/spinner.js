import { GiDividedSpiral } from 'react-icons/gi'

const Spinner = ({ extraClasses }) => {
  return (
    <div className={"w-full h-full flex items-center justify-center " + extraClasses} >
      <GiDividedSpiral
        className="animate-spin text-gray-400 text-center"
        size="30"
       />
    </div>
  )
}

export default Spinner;
