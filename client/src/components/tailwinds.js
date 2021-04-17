// This file contains combinations of tailwindcss classes that are used
// to style common components
// The order is usually:
// positioning & responsiveness,
// text styles
// shape and border
// background
// hover & focus effects

export const navLinkClasses =
  " relative flex items-center justify-center cursor-pointer link ";

export const accountFormClasses =
  " flex flex-col mb-3 justify-items-center " +
  " rounded-md bg-gradient-to-bl from-gray-900 to-gray-700 ";

export const submitClasses =
  " flex flex-row items-center justify-center p-4 w-full " +
  " font-bold font-medium text-sm text-green-500 " +
  " rounded-xl border-l border-green-400 cursor-pointer " +
  " bg-gradient-to-br from-gray-900 to-gray-700 " +
  " hover:text-green-400 hover:border-blue-400 " +
  " hover:bg-gradient-to-tl hover:from-gray-700 hover:to-gray-900 ";





export const summaryClasses =
  " self-start flex flex-col px-5 py-3 w-full " +
  " text-lg text-gray-100 text-center font-bold " +
  " rounded-t-lg border-b border-green-900 " +
  " bg-gradient-to-br from-black to-gray-700 ";

export const mainClasses =
  " flex-1 flex flex-col md:flex-row mx-auto " +
  " rounded " +
  " bg-gradient-to-br from-black via-black to-gray-900 ";

// Card Classes
export const cardContainerClasses =
  " rounded-xl border-l border-gray-700 " +
  " bg-gradient-to-br from-gray-900 to-black ";
export const headerTextClasses =
  " bg-clip-text text-transparent font-semibold text-2xl " +
  " bg-gradient-to-b from-gray-100 to-blue-400 ";
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
  " font-bold font-medium text-sm text-gray-900 " +
  " rounded-l-xl " +
  " bg-gradient-to-br from-gray-100 to-gray-200 ";
export const inputClasses =
  " text-gray-600  " +
  " rounded-xl " +
  " bg-white " +
  " focus:outline-none focus:ring-2 ring-green-500 ";
export const selectClasses =
  " w-full border-gray-300 rounded-xl " +
  " text-gray-600 bg-white " +
  " hover:border-gray-400 focus:outline-none appearance-none ";
export const buttonClasses =
  " px-3 py-2 " +
  " font-bold font-medium text-sm  " +
  " rounded-xl border-l shadow " +
  " bg-gradient-to-br from-black to-gray-700 " +
  " hover:bg-gradient-to-tl hover:from-gray-700 hover:to-black " +
  " focus:outline-none ";
