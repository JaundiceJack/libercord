// This file contains combinations of tailwindcss classes that are used
// to style common components
// The order is usually:
// positioning & responsiveness,
// text styles
// shape and border
// background
// hover & focus effects



export const accountFormClasses =
  " flex flex-col mb-3 justify-items-center " +
  " rounded-md bg-gradient-to-bl from-gray-900 to-gray-700 ";



export const fancyText =
  " bg-clip-text text-transparent font-semibold font-jose " +
  " bg-gradient-to-b from-gray-100 to-blue-400 ";



export const summaryClasses =
  " self-start flex flex-col px-5 py-3 w-full " +
  " text-lg text-gray-100 text-center font-bold " +
  " rounded-t-lg border-b border-green-900 " +
  " bg-gradient-to-br from-black to-gray-700 ";

export const mainClasses =
  " flex-1 flex flex-col md:flex-row mx-auto " +
  " rounded " +
  " bg-gradient-to-br from-black via-black to-gray-900 ";

// Nav Classes
export const navClasses =
  " flex flex-row md:flex-col sticky top-0 sm:h-screen z-50 " +
  " bg-black rounded-bl rounded-b-lg sm:rounded-none "
export const navLinkClasses =
  " relative flex group items-center justify-center " +
  " border-t-4 sm:border-t-0 border-l-0 sm:border-l-4 border-black hover:border-blue-400 " +
  " h-16 w-20 cursor-pointer ";
export const navIconClasses =
  " absolute opacity-1 group-hover:opacity-0 text-gray-300 " +
  " transition duration-300 ease-in-out ";
export const navTextClasses =
  " absolute opacity-0 group-hover:opacity-100 ml-0 sm:ml-2 " +
  " text-gray-300 text-lg no-underline hover:no-underline " +
  " transition duration-300 ease-in-out ";


// Card Classes
export const cardContainerClasses =
  " rounded-xl border-l border-gray-800 " +
  " bg-gradient-to-br from-transparent to-gray-900 ";
export const headerTextClasses =
  " font-semibold text-xl font-jose " +
  " text-blue-200 ";
export const hrLeftClasses =
  " h-px w-full bg-gradient-to-r from-yellow-600 to-transparent ";
export const hrCenterClasses =
  " h-px w-full bg-gradient-to-r from-transparent via-yellow-600 to-transparent ";

// Table Classes
export const tableContainerClasses =
  " min-h-screen " +
  " rounded-xl border-l border-gray-600 " +
  " bg-gray-300 ";
export const tableHeaderClasses =
  " bg-gradient-to-br from-gray-700 to-gray-900 rounded-t-xl text-blue-100 "
export const tableRowClasses =
  " bg-gray-300 border-b border-gray-400 hover:bg-gray-400 ";
  export const tableSelectedClasses =
    " bg-yellow-300 border-l-8 border-yellow-500 ";
export const tableFooterClasses =
  " h-5 rounded-b-md bg-gray-900 "

// Input Classes
export const tableFormContainerClasses =
  " w-full sm:w-1/4 flex flex-col align-center mb-6 sm:mr-6 sm:mb-0 " +
  " rounded-md ring-2 ring-gray-500 " +
  " bg-gradient-to-br from-gray-700 to-gray-500 ";
export const labelClasses =
  " px-3 py-2 " +
  " font-bold font-medium font-jose text-sm text-blue-100 " +
  " rounded-l-xl " +
  " bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700 ";
export const inputClasses =
  " text-gray-600 font-jose " +
  " rounded-xl " +
  " bg-white " +
  " focus:outline-none focus:ring-2 ring-green-500 ";
export const selectClasses =
  " w-full border-gray-300 rounded-xl " +
  " text-gray-600 bg-white font-jose " +
  " hover:border-gray-400 focus:outline-none appearance-none ";
export const buttonClasses =
  " px-3 py-2 " +
  " font-bold font-jose font-medium text-sm  " +
  " rounded-xl border-l shadow " +
  " bg-gradient-to-br from-black to-gray-700 " +
  " hover:bg-gradient-to-tl hover:from-gray-700 hover:to-black " +
  " focus:outline-none ";
export const submitClasses =
  " flex flex-row items-center justify-center p-4 w-full " +
  " font-bold font-jose text-sm text-green-500 " +
  " rounded-xl border-l border-green-400 cursor-pointer " +
  " bg-gradient-to-br from-gray-900 to-gray-700 " +
  " hover:text-green-400 hover:border-blue-400 " +
  " hover:bg-gradient-to-tl hover:from-gray-700 hover:to-gray-900 focus:outline-none ";

export const errorMsgClasses =
  " px-3 py-2 mb-2 " +
  " font-semibold text-white " +
  " rounded-xl border-l border-gray-500 " +
  " bg-gradient-to-tl from-red-900 to-gray-900  " +
  " fadeError  "
