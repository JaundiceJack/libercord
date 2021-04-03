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
  let day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear();
  month = (month < 10 ? "0" : "") + month;
  day   = (day < 10 ? "0" : "") + day;

  return month + " / " + day + " / " + year;
}
