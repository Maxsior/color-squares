class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;

    return this;
  }

  getHex() {
    return '#' + ((this.r << 16) + (this.g << 8) + this.b).toString(16).padStart(6, '0');
  }

  getRGB() {
    return [this.r, this.g, this.b];
  }

  static random() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);

    return new Color(r, g, b);
  }
}

export default Color;
