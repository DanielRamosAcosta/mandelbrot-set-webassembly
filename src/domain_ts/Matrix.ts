export class Matrix {
  private values: Array<
    Array<{
      r: number
      g: number
      b: number
    }>
  >
  constructor(x: number, y: number) {
    this.values = new Array(x)
      .fill(0)
      .map(() => new Array(y).fill(0).map(() => ({ r: 0, g: 0, b: 0 })))
  }
  setColor(
    x: number,
    y: number,
    color: {
      r: number
      g: number
      b: number
    },
  ) {
    this.isInRange(x, y)
    this.values[x][y] = color
  }
  private isInRange(x: number, y: number) {
    if (x >= this.values.length) {
      throw new Error(`X: ${x} out of range of ${this.values.length}`)
    }
    if (y >= this.values[x].length) {
      throw new Error(`Y: ${y} out of range of ${this.values[x].length}`)
    }
  }
  getColor(x: number, y: number) {
    this.isInRange(x, y)
    return this.values[x][y]
  }
}
