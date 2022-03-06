// Capitalize the first word of each string
export const capitalize = (strang) => {
  if (strang && strang.length > 0) {
    const words = strang.split(' ');
    let final = [];
    words.forEach(word => final.push(word[0].toUpperCase()+word.substring(1)));
    return final.join(' ');
  } else return "";
}

// Clip off a string and add ... if length is over n
export const truncateString = (str, n) => {
  if (!str) {
    return "..."
  }
  else if (str.length > n) {
    return str.substring(0, n) + "...";
  } else {
    return str;
  }
}
