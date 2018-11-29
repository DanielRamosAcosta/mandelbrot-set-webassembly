use wasm_bindgen::prelude::*;

mod numbers;
mod color;
mod render_data_storage;

use self::numbers::Complex;
use self::color::Color;
use self::render_data_storage::RenderDataStorage;

fn scale(value: f64, left_min: f64, left_max: f64, right_min: f64, right_max: f64) -> f64 {
  let left_span = left_max - left_min;
  let right_span = right_max - right_min;
  let value_scaled = (value - left_min) / left_span;
  return right_min + (value_scaled * right_span);
}

fn iterations_to_color(n: u8, max_iterations: u8) -> Color {
  if n == max_iterations {
    return Color::new(0, 0, 0);
  }

  let brightness = scale(n.into(), 0.0, max_iterations.into(), 0.0, 255.0);
  
  return Color::new(brightness as u8, brightness as u8, brightness as u8);
}

#[wasm_bindgen]
pub struct MandelbrotSet {
  min_corner: Complex,
  max_corner: Complex,
  width: f64,
  height: f64,
  data_storage: RenderDataStorage,
}

#[wasm_bindgen]
impl MandelbrotSet {
    #[wasm_bindgen(constructor)]
    pub fn new(width: f64, height: f64) -> MandelbrotSet {
        let ratio = height / width;
        let initial_width = 3.0;

        return MandelbrotSet {
            width,
            height,
            data_storage: RenderDataStorage::new(width as usize, height as usize),
            max_corner: Complex::new(initial_width, initial_width * ratio),
            min_corner: Complex::new(-initial_width, -initial_width * ratio)
        };
    }

    pub fn min_corner_a (&self) -> String { return self.min_corner.get_a().to_string() }
    pub fn min_corner_b (&self) -> String { return self.min_corner.get_b().to_string() }
    pub fn max_corner_a (&self) -> String { return self.max_corner.get_a().to_string() }
    pub fn max_corner_b (&self) -> String { return self.max_corner.get_b().to_string() }


    pub fn zoom_canvas (&mut self, start_x_px: u16, end_x_px: u16, start_y_px: u16, end_y_px: u16) {
        let min_corner_a = scale(start_x_px.into(), 0.0, self.width.into(),  self.min_corner.get_a(), self.max_corner.get_a());
        let max_corner_a = scale(end_x_px.into(), 0.0, self.width.into(),  self.min_corner.get_a(), self.max_corner.get_a());
        let min_corner_b = scale(start_y_px.into(), 0.0, self.height.into(), self.min_corner.get_b(), self.max_corner.get_b());
        let max_corner_b = scale(end_y_px.into(), 0.0, self.height.into(), self.min_corner.get_b(), self.max_corner.get_b());
    
        self.min_corner = Complex::new(min_corner_a, min_corner_b);
        self.max_corner = Complex::new(max_corner_a, max_corner_b);
    }

    fn iterations_until_it_escapes(&self, c: Complex, max_iterations: u8) -> u8 {
        let mut z = Complex::new(0.0, 0.0);
        
        for n in 0..max_iterations {
            z = z.square().add(c.clone());
            if z.has_escaped() {
                return n;
            }
        }
    
        return max_iterations;
    }

    pub fn get_color_r (&self, x: usize, y: usize) -> u8 {
        self.data_storage.get_color_b(x, y)
    }

    pub fn get_color_g (&self, x: usize, y: usize) -> u8 {
        self.data_storage.get_color_g(x, y)
    }

    pub fn get_color_b (&self, x: usize, y: usize) -> u8 {
        self.data_storage.get_color_b(x, y)
    }
        

    pub fn render(&mut self) -> u8 {
        let min_corner = &self.min_corner;
        let max_corner = &self.max_corner;
        let max_iterations = 100;
        // log("Hello world 1!");
        for y in 0..self.data_storage.get_height() {
            for x in 0..self.data_storage.get_width() {
                // console_log!("Hello world [{} {}]!", x, y);

                let c = Complex::new(
                    scale(x as f64, 0.0, self.data_storage.get_width() as f64, min_corner.get_a(), max_corner.get_a()),
                    scale(y as f64, 0.0, self.data_storage.get_height() as f64, min_corner.get_b(), max_corner.get_b())
                );
        
                let n = self.iterations_until_it_escapes(c, max_iterations);
                let color = iterations_to_color(n, max_iterations);
                self.data_storage.set_color(x, y, color.get_r(), color.get_g(), color.get_b());
                // console_log!("R: {}", self.data_storage.get_color_r(x, y));
                // console_log!("G: {}", self.data_storage.get_color_g(x, y));
                // console_log!("B: {}", self.data_storage.get_color_b(x, y));
            }
        }
        // log("Hello world!");
        return 32;
    }
}
