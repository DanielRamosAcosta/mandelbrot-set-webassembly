// import Big from 'https://unpkg.com/big.js@5.2.2/big.mjs'
import { Complex } from "./Complex"
import { iterationsToColor } from "./mandelbrot-themes"
import { scale } from "./scale"
import { IMandelbrotSet } from "../../domain/MandelbrotSet"

export class MandelbrotSetTypescript implements IMandelbrotSet {
  private minCorner: Complex
  private maxCorner: Complex
  private width: number
  private height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    const ratio = this.height / this.width
    const initialWidth = 3

    this.maxCorner = new Complex(initialWidth, initialWidth * ratio)
    this.minCorner = new Complex(-initialWidth, -initialWidth * ratio)
  }

  public async minCornerA() {
    return this.minCorner.getA().toString()
  }
  public async minCornerB() {
    return this.minCorner.getB().toString()
  }
  public async maxCornerA() {
    return this.maxCorner.getA().toString()
  }
  public async maxCornerB() {
    return this.maxCorner.getB().toString()
  }

  async zoomCanvas(startXPx: number, endXPx: number, startYPx: number, endYPx: number) {
    const minCornerA = scale(startXPx, 0, this.width, this.minCorner.getA(), this.maxCorner.getA())
    const maxCornerA = scale(endXPx, 0, this.width, this.minCorner.getA(), this.maxCorner.getA())
    const minCornerB = scale(startYPx, 0, this.height, this.minCorner.getB(), this.maxCorner.getB())
    const maxCornerB = scale(endYPx, 0, this.height, this.minCorner.getB(), this.maxCorner.getB())

    this.minCorner = new Complex(minCornerA, minCornerB)
    this.maxCorner = new Complex(maxCornerA, maxCornerB)
  }

  private iterationsUntilItEscapes(c: Complex, maxIterations: number) {
    let z = new Complex(0, 0)

    for (let n = 0; n < maxIterations; n++) {
      z = z.square().add(c)
      if (z.hasEscaped()) {
        return n
      }
    }

    return maxIterations
  }

  async render(maxIterations = 100): Promise<Uint8ClampedArray> {
    const minCorner = this.minCorner
    const maxCorner = this.maxCorner

    const colors = []

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const c = new Complex(
          scale(x, 0, this.width, minCorner.getA(), maxCorner.getA()),
          scale(y, 0, this.height, minCorner.getB(), maxCorner.getB()),
        )

        const n = this.iterationsUntilItEscapes(c, maxIterations)
        const color = iterationsToColor(n, maxIterations)
        colors.push(color.getR())
        colors.push(color.getG())
        colors.push(color.getB())
        colors.push(255)
      }
    }

    return new Uint8ClampedArray(colors)
  }
}
