import { buttonClasses } from '../tailwinds';

const CondiButton = ({
  onText, onColor,
  offText, offColor,
  toggle, onToggle, extraClasses}) => {
  const onClasses = "mb-2 border-"+onColor+"-400 text-blue-200 "+extraClasses;
  const offClasses = "mb-2 border-"+offColor+"-400 text-blue-200 "+extraClasses;

  return (
    <button type="button"
            className={toggle ?
              buttonClasses + onClasses :
              buttonClasses + offClasses }
            onClick={onToggle}>
      {toggle ? onText : offText}
    </button>
  )
}

export default CondiButton;
