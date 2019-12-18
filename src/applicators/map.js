module.exports = {
  name: 'map',
  desc: 'applies f to each parsed JSON element and replaces it with f\'s result.',
  func: (fs, {verbose}) => (jsons, lines) => {
    let jsons2 = []
    let err    = []

    for (let index = 0; index < jsons.length; index++) {
      let obj = jsons[index]
      try {
        for (let jndex = 0; jndex < fs.length; jndex++) {
          const f = fs[jndex]
          if (typeof obj !== 'undefined') obj = f(obj)
        }
        jsons2.push(obj)
      } catch (e) {
        const line = verbose > 0 ? 'Line ' + lines[index] + ': '                           : ''
        const info = verbose > 1 ? ' while transforming:\n' + JSON.stringify(obj, null, 2) : ''
        err.push(line + e + info)
      }
    }

    return {err, jsons: jsons2}
  }
}