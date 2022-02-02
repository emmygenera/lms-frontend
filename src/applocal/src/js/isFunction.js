function isFunction(func) {
  return (
    (func && {}.toString.call(func) === "[object Function]") ||
    typeof func == "function" ||
    func instanceof Function
  );
}

export default isFunction;
