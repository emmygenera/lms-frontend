export default function RandomString(length = 16) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//Can change 7 to 2 for longer results.
const generateRandomChars = (len = 5) => (Math.random() + 1).toString(36).substring(len);
// console.log("random", r);
