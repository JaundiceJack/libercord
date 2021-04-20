export function currentDate() {
  const today = new Date();
  let day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();
  month = (month < 10 ? "0" : "") + month;
  day   = (day < 10 ? "0" : "") + day;

  return  year + "-" + month + "-" + day;
}

// Convert the given date to one that will fit in a 'date' input
export function inputDate(rawDate) {
  const date = new Date(rawDate);
  let day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear();
  month = (month < 10 ? "0" : "") + month;
  day   = (day < 10 ? "0" : "") + day;

  return  year + "-" + month + "-" + day;
}

// Return the given date in a short presentable format
// TODO: replace this with the twitter-date-format
export function formatDate(rawDate) {
  const date = new Date(rawDate)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let day = date.getDate(),
      month = months[date.getMonth()],
      year = date.getFullYear();
  month = (month < 10 ? "0" : "") + month;
  day   = (day < 10 ? "0" : "") + day;

  return month + " - " + day;
}
