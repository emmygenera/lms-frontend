let _v = "";

const cardDateFormat =
  (form) =>
  ({ target: { value, selectionStart }, ...e }) => {
    _v = value;

    if (_v.length === 1 && _v > 1) {
      _v = "0" + value;
    }
    if (_v === "00") {
      _v = "01";
    } else if (_v > 12) {
      _v = "12";
    }

    if (e.key === "Backspace" || (e.key === "Backspace" && selectionStart === 0)) {
      _v = _v.substring(0, _v.length - 1);
    } else {
      _v = String(_v)
        .replace("/", "")
        .split("")
        .map((v, i) => v + (i == 1 ? "/" : ""))
        .join("");
    }
    // setInitialValues((s) => ({ ...s, card_date: _v.slice(0, 5) }));
    form.setFieldsValue({ ...form.getFieldsValue(), card_date: _v.slice(0, 5) });
  };

export default cardDateFormat;
