import { Color } from "./Color"
import { Themes, THEMES_MAP } from "./Themes"

export type DivisionPoints = number[]
export type Colors = Array<Color>

/**
 * Palette & themes originally made by David Eck
 * http://math.hws.edu/eck/js/mandelbrot/MB.html
 */
export class Palette {
  constructor(private divisionPoints: DivisionPoints, private divisionColors: Color[]) {}

  getNearestDivisionPoint(position: number) {
    let nearestDivisionPoint = 1
    while (position > this.divisionPoints[nearestDivisionPoint]) {
      nearestDivisionPoint++
    }
    return nearestDivisionPoint
  }

  /**
   * Resturns the Color that corresponds to the given Position
   * @param position Value between 0 and 1
   */
  public getColor(position: number): Color {
    const nearestDivisionIndex = this.getNearestDivisionPoint(position)
    const leftPoint = this.divisionPoints[nearestDivisionIndex - 1]
    const rightPoint = this.divisionPoints[nearestDivisionIndex]

    const ratio = (position - leftPoint) / (rightPoint - leftPoint)

    return Color.colorBetween(
      this.divisionColors[nearestDivisionIndex - 1],
      this.divisionColors[nearestDivisionIndex],
      ratio,
    )
  }

  static createStandardPalette(theme: Themes): Palette {
    const { divisionPoints, colors } = THEMES_MAP[theme]()
    return new Palette(divisionPoints, colors)
  }
}
