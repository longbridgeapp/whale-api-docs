export class StringBuffer {
  buffer: string[] = []
  length: number

  constructor() {
    this.buffer = []
    this.length = 0
  }

  write(s: string | StringBuffer) {
    this.length += s.length
    if (s instanceof StringBuffer) {
      s.buffer.forEach((s) => {
        this.buffer.push(s.toString())
      })
    } else {
      this.buffer.push(s)
    }
  }

  toString(joiner: string = '') {
    return this.buffer.join(joiner)
  }
}
