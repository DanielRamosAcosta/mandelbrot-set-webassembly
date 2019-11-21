import { IMandelbrotSet } from "../../domain/MandelbrotSet"
import { MandelbrotSet } from "./pkg"

export class MandelbrotSetWasm implements IMandelbrotSet {
  private wasmInstance: MandelbrotSet
  private importPromise: Promise<any>

  constructor(width: number, height: number) {
    this.wasmInstance = null as any
    this.importPromise = import("./pkg").then(({ MandelbrotSet }) => {
      this.wasmInstance = new MandelbrotSet(width, height)
    })
  }

  private isInitialized() {
    return Boolean(this.wasmInstance)
  }

  private async initialized() {
    if (this.isInitialized()) {
      return
    }
    await this.importPromise
  }

  public async minCornerA() {
    await this.initialized()
    return this.wasmInstance.min_corner_a()
  }
  public async minCornerB() {
    await this.initialized()

    return this.wasmInstance.min_corner_b()
  }
  public async maxCornerA() {
    await this.initialized()

    return this.wasmInstance.max_corner_a()
  }
  public async maxCornerB() {
    await this.initialized()
    return this.wasmInstance.max_corner_b()
  }

  async zoomCanvas(startXPx: number, endXPx: number, startYPx: number, endYPx: number) {
    await this.initialized()
    this.wasmInstance.zoom_canvas(startXPx, endXPx, startYPx, endYPx)
  }

  async render(maxIterations = 100): Promise<Uint8ClampedArray> {
    await this.initialized()
    return this.wasmInstance.render(maxIterations)
  }
}
