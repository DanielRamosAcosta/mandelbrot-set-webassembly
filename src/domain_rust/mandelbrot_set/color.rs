use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Color {
    r: f64,
    g: f64,
    b: f64,
}

#[wasm_bindgen]
impl Color {
    pub fn new(r: f64, g: f64, b: f64) -> Color {
        Color {
            r,
            g,
            b,
        }
    }

    pub fn get_r(&self) -> u8 {
        (self.r * 255.0) as u8
    }
    pub fn get_g(&self) -> u8 {
        (self.g * 255.0) as u8
    }
    pub fn get_b(&self) -> u8 {
        (self.b * 255.0) as u8
    }
    pub fn get_alpha(&self) -> u8 {
        255
    }
}
