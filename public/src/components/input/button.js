import Spinner from '../misc/spinner.js';

const Button = ({ type="button",
  onClick,
  label="",
  color="green",
  brightness="400",
  textColor="black",
  textBrightness="400",
  icon,
  title,
  loading=false,
  disabled=false,
  extraClasses="",
  appended=false
}) => {
  return (
    <div title={title} className={"relative h-10 flex items-end justify-center " + extraClasses}>
      <button type={type}
        onClick={onClick}
        disabled={disabled}
        className={
          "p-4 h-10 hover:border-b-0 focus:outline-none " +
          "transform duration-300 flex items-center justify-center " +
          (disabled ? "opacity-50 " : "hover:h-9 border-b-4  ") +
          (appended ? "rounded-r-lg w-full " : "rounded-lg ") +
          `bg-button-${color} border-${color}-700  ` +
          + extraClasses
        }>
        {loading ?
          <Spinner /> :
          <div className="flex flex-row items-center justify-center ">
            <p className={`text-${(textColor === 'white' || textColor === 'black') ?
              textColor : (textColor + "-" + textBrightness)} ` + (icon && label && "mr-2") }>
              {icon}</p>
            <p className={`text-${(textColor === 'white' || textColor === 'black') ?
              textColor : (textColor + "-" + textBrightness)} ` + "font-jose"}>
              {label}</p>
          </div>
        }
      </button>
    </div>
  )
}

export default Button;
