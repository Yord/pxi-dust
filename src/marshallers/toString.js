module.exports = {
  name: 'toString',
  desc: 'applies Object.prototype.toString to the input and adds newlines.',
  func: (verbose, failEarly, argv) => values => {
    let str = ''

    for (let index = 0; index < values.length; index++) {
      const value = values[index]
      if (typeof value !== 'undefined' && value !== null) str += value.toString() + '\n'
    }

    return {err: '', str}
  }
}