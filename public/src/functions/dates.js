// Convert the date to mm/dd/yyyy format
export const formatDateMMDDYYYY = (rawDate) => {
  const date = new Date(rawDate);
  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
}

// Convert the date to mm/dd format
export const formatDateMMDD = (rawDate) => {
  const date = new Date(rawDate);
  return `${date.getMonth()+1}/${date.getDate()}`;
}

// Get formatted date YYYY-MM-DD
export const formatDateForInput = (date) => {
  return date.getFullYear()
      + "-"
      + ("0" + (date.getMonth() + 1)).slice(-2)
      + "-"
      + ("0" + date.getDate()).slice(-2);
}
