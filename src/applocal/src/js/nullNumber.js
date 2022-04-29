/***
 * get a number or renturn null as default value
 * @return Number
 * */
export default function nullNumber(num, defaultValue = null) {
  return Number.isInteger(num) ? Number(num) : defaultValue;
}
