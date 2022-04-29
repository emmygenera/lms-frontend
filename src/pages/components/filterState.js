// import React, { useState } from "react";
import { arrayObjectMerge } from "../../applocal";

export default function filterState(states = {}, _useState) {
  const [filters, setFilters] = _useState({ name: [], status: [], ...states });
  function _setFilter(key = filters, value = {}) {
    setFilters((s) => ({ ...s, [key]: arrayObjectMerge(s[key], [value], "value") }));
  }

  return { filters, _setFilter };
}
