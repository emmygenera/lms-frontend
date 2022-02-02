import isFunction from './isFunction'
import { EmjsF } from './Emjs'
const location = window.location
export function object_extract(object = {}) {
  let ins_val = [],
    ins_key = []
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      ins_val.push(object[key])
      ins_key.push(key)
    }
  }
  const rt = {
    key: ins_key,
    value: ins_val,
  }
  return rt
}
export function baseUrl(path) {
  if (path === void 0) {
    path = ''
  }
  let url = ''
  const base = document.querySelector('base')
  if (base) {
    url = base.getAttribute('href')
  } else url = location.protocol + '//' + location.host

  return url + '/' + path
}
export function assetUrl(path) {
  if (path === void 0) {
    path = ''
  }
  let url = ''
  const base = document.querySelector("meta[name='asseturl']")
  if (base) {
    url = base.getAttribute('content')
  } else url = location.protocol + '//' + location.host

  return url + '/' + path
}

export function jsonValue(object, defaultValue = null) {
  return {
    get: (key) => {
      try {
        return typeof object[key] == 'undefined' || !Object.hasOwnProperty.call(object, key) ? defaultValue : object[key]
      } catch (e) {}
      return defaultValue
    },
    has: (key) => {
      try {
        return typeof object[key] == 'undefined' || !Object.hasOwnProperty.call(object, key) ? false : true
      } catch (e) {}
      return false
    },
    toString: (key) => {
      try {
        return EmjsF(typeof object[key] == 'undefined' || !Object.hasOwnProperty.call(object, key) ? {} : object[key]).toString()
      } catch (e) {}
      return false
    },
    toStringAll: () => {
      try {
        return EmjsF(object).toString()
      } catch (e) {}
      return '{}'
    },
    initObject: object,
  }
}

export function toCapitalize(text) {
  const kc = text.split(' ')
  const ck = kc.map((i) => i.charAt(0).toUpperCase() + i.substring(1, i.length))
  return ck.join(' ')
}
export function FormatDate(dateTime = '') {
  const kc = dateTime.split(' ')
  return {
    getTime() {
      const ck = kc.pop()
      return ck
    },
    getDate(replace = '/') {
      try {
        const ck = kc[0]
        return ck.replace(/-/gi, replace)
      } catch (error) {}
      return null
    },
  }
}
// function object_is_equal(...args) {
//     let val_key = {},
//       val_combine = [];
//   args.forEach((it)=>{
//     if (EmjsF(it).isJson()) {
//       for (const k in it) {
//         if (Object.hasOwnProperty.call(object, k)) {
//          if (!val_key[k]) {
//           val_key.k=k;
//         }
//         if (val_key[k]) {
//           val_combine.push(it[k]);
//         }

//         }
//       }
//     }
//   });
//   return null;
// }

/**
 * setAString()
 * set the value of an Object Array data
 * @params stateCopy Object
 * @params updateState Object
 * */
export function setAString(stateCopy = [], updateState_, toggle = false) {
  let newState__ = updateState_
  const exestsState = stateCopy.some((item, index) => {
    const exsts = item == updateState_
    if (exsts) {
      newState__ = { index, data: updateState_ }
    } else {
      newState__ = updateState_
    }
    return exsts
  })

  if (exestsState) {
    if (toggle) stateCopy = stateCopy.filter(($, idx) => idx !== newState__.index)
    else stateCopy[newState__.index] = newState__.data
    console.log(stateCopy)
  } else stateCopy.push(newState__)
  return stateCopy
}

/**
 * setArrayObject()
 * set the value of an Object Array data
 * @params stateCopy Object
 * @params updateState Object
 * */
