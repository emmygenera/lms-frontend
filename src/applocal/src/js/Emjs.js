'use strict'

import { isFunction } from '.'

// import { split } from ".././custom/split";
// import split from "./split";
// split("","ss");
// split()
export function object_entries(obj) {
  if (obj === void 0) {
    obj = {}
  }
  var ret = []
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      var v = obj[k]
      ret.push([k, v])
    }
  }
  return ret
}
export function object_merge(...obj) {
  if (obj === void 0) {
    obj = []
  }
  var ret = {}
  obj.forEach((itm) => {
    if (EmjsFunc().isJson) {
      for (var k in itm) {
        if (itm.hasOwnProperty(k)) {
          // var v = itm[k];
          ret[k] = itm[k]
          // ret.push([k, v]);
        }
      }
    }
  })

  return ret
}

export function split($value, $compare_value, $idx) {
  var _a
  if ($compare_value === void 0) {
    $compare_value = ':'
  }
  if ($idx === void 0) {
    $idx = null
  }
  var $val = String($value)
  var $exp = $val
  if ($val.indexOf($compare_value) !== -1) {
    $exp = $val.split($compare_value)
    $exp = (_a = $exp[$idx == null ? '' : String($idx)]) !== null && _a !== void 0 ? _a : $exp
  }
  return $exp
}
export function EmjsDom(query) {
  return {
    // _t: this,
    query: query,
    qu: typeof query == 'string' && query.length > 0 ? document.querySelectorAll(query) : query,
    html: function () {
      if (this.qu.length == 1) {
        return this.qu.item(0).innerHTML
      } else {
        console.log(undefined)
      }
    },
    empty: function () {
      var ret = false
      if (typeof this.query == 'string') {
        if (typeof this.query !== 'undefined' && this.query.length > 0) {
          ret = true
        }
      } else if (this.query instanceof Array || this.query instanceof Object) {
        // ret=true;
        // for (const k in this.query) {
        //     if (this.query.hasOwnProperty(k)) {
        //         const v = this.query[k];
        //         ret=false;
        //     }
        // }
        if (object_entries(this.query).length < 1) {
          ret = true
        }
      }
      return ret
    },
    val: function () {
      if (this.qu.length == 1) {
        return this.qu.item(0).value
      } else {
        console.log(undefined)
      }
    },
    each: function (callback) {
      this.qu.forEach(function (v) {
        callback(v)
      })
    },
  }
}
export function EmjsFunc(Json) {
  return {
    Json: Json,
    parse: function () {
      try {
        this.Json = typeof this.Json == 'string' ? this.Json : JSON.stringify(this.Json)
        return JSON.parse(this.Json)
      } catch (e) {
        throw new Error('not a valid [object Array]: ' + e)
      }
    },
    urlValidate: function () {
      try {
        new URL(this.Json)
      } catch (e) {
        return false
      }
      return false
    },
    objList: function (callback) {
      var ret = []
      if ((this.Json instanceof Object || this.Json instanceof Array) && (Object.prototype.toString.call(this.Json) === '[object Object]' || Object.prototype.toString.call(this.Json) === '[object Array]' || Object.prototype.toString.call(this.Json) === '[array Array]')) {
      } else console.error('Invalid Object|Array value supplied for function [ObjList]', this.Json, Object.prototype.toString.call(this.Json))
      for (var _i = 0, _a = object_entries(this.Json); _i < _a.length; _i++) {
        var _b = _a[_i],
          k = _b[0],
          v = _b[1]
        ret.push(callback(k, v))
      }
      // return ret;
      return !EmjsDom(ret.values()).empty() ? ret : null
    },
    isJson: function () {
      var dataBool = false
      if (this.Json == '' || (typeof this.Json === 'string' && String(this.Json).search(/^(\[|\{)\w/gi) === -1)) {
        // console.error(
        //     "Invalid Object data provided for Function [isJson] "
        // );
        return false
      }
      try {
        this.Json = typeof this.Json === 'string' ? this.Json : JSON.stringify(this.Json)
        this.Json = JSON.parse(this.Json)
        if (this.Json instanceof Object && (Object.prototype.toString.call(this.Json) === '[object Object]' || Object.prototype.toString.call(this.Json) === '[object Array]')) {
          dataBool = true
        }
      } catch (e) {
        throw new Error(e)
      }
      return dataBool
    },
    isArray: function () {
      if (this.Json == '' || (typeof this.Json == 'string' && String(this.Json).search(/^(\[|\{)\w/gi) == -1)) {
        // console.error(
        //     "Invalid Object data provided for Function [isArray] "
        // );
        return false
      }
      try {
        this.Json = typeof this.Json == 'string' ? this.Json : JSON.stringify(this.Json)
        this.Json = JSON.parse(this.Json)
        if (this.Json instanceof Array && (Object.prototype.toString.call(this.Json) === '[object Array]' || Object.prototype.toString.call(this.Json) === '[array Array]')) return true
      } catch (e) {
        // console.error(e);
        throw new Error(e)
      }
      return false
    },
    arrayMap: function (callbackfn) {
      if (this.Json instanceof Array && Object.prototype.toString.call(this.Json) == '[object Array]');
      else throw new Error('The supplied value for function [arrayMap] is not a valid array')
      this.Json.forEach(function (val) {
        callbackfn(val)
      })
      return true
    },
  }
}
export var implode = function (implodeData, params) {
  if (params === void 0) {
    params = ''
  }
  var imp = ''
  Ef(implodeData).objList(function (k, v) {
    imp += k + ':' + v + params
  })
  return imp
}
//

export const Emjs = /** @class */ (function () {
  /**
   *
   * @Json {parse} Json Function for parsing string array to Js object Array | Object
   */
  function Emm(Json) {
    this.Json = Json
  }
  Emm.prototype.parse = function () {
    try {
      this.Json = typeof this.Json == 'string' ? this.Json : JSON.stringify(this.Json)
      return JSON.parse(this.Json)
    } catch (e) {
      // throw new Error("not a valid [object Array]: " + e);
    }
    return this.Json
  }
  Emm.prototype.arrayObjectMerge = function (object_merge = {}) {
    try {
      // (isFunction(object_merge)?object_merge(item):object_merge);
      // ...(isFunction(object_merge) ? object_merge(item) :(EmjsF(object_merge).isJson()?object_merge:{})),
      return this.Json.map((item) => ({
        ...item,
        ...(isFunction(object_merge) ? object_merge(item) : object_merge),
      }))
    } catch (e) {
      // throw new Error("not a valid [object Array]: " + e);
    }
    return this.Json
  }
  Emm.prototype.toString = function () {
    try {
      this.Json = typeof this.Json == 'string' ? this.Json : JSON.stringify(this.Json)
      return this.Json
    } catch (e) {
      // throw new Error("not a valid [object Array]: " + e);
    }
    return this.Json
  }
  Emm.prototype.urlValidate = function () {
    try {
      new URL(this.Json)
    } catch (e) {
      return false
    }
    return false
  }
  Emm.prototype.objList = function (callback) {
    if (!isFunction(callback)) {
      console.error('Invalid callback value supplied for function callback', typeof callback)
      return
    }
    var ret = []

    if ((this.Json instanceof Object || this.Json instanceof Array) && (Object.prototype.toString.call(this.Json) == '[object Object]' || Object.prototype.toString.call(this.Json) == '[object Array]' || Object.prototype.toString.call(this.Json) === '[array Array]')) {
    } else console.error('Invalid Object|Array value supplied for function [ObjList]', this.Json, Object.prototype.toString.call(this.Json))
    var ret = [],
      $_i = 0
    for (const key in this.Json) {
      if (Object.hasOwnProperty.call(this.Json, key)) {
        const value = this.Json[key]
        ret.push(callback({ key, value, index: $_i }))
        $_i++
      }
    }
    return ret || null
  }
  Emm.prototype.isJson = function () {
    var dataBool = false
    try {
      this.Json = typeof this.Json == 'string' ? this.Json : JSON.stringify(this.Json)
      this.Json = JSON.parse(this.Json)
      if (this.Json instanceof Object && Object.prototype.toString.call(this.Json) === '[object Object]') {
        dataBool = true
      }
    } catch (e) {
      // throw new Error(e);
    }
    return dataBool
  }
  Emm.prototype.isArray = function () {
    try {
      this.Json = typeof this.Json == 'string' ? this.Json : JSON.stringify(this.Json)
      this.Json = JSON.parse(this.Json)
      if (this.Json instanceof Array && Object.prototype.toString.call(this.Json) === '[object Array]') return true
    } catch (e) {
      // console.error(e);
      // throw new Error(e);
    }
    return false
  }
  Emm.prototype.arrayMap = function (callbackfn) {
    console.log(this.Json)
    if (this.Json instanceof Array && Object.prototype.toString.call(this.Json) == '[object Array]');
    else throw new Error('The supplied value for function [arrayMap] is not a valid array')
    this.Json.forEach(function (val) {
      callbackfn(val)
    })
    return true
  }
  Emm.prototype.ereg_match = function ($data, $pattern) {
    var _this = this
    var $errorV = function ($pValue, $val) {
      return this.erVal(split($pValue, ':', 0), $val, split($pValue, ':', 1))
    }.bind(this)
    var $error = []
    // console.log($data);
    Ef($data).objList(function ($key, $values) {
      Ef($pattern).objList(function ($keys, $patternValue) {
        // console.log("keys: " + $keys, $patternValue);
        if ($keys === 'unique') {
          // $error = this.uniqIndex({$key : $values}, $patternValue);
        } else {
          var $pvc = Ef($patternValue).isJson() ? implode($patternValue) : $patternValue,
            $pv = $pvc
          if (!String($pvc).search(/^(\d)+$/) !== false) {
            $pv = $keys
          }
          if ($errorV($pv, $values)) {
            $error.push(_this.errorMsg(split($pv, ':', 0), $key, split($pvc, ':', 1)))
          }
        }
      })
    })
    return $error
  }
  Emm.prototype.validate = function ($pattern) {
    var _this = this
    var $errorV = function ($pValue, $val) {
      return this.erVal(split($pValue, ':', 0), $val, split($pValue, ':', 1))
    }.bind(this)
    var $data = this.Json,
      $result = [],
      $error = {},
      $res = []
    Ef($data).objList(function ($keys, $values) {
      Ef($pattern).objList(function ($key, $patternValue) {
        var _a, _b, _c, _d
        $res = []
        if ($keys == $key) {
          if (typeof $patternValue == 'string' && String($patternValue).indexOf('|') !== -1) {
            var $exp = split($patternValue, '|')
            if (!EmjsDom(_this.ereg_match(((_a = {}), (_a[$key] = $values), _a), $patternValue)).empty()) {
              $res = _this.ereg_match(((_b = {}), (_b[$key] = $values), _b), $exp)
            }
          } else if (Ef($patternValue).isArray()) {
            if (!EmjsDom(_this.ereg_match(((_c = {}), (_c[$key] = $values), _c), $patternValue)).empty()) {
              $res = _this.ereg_match(((_d = {}), (_d[$key] = $values), _d), $patternValue)
            }
          } else {
            if ($errorV($patternValue, $values)) {
              $res.push(_this.errorMsg(split($patternValue, ':', 0), $key, split($patternValue, ':', 1)))
            }
          }
          if (!EmjsDom($res).empty()) {
            $error[$key] = $res
          }
        }
      })
    })
    // $result = [false];
    if (!EmjsDom($error).empty()) {
      $result = [true, $error]
    }
    // $result["errors"] = $error;
    // console.log($result);
    return $result
  }
  Emm.prototype.errorMsg = function ($key, $val, args) {
    var any = args
    // const any = arguments;
    $val = $val.toUpperCase().replace(/('_'|'-')/, ' ')
    var $error = {
      required: 'The ' + $val + ' field is required.',
      integer: 'The ' + $val + ' field should be Numbers',
      int: 'The ' + $val + ' field should be Numbers',
      string: 'The ' + $val + ' field must be of type String',
      min: 'The ' + $val + ' field must be greater than ' + any || null,
      max: 'The ' + $val + ' field must be less than ' + any || null,
      url: 'The ' + $val + ' field must contain a valid URL',
      email: 'The ' + $val + ' value field must contain a valid email address',
      invalid: 'The ' + $val + ' format is invalid.',
      unique: 'The ' + $val + ' has already been taken.',
      regex: 'The given data was invalid.',
      message: 'The given data was invalid.',
    }
    // $error.message
    return $error[$key] || ''
  }
  Emm.prototype.erVal = function ($key, $val, args) {
    var any = args
    $val = $val.trim()
    var $regex = '/^' + any + '$/',
      regval = eval($regex),
      $error = {
        required: $val == '',
        integer: !String($val).search(/^(\d)+$/gi) !== false,
        int: !String($val).search(/^(\d)+$/gi) !== false,
        string: !String($val).search(/^[\w- ]+$/gi) !== true,
        max: String($val).length > Number(any),
        min: String($val).length < Number(any),
        regex: !String($val).search(regval) !== true,
        url: String($val).search(/^(ftp|https?:\/\/)([\w-]+\.)?([\w-]*)(\.\w+)?(:[0-9]+)?([\w!:\.\?+=&%@\-/]+)?$/gi) == -1,
        email: '',
      }
    return $error[$key] || false
  }
  return Emm
})()
const Ef = (Json) => EmjsFunc
export const EmjsF = (Json) => new Emjs(Json)
export default Emjs
