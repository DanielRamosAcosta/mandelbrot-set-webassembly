type ColorType = string
type DivisionPoints = number[]
type Colors = Array<number[]>
type RGBTuple = [number, number, number]

export enum Themes {
  Grayscale = "Grayscale",
  CyclicGrayscale = "CyclicGrayscale",
  RedCyan = "Red/Cyan",
  BlueGold = "Blue/Gold",
  EarthAndSky = "EarthAndSky",
  HotAndCold = "HotAndCold",
  Fire = "Fire",
  TreeColors = "TreeColors",
  Seashore = "Seashore",
  Random = "Random",
}

/**
 * Palette made by David Eck
 * http://math.hws.edu/eck/js/mandelbrot/MB.html
 */
export class Palette {
  private colorType: ColorType
  private divisionPoints: DivisionPoints
  private divisionColors: Colors

  constructor(colorType?: ColorType, divisionPoints?: DivisionPoints, colors?: Colors) {
    this.colorType = colorType || "HSB";
    this.divisionPoints = divisionPoints || [0,1];
    this.divisionColors = colors || (this.colorType == "HSB" ? [ [0,1,1], [1,1,1] ] : [ [1,1,1], [0,0,0] ]);
  }

  getColor(position: number) {  // 0.0 <= position <= 1.0
    let pt = 1;
    while (position > this.divisionPoints[pt])
      pt++;
    const ratio = (position - this.divisionPoints[pt-1]) /
                    (this.divisionPoints[pt] - this.divisionPoints[pt-1]);
    const c1 = this.divisionColors[pt-1];
    const c2 = this.divisionColors[pt];
    const a = c1[0] + ratio*(c2[0] - c1[0]);
    const b = c1[1] + ratio*(c2[1] - c1[1]);
    const c = c1[2] + ratio*(c2[2] - c1[2]);
    return this.toRGB(a,b,c);
  }

  toRGB(a: number, b: number, c: number): RGBTuple {  // 3 non-clamped color components.
    a = (this.colorType == "HSB")? (a - Math.floor(a)) : clamp(a);
    b = clamp(b);
    c = clamp(c);
    let color: RGBTuple;
    if (this.colorType == "HSB")
      color = rgbFromHSV(a, b, c);
    else
      color = [a,b,c];
    color[0] = Math.round(color[0]*255);
    color[1] = Math.round(color[1]*255);
    color[2] = Math.round(color[2]*255);
    return color;
    function clamp(x: number) {
      x = 2*(x/2 - Math.floor(x/2));
      if (x > 1)
          x = 2 - x;
      return x;
    }
    function rgbFromHSV(h: number,s: number,v: number): RGBTuple {
      // all components in range 0 to 1
      h *= 360;
      let r = 0;
      let g = 0;
      let b = 0;
      let c;
      let x;
      c = v*s;
      x = (h < 120)? h/60 : (h < 240)? (h-120)/60 : (h-240)/60;
      x = c * (1-Math.abs(x-1));
      x += (v-c);
      switch (Math.floor(h/60)) {
          case 0: r = v; g = x; b = v-c; break;
          case 1: r = x; g = v; b = v-c; break;
          case 2: r = v-c; g = v; b = x; break;
          case 3: r = v-c; g = x; b = v; break;
          case 4: r = x; g = v-c; b = v; break;
          case 5: r = v; g = v-c; b = x; break;
      }
      return [r,g,b];
    }
  }

  static createStandardPalette(name: Themes) {
    let palette;
    switch (name) {
      case "Grayscale":
        palette = new Palette("RGB");
        break;
      case "CyclicGrayscale":
        palette = new Palette("RGB",[0,0.5,1],[[0,0,0],[1,1,1],[0,0,0]]);
        break;
      case "Red/Cyan":
        palette = new Palette("RGB",[0,0.5,1],[[1,0,0],[0,1,1],[1,0,0]]);
        break;
      case "Blue/Gold":
        palette = new Palette("RGB",[0,0.5,1],[[0.1,0.1,1],[1,0.6,0],[0.3,0.3,1]]);
        break;
      case "EarthAndSky":
        palette = new Palette("RGB",[0,0.15,0.33,0.67,0.85,1],
                  [[1,1,1],[1,0.8,0],[0.53,0.12,0.075],[0,0,0.6],[0,0.4,1],[1,1,1]]);
        break;
      case "HotAndCold":
        palette = new Palette("RGB",[0,0.16,0.5,0.84,1],
                  [[1,1,1],[0,0.4,1],[0.2,0.2,0.2],[1,0,0.8],[1,1,1]]);
        break;
      case "Fire":
        palette = new Palette("RGB",[0,0.17,0.83,1],
                  [[0,0,0],[1,0,0],[1,1,0],[1,1,1]]);
        break;
      case "TreeColors":
        palette = new Palette("HSB",[0,0.33,0.66,1],
                  [[0.1266,0.5955,0.2993],[0.0896,0.3566,0.6575],[0.6195,0.8215,0.4039],[0.1266,0.5955,0.2993]]);
        break;
      case "Seashore":
        palette = new Palette("RGB",[0,0.1667,0.3333,0.5,0.6667,0.8333,1],
                  [[0.7909,0.9961,0.7630],[0.8974,0.8953,0.6565],[0.9465,0.3161,0.1267],[0.5184,0.1109,0.0917],
                          [0.0198,0.4563,0.6839],[0.5385,0.8259,0.8177],[0.7909,0.9961,0.7630]]);
        break;
      case "Random":
        const c = [Math.random(),Math.random(),Math.random()];
        palette = new Palette("RGB",[],[]);
        palette.divisionPoints[0] = 0;
        palette.divisionColors[0] = c;
        for (let i = 1; i <= 5; i++) {
            palette.divisionPoints[i] = i/6;
            palette.divisionColors[i] = [Math.random(),Math.random(),Math.random()];
        }
        palette.divisionPoints[6] = 1;
        palette.divisionColors[6] = c;
        break;
      default: // "Spectrum"
        palette = new Palette();
    }
    return palette;
  }
}
