module.exports = {
  name: 'line',
  desc: 'treats lines as chunks.',
  func: ({verbose}) => (data, linesOffset) => {
    const chunks = []
    const lines  = []
    const err    = []
  
    let text     = data
    let len      = text.length
  
    let at       = -1
    let lastLine = linesOffset
    
    let obj      = false
  
    let done     = false
    let ch
    
    do {
      at++
      ch = text.charAt(at)
  
      if (ch === '\n') {
        if (verbose) lastLine++
        obj = true
      }
  
      if (at === len) done = true
  
      if (obj) {
        obj = false
        const chunk = text.slice(0, at)
        chunks.push(chunk)
        if (verbose) lines.push(lastLine)
  
        text = text.slice(at + 1, len)
        len = text.length
        at = -1
      }
    } while (!done)
  
    return {err, chunks, lines, lastLine, rest: text}
  }
}