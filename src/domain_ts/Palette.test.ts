import { Palette } from "./Palette";
import { Themes } from "./Themes";

type Color = [number, number, number];

describe('EarthAndSky', () => {
  const data = [
    [Themes.EARTH_AND_SKY, 0.1, [255, 221, 85]],
    [Themes.EARTH_AND_SKY, 0.2, [222, 156, 5]],
    [Themes.EARTH_AND_SKY, 0.3, [155, 60,  16]],
    [Themes.EARTH_AND_SKY, 0.7, [0, 17,  170]],
    [Themes.HOT_AND_COLD, 0.1, [96, 159, 255]],
    [Themes.HOT_AND_COLD, 0.2, [6, 96, 231]],
    [Themes.HOT_AND_COLD, 0.3, [21, 81,  171]],
    [Themes.HOT_AND_COLD, 0.7, [171, 21, 141]],
    [Themes.GRAY_SCALE, 0.3, [179, 179, 179]],
    [Themes.CYCLIC_GRAY_SCALE, 0.3, [153, 153, 153]],
    [Themes.RED_CYAN, 0.3, [102, 153, 153]],
    [Themes.BLUE_GOLD, 0.3, [163, 102, 102]],
    [Themes.HOT_AND_COLD, 0.3, [21, 81, 171]],
    [Themes.FIRE, 0.3, [255, 50, 0]],
  ]

  it.each(data)('palette of %s at %f', (theme: Themes, point: number, expectedColor: Color) => {
    const palette: Palette = Palette.createStandardPalette(theme)

    const color = palette.getColor(point).intoRGBTuple()

    expect(color).toEqual(expectedColor)
  })
})
