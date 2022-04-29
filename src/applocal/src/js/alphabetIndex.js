export default function alphabetIndex(value = "", seperator = "") {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const _value = value.replace(/[\W]/gi, "");
  if (!_value) {
    return "0";
  }
  return _value
    .toLowerCase()
    .split("")
    .map((v) => (Number.isInteger(parseInt(v)) ? v : alphabet.indexOf(v) + 1 || 0))
    .join(seperator);
}

export const charIndex = alphabetIndex;

export const alphabetIndexSum = function (value = "") {
  return alphabetIndex(value, ",")
    .split(",")
    .reduce((l, r) => parseInt(r), 0);
};
