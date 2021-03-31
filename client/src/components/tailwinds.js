// This file contains combinations of tailwindcss classes that are used
// to style common components
// The order is usually:
// positioning & responsiveness,
// text styles
// shape and border
// background
// hover & focus effects


export const formClasses =
  "flex flex-col mb-3 justify-items-center " +
  "rounded-md bg-gradient-to-bl from-gray-900 to-gray-700 "

export const labelClasses =
  "font-bold font-medium text-sm text-blue-200 "

export const submitClasses =
  "flex flex-row items-center justify-center p-4 w-full " +
  "font-bold font-medium text-sm text-green-500 " +
  "rounded-xl border-b-2 border-green-400 cursor-pointer " +
  "bg-gradient-to-br from-gray-900 to-gray-700 " +
  "hover:text-green-400 hover:border-blue-400 " +
  "hover:bg-gradient-to-tl hover:from-gray-700 hover:to-gray-900 "

export const inputClasses =
  "my-1 p-2 w-full " +
  "text-gray-600  " +
  "rounded-xl " +
  "bg-white " +
  "focus:outline-none focus:ring-4 ring-green-500 "

export const selectClasses =
  "my-1 p-2 border w-full border-gray-300 rounded-xl " +
  "text-gray-600 bg-white " +
  "hover:border-gray-400 focus:outline-none appearance-none ";
