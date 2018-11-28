import { Color } from './Color';
import { scale } from './scale';
import { Palette, Themes } from './Palette';

function hueTheme(n: number, maxIterations: number) {
  if (n === maxIterations) {
    return Color.fromRGB(0, 0, 0)
  }

  const hue = scale(n, 0, maxIterations, 0, 1)
  
  return Color.fromHSL(hue, 1, 0.5);
}

function greyScaleTheme(n: number, maxIterations: number) {
  if (n === maxIterations) {
    return Color.fromRGB(0, 0, 0)
  }

  const brightness = Math.round(scale(n, 0, maxIterations, 0, 255))
  
  return Color.fromRGB(brightness, brightness, brightness);
}

const palette = Palette.createStandardPalette(Themes.EarthAndSky)

function byDavidEck(n: number, maxIterations: number) {
  const [r, g, b] = palette.getColor(scale(n, 0, maxIterations, 0, 1))
  return Color.fromRGB(r, g, b)
}

export function iterationsToColor(n: number, maxIterations: number) {
  return byDavidEck(n, maxIterations)
}
