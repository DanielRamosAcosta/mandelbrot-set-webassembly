pub struct Color {
    r: f64,
    g: f64,
    b: f64,
}

impl Color {
    pub fn new(r: f64, g: f64, b: f64) -> Color {
        Color {
            r,
            g,
            b,
        }
    }

    pub fn color_between (c1: &Color, c2: &Color, ratio: f64) -> Color {
        let a = c1.r + ratio * (c2.r - c1.r);
        let b = c1.g + ratio * (c2.g - c1.g);
        let c = c1.b + ratio * (c2.b - c1.b);

        return Color::new(a, b, c);
    }


    pub fn get_r(&self) -> u8 {
        (self.r * 255.0).round() as u8
    }

    pub fn get_g(&self) -> u8 {
        (self.g * 255.0).round() as u8
    }

    pub fn get_b(&self) -> u8 {
        (self.b * 255.0).round() as u8
    }

    pub fn get_alpha(&self) -> u8 {
        255
    }
}
