export interface IMandelbrotSet {
  minCornerA(): Promise<string>
  minCornerB(): Promise<string>
  maxCornerA(): Promise<string>
  maxCornerB(): Promise<string>
  zoomCanvas(startXPx: number, endXPx: number, startYPx: number, endYPx: number): Promise<void>
  render(maxIterations?: number): Promise<Uint8ClampedArray>
}
