use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct RenderDataStorage {
    width: usize,
    height: usize,
    data: Vec<Vec<Vec<u8>>>,
}

#[wasm_bindgen]
impl RenderDataStorage {
    #[wasm_bindgen(constructor)]
    pub fn new (width: usize, height: usize) -> RenderDataStorage{
        RenderDataStorage {
            width,
            height,
            data: vec![vec![vec![0; 3]; width]; height],
        }
    }

    pub fn get_width (&self) -> usize {
        self.width
    }

    pub fn get_height (&self) -> usize {
        self.height
    }

    pub fn get_color_r (&self, x: usize, y: usize) -> u8 {
        self.data[y][x][0]
    }

    pub fn get_color_g (&self, x: usize, y: usize) -> u8 {
        self.data[y][x][1]
    }

    pub fn get_color_b (&self, x: usize, y: usize) -> u8 {
        self.data[y][x][2]
    }

    pub fn set_color (&mut self, x: usize, y: usize, r: u8, g: u8, b: u8) {
        self.data[y][x][0] = r;
        self.data[y][x][1] = g;
        self.data[y][x][2] = b;
    }
}