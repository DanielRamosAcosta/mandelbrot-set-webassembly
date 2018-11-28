// import Big from 'https://unpkg.com/big.js@5.2.2/big.mjs'
import { Complex } from './Complex';
import { iterationsToColor } from './mandelbrot-themes';
import { scale } from './scale';
import { Color } from './Color';

type RenderingOptions = {
  minCorner?: Complex
  maxCorner?: Complex
  maxIterations?: number
}

export interface RenderDataStorage {
  getHeight: () => number
  getWidth: () => number
  setColor: (x: number, y: number, color: Color) => void
}

export class MandelbrotSet {
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

  public minCornerA () { return this.minCorner.getA().toString() }
  public minCornerB () { return this.minCorner.getB().toString() }
  public maxCornerA () { return this.maxCorner.getA().toString() }
  public maxCornerB () { return this.maxCorner.getB().toString() }


  zoomCanvas (startXPx: number, endXPx: number, startYPx: number, endYPx: number) {
    const minCornerA = scale(startXPx, 0, this.width,  this.minCorner.getA(), this.maxCorner.getA())
    const maxCornerA = scale(endXPx, 0, this.width,  this.minCorner.getA(), this.maxCorner.getA())
    const minCornerB = scale(startYPx, 0, this.height, this.minCorner.getB(), this.maxCorner.getB())
    const maxCornerB = scale(endYPx, 0, this.height, this.minCorner.getB(), this.maxCorner.getB())
  
    this.minCorner = new Complex(minCornerA, minCornerB)
    this.maxCorner = new Complex(maxCornerA, maxCornerB)
  }

  iterationsUntilItEscapes(c: Complex, maxIterations: number) {
    let z = new Complex(0, 0);
  
    for (let n = 0; n < maxIterations; n++) {
      z = z.square().add(c);
      if (z.hasEscaped()) {
        return n;
      }
    }
  
    return maxIterations;
  }

  render(dataStorage: RenderDataStorage, {
    minCorner = this.minCorner,
    maxCorner = this.maxCorner,
    maxIterations = 100
  }: RenderingOptions) {
    for (let y = 0; y < dataStorage.getHeight(); y++) {
      for (let x = 0; x < dataStorage.getWidth(); x++) {
        const c = new Complex(
          scale(x, 0, dataStorage.getWidth(), minCorner.getA(), maxCorner.getA()),
          scale(y, 0, dataStorage.getHeight(), minCorner.getB(), maxCorner.getB())
        )
  
        const n = this.iterationsUntilItEscapes(c, maxIterations);
        const color = iterationsToColor(n, maxIterations);
        dataStorage.setColor(x, y, color);
      }
    }

    return dataStorage
  }
}
