import { scale } from './scale';
import { Palette } from './Palette';
import { Themes } from "./Themes";

const palette = Palette.createStandardPalette(Themes.EARTH_AND_SKY)

export function iterationsToColor(n: number, maxIterations: number) {
  return palette.getColor(scale(n, 0, maxIterations, 0, 1))
}
