import Spinner from '../misc/spinner.js';
import { FcPrevious, FcNext } from 'react-icons/fc';

const BrowseButton = ({
  type="button",
  onClick,
  direction="next",
  color="green",
  brightness="400",
  title,
  loading=false,
  disabled=false,
  extraClasses=""
}) => {
  return (
    <div title={title} className={"relative mx-1 flex items-center justify-center " }>
      <button type={type}
        onClick={onClick}
        disabled={disabled}
        className={
          "focus:outline-none transform duration-300 hover:scale-125 flex items-center " +
          (disabled && "opacity-50 ") + extraClasses
        }>
        {
          loading ? <Spinner /> :
          direction === 'next' ?
            <FcNext size="25" /> :
            <FcPrevious size="25" />
        }
      </button>
    </div>
  )
}

export default BrowseButton;
