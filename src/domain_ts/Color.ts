export class Color {
  private r: number
  private g: number
  private b: number

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static fromRGB(r: number, g: number, b: number) {
    return new Color(r, g, b);
  }

  static fromHSL(h: number, s: number, l: number) {
    const [ r, g, b ] = hslToRgb(h, s, l)
    return new Color(r, g, b)
  }

  getR() { return this.r; }
  getG() { return this.g; }
  getB() { return this.b; }
}

// External
function hslToRgb(h: number, s: number, l: number) {
  let r;
  let g;
  let b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
