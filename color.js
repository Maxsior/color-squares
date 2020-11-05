class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  getHex() {
    return '#' + ((this.r << 16) + (this.g << 8) + this.b).toString(16).padStart(6, '0');
  }

  getRGB() {
    return [this.r, this.g, this.b];
  }

  _clamp(component, delta) {
    const c1 = component + delta;
    const c2 = component - delta;

    return c1 > 255 ? c2
         : c2 < 0 ? c1
         : [c1, c2][Math.round(Math.random())];
  }

  deviate(delta) {
    const drMax = Math.min(delta, Math.max(this.r, 255 - this.r));
    const dr = Math.round(Math.random() * drMax);
    const dgMax = Math.min(delta - dr, Math.max(this.g, 255 - this.g));
    const dg = Math.round(Math.random() * dgMax);
    const db = delta - dr - dg;

    const r = this._clamp(this.r, dr);
    const g = this._clamp(this.g, dg);
    const b = this._clamp(this.b, db);

    return new Color(r, g, b);
  }

  deviate2(delta) {
    // see https://en.wikipedia.org/wiki/Color_difference

    console.log('---')
    const delta2 = delta * delta;

    const aRmin = this.r / 2;
    const aRmax = (this.r + 255) / 2;
    const aR = Math.round(Math.random() * (aRmax - aRmin) + aRmin);
    console.log('aR =', aR);

    const r = Math.abs(aR * 2 - this.r);
    console.log('r =', r, this.r);

    const kR = 2 + aR / 256;
    const kG = 4;
    const kB = 2 + (255 - aR) / 256;

    const dR2 = Math.round(Math.random() * delta2 / kR);

    const dG2 = Math.random() * (delta2 - kR * dR2) / kG;
    const g = Math.abs(Math.round(this.g - Math.sqrt(dG2)));
    console.log('g =', g, this.g);

    const dB2 = (delta2 - kR * dR2 - kG * dG2) / kB;
    const b = Math.abs(Math.round(this.b - Math.sqrt(dB2)));
    console.log('b =', b, this.b);
    console.log(
      Math.abs(this.r - r) + Math.abs(this.g - g) + Math.abs(this.b - b),
      Math.sqrt(kR * dR2 + kG * dG2 + kB * dB2)
    )
    return new Color(r, g, b);
  }

  static random() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);

    return new Color(r, g, b);
  }
}

export default Color;
