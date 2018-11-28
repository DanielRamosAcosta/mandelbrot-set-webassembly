use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Color {
    r: u8,
    g: u8,
    b: u8,
}

#[wasm_bindgen]
impl Color {
    pub fn new(r: u8, g: u8, b: u8) -> Color {
        Color {
            r,
            g,
            b,
        }
    }

    pub fn get_r(&self) -> u8 {
        self.r
    }
    pub fn get_g(&self) -> u8 {
        self.g
    }
    pub fn get_b(&self) -> u8 {
        self.b
    }
}
