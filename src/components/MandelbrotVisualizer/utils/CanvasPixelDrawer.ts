import { Color } from "../../../domain_ts/Color"
import { RenderDataStorage } from "../../../domain_ts/MandelbrotSet"

/**
 * Allows drawing per-pixel in a Canvas
 * Main idea from: https://gist.github.com/biovisualize/5400576
 */
export class CanvasPixelDrawer implements RenderDataStorage {
  private imageData: ImageData
  private width: number
  private height: number
  private buf8: Uint8ClampedArray
  private data: Uint32Array

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  
    this.imageData = ctx.createImageData(canvas.width, canvas.height)
    this.width = canvas.width
    this.height = canvas.height

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
