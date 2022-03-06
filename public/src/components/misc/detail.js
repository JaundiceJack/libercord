const Detail = ({ label, data, extraClasses="" }) => {
  return (
    <div className={"w-full rounded-lg bg-gray-200 hover:bg-gray-300 " +
      "grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-center p-2 my-1 " + extraClasses}>
      <p className="text-black text-center sm:text-right font-semibold font-jose">{label}</p>
      <p className="text-gray-800 text-center sm:text-left font-jose">{data}</p>
    </div>
  )
}

export default Detail;
