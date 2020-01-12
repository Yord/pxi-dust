module.exports = {
  name: 'line',
  desc: 'treats lines as chunks.',
  func: ({verbose}) => (data, linesOffset, noMoreData) => {
    const chunks = []
    const lines  = []
    const err    = []
  
    const recordSeparator = '\n'
  
    let lastLine = linesOffset
    let prev     = -1
    let last     = data.indexOf(recordSeparator, prev + 1)
  
    while (last > -1) {
      const chunk = data.slice(prev + 1, last)
      chunks.push(chunk)
      if (verbose > 0) {
        lastLine++
        lines.push(lastLine)
      }
      prev = last
      last = data.indexOf(recordSeparator, prev + 1)
    }
  
    const rest = data.slice(prev + 1)
  
    return {err, chunks, lines, lastLine, rest}
  }
}