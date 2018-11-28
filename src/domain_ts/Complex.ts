export class Complex {
  private a: number
  private b: number

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  square() {
    const a = (this.a ** 2) - (this.b ** 2);
    const b = 2 * this.a * this.b;
    return new Complex(a, b);
  }

  add(other: Complex) {
    return new Complex(this.a + other.a, this.b + other.b);
  }

  hasEscaped() {
    return Math.abs(this.a + this.b) > 16;
  }

  /**
   * Returns the real part
   */
  getA () {
    return this.a
  }

  /**
   * Returns the complex part
   */
  getB () {
    return this.b
  }
}
