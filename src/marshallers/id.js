module.exports = {
  name: 'id',
  desc: 'applies Object.prototype.toString to the input and joins without newlines.',
  func: (verbose, failEarly, argv) => jsons => {
    let str = ''

    for (let index = 0; index < jsons.length; index++) {
      const obj = jsons[index]
      str += obj.toString()
    }

    return {err: '', str}
  }
}