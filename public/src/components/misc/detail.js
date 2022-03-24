import { Link } from 'react-router-dom';

const Detail = ({ label, color="bg-gray-100", to, data, extraClasses="" }) => {
  return (
    <Link to={to} className={
      `w-full p-2 my-1 rounded-lg hover:bg-gray-300 grid
      grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-center
      ${extraClasses}
      ${color}`}>
      <p className="text-black text-center sm:text-right font-semibold font-jose">{label}</p>
      <p className="text-gray-800 text-center sm:text-left font-jose">{data}</p>
    </Link>
  )
}

export default Detail;
