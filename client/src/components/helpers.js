export function currentDate() {
  const today = new Date();
  let day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();
  month = (month < 10 ? "0" : "") + month;
  day   = (day < 10 ? "0" : "") + day;

  return  year + "-" + month + "-" + day;
}

export function formatDate(rawDate) {
  const date = new Date(rawDate)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let day = date.getDate(),
      month = months[date.getMonth()],
      year = date.getFullYear();
  month = (month < 10 ? "0" : "") + month;
  day   = (day < 10 ? "0" : "") + day;

  return month + " - " + day + " - " + year;
}
