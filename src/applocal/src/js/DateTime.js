export function arraySort(array = []) {
  (function () {
    if (typeof Object.defineProperty === "function") {
      try {
        Object.defineProperty(Array.prototype, "sortBy", { value: sb });
      } catch (e) {}
    }
    if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

    function sb(f) {
      for (var i = this.length; i; ) {
        var o = this[--i];
        this[i] = [].concat(f.call(o, o, i), o);
      }
      this.sort(function (a, b) {
        for (var i = 0, len = a.length; i < len; ++i) {
          if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1;
        }
        return 0;
      });
      for (var i = this.length; i; ) {
        this[--i] = this[i][this[i].length - 1];
      }
      return this;
    }
  })();

  // return array.sortBy(function(o){ return new Date( o.date ) });
  return array;
}
export default function DateTime(dateString = "") {
  const pl = { year: "numeric", month: "short", day: "2-digit", weekday: "short" };
  function now() {
    const datestr = new Date().toISOString().slice(0, 19).replace("T", " ");
    return datestr;
  }
  const date = new Date(),
    [m, d, y] = date.toLocaleDateString().split("/");
  function dateLocale(rp = "/") {
    return `${m}${rp}${d}${rp}${y}`;
  }
  function _date(rp = "/") {
    return `${d}${rp}${m}${rp}${y}`;
  }
  function dateISO(rp = "-") {
    return `${y}${rp}${(m < 9 ? "0" : "") + m}${rp}${(d < 9 ? "0" : "") + d}`;
  }
  function stringFormat(data = pl) {
    let d = new Date(dateString);
    let ye = new Intl.DateTimeFormat("en", { year: data.year }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: data.month }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: data.day }).format(d);
    let wk = new Intl.DateTimeFormat("en", { weekday: data.weekday }).format(d);
    return `${wk}, ${da} ${mo} ${ye}`;
  }
  function dateFormatted() {
    const d = new Date(dateString);
    return {
      day: new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d),
      dayString: new Intl.DateTimeFormat("en", { dayPeriod: "short" }).format(d),
      week: new Intl.DateTimeFormat("en", { weekday: "short" }).format(d),
      month: new Intl.DateTimeFormat("en", { month: "numeric" }).format(d),
      monthShort: new Intl.DateTimeFormat("en", { month: "short" }).format(d),
      monthLong: new Intl.DateTimeFormat("en", { month: "long" }).format(d),
      year: new Intl.DateTimeFormat("en", { year: "numeric" }).format(d),
      yearShort: new Intl.DateTimeFormat("en", { year: "2-digit" }).format(d),
    };
  }

  /**
   * Add month ahead time
   * */
  function addMonths(months) {
    const _date = new Date(dateString);
    _date.setMonth(_date.getMonth() + months);
    return _date;
  }
  /**
   * Gets the time value in milliseconds.
   * */
  function getTime() {
    const _date = new Date("03/22/2022");
    return _date.getTime();
  }
  /**
   * Add month ahead time
   * */
  function expired() {
    const date2 = date,
      _date = new Date(dateString),
      time2 = date2.getTime(),
      time = _date.getTime();
    return time - time2 < 0;
  }
  function daysToGo() {
    const date2 = date,
      _date = new Date(dateString),
      time2 = date2.getTime(),
      time = _date.getTime();

    return Math.floor((time - time2) / 86400000);
  }

  return { now, dateFormatted, getTime, expired, addMonths, daysToGo, date: _date, dateLocale, dateISO, stringFormat };
}
