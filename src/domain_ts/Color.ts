type RGBTuple = [number, number, number]

export enum ColorSpace {
  HSB,
  RGB
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

  public intoRGBTuple (): RGBTuple {
    return [
      this.getR(),
      this.getG(),
      this.getB()
    ]
  }
}
