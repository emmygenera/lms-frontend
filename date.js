/*

Date#toLocaleDateString  can be used to create standard locale-specific renderings. The locale and options arguments let applications specify the language whose formatting conventions should be used, and allow some customization of the rendering.

Options key examples:
day:
The representation of the day.
Possible values are "numeric", "2-digit".
weekday:
The representation of the weekday.
Possible values are "narrow", "short", "long".
year:
The representation of the year.
Possible values are "numeric", "2-digit".
month:
The representation of the month.
Possible values are "numeric", "2-digit", "narrow", "short", "long".
hour:
The representation of the hour.
Possible values are "numeric", "2-digit".
minute: The representation of the minute.
Possible values are "numeric", "2-digit".
second:
The representation of the second.
Possible values are "numeric", 2-digit".
All these keys are optional. You can change the number of options values based on your requirements, and this will also reflect the presence of each date time term.

Note: If you would only like to configure the content options, but still use the current locale, passing null for the first parameter will cause an error. Use undefined instead.

For different languages:
"en-US": For English
"hi-IN": For Hindi
"ja-JP": For Japanese
You can use more language options.
*/
// For example

var options = { weekday: "long", year: "numeric", month: "short", day: "2-digit" };
var today = new Date();

console.log(today.toLocaleDateString("en-US")); // 9/17/2016
console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
console.log(today.toLocaleDateString("hi-IN", options));

// let d = new Date(2010, 7, 5);
function dateFormatted(dateString) {
  let d = new Date(dateString);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  let wk = new Intl.DateTimeFormat("en", { weekday: "short" }).format(d);
  return `${wk}, ${da} ${mo} ${ye}`;
}
function join(t, a, s) {
  function format(m) {
    let f = new Intl.DateTimeFormat("en", m);
    return f.format(t);
  }
  return a.map(format).join(s);
}

let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];
let s = join(new Date(), a, "-");
// console.log(s);
