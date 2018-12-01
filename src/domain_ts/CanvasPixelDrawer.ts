import { Color } from "./Color"

/**
 * Allows drawing per-pixel in a Canvas
 * Main idea from: https://gist.github.com/biovisualize/5400576
 */
export class CanvasPixelDrawer {
  private imageData: ImageData
  private width: number
  private height: number
  private buf8: Uint8ClampedArray
  private data: Uint32Array

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.imageData = ctx.createImageData(width, height)
    this.width = width
    this.height = height

    const buf = new ArrayBuffer(this.imageData.data.length)
    this.buf8 = new Uint8ClampedArray(buf)
    this.data = new Uint32Array(buf)
  }

  public getWidth() {
    return this.width
  }

  public getHeight() {
    return this.height
  }

  public setColor(x: number, y: number, color: Color) {
    this.setCanvasPixel(x, y, color)
  }
  
  public toImageData() {
    this.imageData.data.set(this.buf8)
    return this.imageData
  }

  private colorToBuffer(r: number, g: number, b: number, a = 255) {
    return (a << 24) | (b << 16) | (g << 8) | r
  }

  private setCanvasPixel(x: number, y: number, color: Color) {
    const index = y * this.width + x
    this.data[index] = this.colorToBuffer(
      color.getR(),
      color.getG(),
      color.getB()
    )
  }
}
