// This file contains combinations of tailwindcss classes that are used
// to style common components
// The order is usually:
// positioning & responsiveness,
// text styles
// shape and border
// background
// hover & focus effects

export const navLinkClasses =
  "relative flex items-center justify-center cursor-pointer link ";

export const accountFormClasses =
  "flex flex-col mb-3 justify-items-center " +
  "rounded-md bg-gradient-to-bl from-gray-900 to-gray-700 ";

export const labelClasses =
  "font-bold font-medium text-sm text-blue-200 ";

export const submitClasses =
  "flex flex-row items-center justify-center p-4 w-full " +
  "font-bold font-medium text-sm text-green-500 " +
  "rounded-xl border-b-2 border-green-400 cursor-pointer " +
  "bg-gradient-to-br from-gray-900 to-gray-700 " +
  "hover:text-green-400 hover:border-blue-400 " +
  "hover:bg-gradient-to-tl hover:from-gray-700 hover:to-gray-900 ";

export const inputClasses =
  "my-1 p-2 w-full " +
  "text-gray-600  " +
  "rounded-xl " +
  "bg-white " +
  "focus:outline-none focus:ring-4 ring-green-500 ";

export const selectClasses =
  "my-1 p-2 border w-full border-gray-300 rounded-xl " +
  "text-gray-600 bg-white " +
  "hover:border-gray-400 focus:outline-none appearance-none ";

export const buttonClasses =
  "mb-2 px-3 py-2 " +
  "font-bold font-medium text-sm  " +
  "rounded-xl border-b " +
  "bg-gradient-to-br from-black to-gray-700 " +
  "hover:bg-gradient-to-tl hover:from-gray-700 hover:to-black " +
  "focus:outline-none";

export const summaryClasses =
  "self-start flex flex-col px-5 py-3 w-full " +
  "text-lg text-gray-100 text-center font-bold " +
  "rounded-t-lg border-b border-green-900 " +
  "bg-gradient-to-br from-black to-gray-700 ";

export const tableFormClasses =
  "flex flex-col pt-6 mb-3 justify-items-center " +
  "rounded-md ";

export const tableFormContainerClasses =
  "w-full sm:w-1/4 flex flex-col align-center mb-6 sm:mr-6 sm:mb-0 " +
  "rounded-md ring-2 ring-gray-500 " +
  "bg-gradient-to-br from-gray-700 to-gray-500 ";

export const tableContainerClasses =
  "w-full min-h-screen " +
  "rounded-md ring-2 ring-gray-500 " +
  "bg-gradient-to-br from-gray-700 to-gray-500 ";

export const tableHeaderClasses =
  "text-left";

export const tableRowClasses =
  "bg-gray-200";

export const tableFooterClasses =
  "h-5 rounded-b-md bg-gray-900 "

export const mainClasses =
  "md:w-5/6 sm:w-full flex flex-col md:flex-row mx-auto " +
  "rounded " +
  "bg-gradient-to-br from-black via-black to-gray-900 ";
