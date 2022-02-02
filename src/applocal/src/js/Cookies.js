export default function Cookie(name) {
  function set(value, expiredate) {
    var d = new Date(),
      exp
    if (expiredate) {
      d.setTime(d.getTime() + expiredate * 24 * 60 * 60 * 1000)
      exp = d.toGMTString()
    } else exp = d.toGMTString()
    document.cookie = name + '=' + value + ';expires=' + exp + ';path=/;'
  }
  function get() {
    var sp = '',
      ck = document.cookie.split(';')
    ck.forEach(function (i) {
      const spl_i = i.split('=')[0].toString()
      if (spl_i?.search(name) !== -1 && spl_i) {
        return (sp = i.split('=').pop())
      }
    })
    return sp
  }
  function has() {
    var ck = document.cookie.split(';'),
      _has = false

    ck.forEach(function (i) {
      const spl_i = i.split('=')[0].toString()
      if (spl_i?.search(name) !== -1 && spl_i) {
        return (_has = true)
      }
    })
    return _has
  }
  function remove() {
    set(name, '', -1)
  }
  return { set, remove, get, has }
}

export function getUrlParam(name = '') {
  var sp = '',
    ck = window.location.search,
    param = {}
  if (ck.search(/^\?/gi) !== -1) {
    ck = ck.substring(1, ck.length)
  } else if (ck == '') return ck

  const spl = ck.split('&')
  const nameParam = name == '' || name == '*'
  spl.forEach(function (i) {
    const spl_i = i.split('=')[0].toString().trim()
    if (nameParam) {
      param[spl_i] = i.split('=').pop()
    } else if (spl_i == name && spl_i) {
      return i.split('=').pop()
    }
  })
  return nameParam ? param : sp
}
