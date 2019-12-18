module.exports = {
  name: 'flatMap',
  desc: 'applies f to each element, but acts differently depending on f\'s result: On undefined return nothing. On [...] return every array item individually or nothing for empty arrays. Otherwise act like map.',
  func: (fs, {verbose}) => (jsons, lines) => {
    const jsons2 = []
    const err    = []

    for (let index = 0; index < jsons.length; index++) {
      const obj = jsons[index]
      let objs  = undefined
      try {
        let acc = obj
        for (let jndex = 0; jndex < fs.length; jndex++) {
          const f = fs[jndex]
          if (typeof acc !== 'undefined') acc = f(acc)
        }
        objs = acc
      } catch (e) {
        const line = verbose > 0 ? 'Line ' + lines[index] + ': '                           : ''
        const info = verbose > 1 ? ' while transforming:\n' + JSON.stringify(obj, null, 2) : ''
        err.push(line + e + info)
      }
      if (typeof objs !== 'undefined') {
        if (Array.isArray(objs)) {
          for (let undex = 0; undex < objs.length; undex++) {
            const obj = objs[undex]
            jsons2.push(obj)
          }
        } else {
          jsons2.push(objs)
        }
      }
    }

    return {err, jsons: jsons2}
  }
}