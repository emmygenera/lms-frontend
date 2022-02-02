export default function DateTime() {
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
        return `${y}${rp}${m}${rp}${d}`;
    }
    return { now, date: _date, dateLocale, dateISO };
}
