type DivisionPoints = number[]
type Colors = Array<number[]>
type RGBTuple = [number, number, number]

export enum Themes {
  GRAY_SCALE = "Grayscale",
  CYCLIC_GRAY_SCALE = "CyclicGrayscale",
  RED_CYAN = "Red/Cyan",
  BLUE_GOLD = "Blue/Gold",
  EARTH_AND_SKY = "EarthAndSky",
  HOT_AND_COLD = "HotAndCold",
  FIRE = "Fire",
  TREE_COLORS = "TreeColors",
  SEA_SHORE = "Seashore",
  RANDOM = "Random",
}

enum ColorType {
  HSB = 'HSB',
  RGB = 'RGB'  
}

const CIRCLE_ONE_SIXTH_DEGREES = 60

/**
 * Palette made by David Eck
 * http://math.hws.edu/eck/js/mandelbrot/MB.html
 */

const THEMES_MAP: {[key: string]: () => { colorType: ColorType, divisionPoints: DivisionPoints, colors: Colors }} = {
  [Themes.GRAY_SCALE]: () => ({
    colorType: ColorType.RGB,
    divisionPoints: [0, 1],
    colors: [ [1,1,1], [0,0,0] ]
  }),
  [Themes.CYCLIC_GRAY_SCALE]: () => ({
    colorType: ColorType.RGB,
    divisionPoints: [0, 0.5, 1],
    colors: [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
  }),
  [Themes.RED_CYAN]: () => ({
    colorType: ColorType.RGB,
    divisionPoints: [0,0.5,1],
    colors: [[1,0,0],[0,1,1],[1,0,0]],
  }),
  [Themes.BLUE_GOLD]: () => ({
    colorType: ColorType.RGB,
    divisionPoints: [0,0.5,1],
    colors: [[0.1,0.1,1],[1,0.6,0],[0.3,0.3,1]],
  }),
  [Themes.EARTH_AND_SKY]: () => ({
    colorType: ColorType.RGB,
    divisionPoints: [0,0.15,0.33,0.67,0.85,1],
    colors: [[1,1,1],[1,0.8,0],[0.53,0.12,0.075],[0,0,0.6],[0,0.4,1],[1,1,1]],
  }),
  [Themes.HOT_AND_COLD]: () => ({
    colorType: ColorType.RGB,
    divisionPoints: [0,0.16,0.5,0.84,1],
    colors: [[1,1,1],[0,0.4,1],[0.2,0.2,0.2],[1,0,0.8],[1,1,1]],
  }),
  [Themes.FIRE]: () => ({
    colorType: ColorType.RGB,
    divisionPoints: [0,0.17,0.83,1],
    colors: [[0,0,0],[1,0,0],[1,1,0],[1,1,1]]
  }),
  [Themes.TREE_COLORS]: () => ({
    colorType: ColorType.HSB,
    divisionPoints: [0,0.33,0.66,1], 
    colors: [[0.1266,0.5955,0.2993], [0.0896,0.3566,0.6575], [0.6195,0.8215,0.4039], [0.1266,0.5955,0.2993]]
  }),
  [Themes.SEA_SHORE]: () => ({
    colorType: ColorType.RGB,
    divisionPoints: [0,0.1667,0.3333,0.5,0.6667,0.8333,1], 
    colors: [[0.7909,0.9961,0.7630], [0.8974,0.8953,0.6565], [0.9465,0.3161,0.1267], [0.5184,0.1109,0.0917], [0.0198,0.4563,0.6839], [0.5385,0.8259,0.8177], [0.7909,0.9961,0.7630]]
  })
}

function clamp(number: number) {
  const halfNumber = number / 2;
  const halfNumberDecimals = (halfNumber - Math.floor(halfNumber));
  const halfNumberDecimalsTwoTimes = 2 * halfNumberDecimals

  if (halfNumberDecimalsTwoTimes > 1) {
    return 2 - halfNumberDecimalsTwoTimes
  }
  return halfNumberDecimalsTwoTimes;
}

function delimitCircleInThirds(hue: number): number {
  const CIRCLE_ONE_THIRD_DEGREES = CIRCLE_ONE_SIXTH_DEGREES * 2
  const CIRCLE_TWO_THIRD_DEGREES = CIRCLE_ONE_SIXTH_DEGREES * 4

  if (hue < CIRCLE_ONE_THIRD_DEGREES)  {
    return hue / CIRCLE_ONE_SIXTH_DEGREES
  }
  if (hue < CIRCLE_TWO_THIRD_DEGREES) {
    return (hue - CIRCLE_ONE_THIRD_DEGREES) / CIRCLE_ONE_SIXTH_DEGREES
  }
  return (hue - CIRCLE_TWO_THIRD_DEGREES) / CIRCLE_ONE_SIXTH_DEGREES
}


function HSVToRGB(normalizedHue: number, normalizedSaturation: number, normalizedBrightness: number): RGBTuple {
  // all components in range 0 to 1
  let hue = normalizedHue * 360;
  let c = normalizedBrightness * normalizedSaturation;
  let x = delimitCircleInThirds(hue);
  x = foo(c, x);
  x += (normalizedBrightness-c);

  const region = Math.floor(hue / CIRCLE_ONE_SIXTH_DEGREES);

  switch (region) {
      case 0: {
        return [
          normalizedBrightness,
          x,
          normalizedBrightness-c
        ]
      };
      case 1: {
        return [
          x,
          normalizedBrightness,
          normalizedBrightness-c
        ]
      };
      case 2: {
        return [
          normalizedBrightness-c,
          normalizedBrightness,
          x
        ]
      };
      case 3: {
        return [
          normalizedBrightness-c,
          x,
          normalizedBrightness
        ]
      };
      case 4: {
        return [
          x, 
          normalizedBrightness-c,
          normalizedBrightness
        ]
      };
      case 5: {
        return [
          normalizedBrightness,
          normalizedBrightness-c,
          0
        ]
      };
  }
  return [0,0,0]
}

export class Palette {
  constructor(
    private colorType: ColorType,
    private divisionPoints: DivisionPoints,
    private divisionColors: Colors
  ) {}

  public getColor(position: number) {  // 0.0 <= position <= 1.0
    // this.divisionPoints = [0,0.5,1]
    // this.colors = [[0.1,0.1,1],[1,0.6,0],[0.3,0.3,1]]
    let pt = 1;
    while (position > this.divisionPoints[pt])
      pt++;
    const ratio = (position - this.divisionPoints[pt-1]) / (this.divisionPoints[pt] - this.divisionPoints[pt-1]);
    const c1 = this.divisionColors[pt-1];
    const c2 = this.divisionColors[pt];
    const a = c1[0] + ratio*(c2[0] - c1[0]);
    const b = c1[1] + ratio*(c2[1] - c1[1]);
    const c = c1[2] + ratio*(c2[2] - c1[2]);
    return this.toRGB(a,b,c);
  }

  private toRGB(a: number, b: number, c: number): RGBTuple {  // 3 non-clamped color components.
    a = (this.colorType === ColorType.HSB)? (a - Math.floor(a)) : clamp(a);
    b = clamp(b);
    c = clamp(c);
    let color: RGBTuple;
    if (this.colorType === ColorType.HSB)
      color = HSVToRGB(a, b, c);
    else
      color = [a,b,c];
    color[0] = Math.round(color[0]*255);
    color[1] = Math.round(color[1]*255);
    color[2] = Math.round(color[2]*255);
    return color;
  }

  static createStandardPalette(theme: Themes): Palette {
    const {colorType, divisionPoints, colors} = THEMES_MAP[theme]()
    return new Palette(colorType, divisionPoints, colors);
  }
}
function foo(c: number, x: number): number {
  return c * (1 - Math.abs(x - 1));
}

