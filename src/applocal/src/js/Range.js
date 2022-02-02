export default function Range(start, end, value) {
  let strt = start,
    range = [];

  while (strt <= end) {
    range.push(typeof value == "undefined" ? strt : value);
    strt++;
  }
  return range;
}