export function setAObject(stateCopy, updateState_) {
  let key
  if (EmjsF(updateState_).isJson) {
    key = updateState_['key']
  } else {
    key = updateState_
  }

  if (!stateCopy.length > 0) stateCopy.push(updateState_)
  let newState__
  const exestsState = stateCopy.some((item, index) => {
    const exsts = item.key == key
    if (exsts) {
      newState__ = { index, data: { ...item, ...updateState_ } }
    } else {
      newState__ = updateState_
    }
    return exsts
  })
  if (exestsState) {
    stateCopy[newState__.index] = newState__.data
  } else stateCopy.push(newState__)
  return stateCopy
}

/**
 * getAarrayObject()
 *  get the value of an Object Array data
 * @params object Array
 * @params key String
 * @params defaultVal String if no match found
 * */
export function getAObject(obj = [], key = null, defaultVal = {}) {
  let newState = defaultVal
  if (key)
    obj.forEach((item) => {
      if (item.key == key) {
        return (newState = item.value)
      }
    })
  return newState
}

// export function numberComma(numc) {
//     function gtk(numc) {
//         let v = (numc / 1000).toString().split(".")[1],
//             v2 = (numc / 1000).toString().split(".")[0],
//             gt = v > 0 ? Number("0." + v) * 1000 : (v = 0);

//         gt = gt >= 10 || gt < 99 ? "0" + gt : gt;
//         gt = gt >= 1 || gt < 10 ? (gt = 0 + gt) : gt;

//         return v2 + "," + gt;
//     }
//     function gtm(numc) {
//         let vaal = (numc / 1000000).toString().split(".")[0],
//             vaal2 = (numc / 1000000).toString().split(".")[1],
//             gt = vaal2 > 0 ? Number("0." + vaal2) * 1000000 : (vaal2 = 0);
//         // console.log(vaal, vaal2, numc / 1000000);
//         var gs = gtk(gt).split(",");
//         var v2 = gs[0];
//         v2 = v2 < 99 ? 0 + v2 : v2;
//         v2 = v2 < 10 ? (v2 = 0 + v2) : v2;
//         gt = gs[1];

//         return vaal + "," + v2 + "," + gt;
//     }
//     function gtb(numc) {
//         const sp = (numc / 1000000000).toString().split(".");
//         var vaal = sp[0],
//             vaal2 = sp[1];
//         const gt = vaal2 > 0 ? Number("0." + vaal2) * 1000000000 : (vaal2 = 0),
//             gb = gtm(vaal2).split(",");
//         let st = gb[0];
//         st = st < 99 ? "0" + st : st;
//         st = st < 10 ? (st = 0 + st) : st;
//         const st2 = gb[1],
//             st3 = gb[2];

//         return vaal + "," + st + "," + st2 + "," + st3;
//     }
//     let total;
//     if (numc > 999) {
//         total = gtk(numc);
//     }
//     if (numc > 999999) {
//         total = gtm(numc);
//     }
//     if (numc > 999999999) {
//         total = gtb(numc);
//     }

//     return total;
// }

function appendAt(arrayVal = [], at = [], insertval = ',') {
  let val = [],
    _at = []

  if (!EmjsF(arrayVal).isArray()) throw new Error("array value expected for 'arrayVal'")

  if (!EmjsF(at).isArray()) {
    _at.push(at)
  } else _at = at

  arrayVal.forEach((v, i) => {
    let isvat = _at.some((vat) => {
      return i == vat
    })
    val = val.concat(isvat ? [insertval, v] : v)
  })

  return val
}

export function numberComma(num) {
  let total,
    val = [],
    numstr = String(num).split('.'),
    numpop = numstr.pop(),
    numval = Number(numstr[0] || num),
    numarray = numval.toString().split('').reverse()

  if (numval > 999999999999) {
    val = val = appendAt(numarray, [3, 6, 9, 12])
  } else if (numval > 999999999) {
    val = val = appendAt(numarray, [3, 6, 9])
  } else if (numval > 999999) {
    val = val = appendAt(numarray, [3, 6])
  } else if (numval > 999) {
    val = appendAt(numarray, 3)
  } else val = numarray

  total = val.reverse().join('') + (numpop == '' || numpop == null ? '.' + numpop : '')

  return total
}
