import { Color } from './Color';
import { scale } from './scale';
import { Palette, Themes } from './Palette';

const palette = Palette.createStandardPalette(Themes.EARTH_AND_SKY)

export function iterationsToColor(n: number, maxIterations: number) {
  const [r, g, b] = palette.getColor(scale(n, 0, maxIterations, 0, 1)).intoRGBTuple()
  return Color.fromRGB(r, g, b)
}
