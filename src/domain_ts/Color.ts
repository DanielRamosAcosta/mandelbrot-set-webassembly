type RGBTuple = [number, number, number]

export enum ColorSpace {
  HSB,
  RGB
}

type Conversion = (
  v: number,
  p: number,
  q: number,
  t: number,
) => Color

type ConversionTable = {
  [key: number]: Conversion
}

const ConversionTableHSB: ConversionTable = {
  [0]: (v, p, q, t) => new Color(v, t, p),
  [1]: (v, p, q, t) => new Color(q, v, p),
  [2]: (v, p, q, t) => new Color(p, v, t),
  [3]: (v, p, q, t) => new Color(p, q, v),
  [4]: (v, p, q, t) => new Color(t, p, v),
  [5]: (v, p, q, t) => new Color(v, p, q),
  [6]: (v, p, q, t) => new Color(0, 0, 0),
}

export class Color {
  constructor (private red: number, private green: number, private blue: number) {
  }

  getR() { return Math.round(this.red * 255) }
  getG() { return Math.round(this.green * 255) }
  getB() { return Math.round(this.blue * 255) }

  static colorBetween (c1: Color, c2: Color, ratio: number): Color {
    const a = c1.red + ratio * (c2.red - c1.red);
    const b = c1.green + ratio * (c2.green - c1.green);
    const c = c1.blue + ratio * (c2.blue - c1.blue);

    return new Color(a, b, c);
  }

  static fromRGB (red: number, green: number, blue: number) {
    return new Color(
      red / 255,
      green / 255,
      blue / 255,
    );
  }

  static fromHSB (normalizedHue: number, normalizedSaturation: number, normalizedValue: number): Color {
    const region = Math.floor(normalizedHue * 6);
    const regionDecimal = (normalizedHue * 6) - region;
    const p = normalizedValue * (1 - normalizedSaturation);
    const q = normalizedValue * (1 - regionDecimal * normalizedSaturation);
    const t = normalizedValue * (1 - (1 - regionDecimal) * normalizedSaturation);
    
    return ConversionTableHSB[region](normalizedValue, p, q, t)
  }

  public intoRGBTuple (): RGBTuple {
    return [
      this.getR(),
      this.getG(),
      this.getB()
    ]
  }
}
