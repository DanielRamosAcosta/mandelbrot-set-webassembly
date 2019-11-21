mod color;

use self::color::Color;

type DivisionPoints = Vec<f64>;
type DivisionColors = Vec<Color>;

pub enum Theme {
  GrayScale,
  CyclicGrayScale,
  RedCyan,
  BlueGold,
  EarthAndSky,
  HotAndCold,
  Fire,
  TreeColors,
  SeaShore,
}

pub struct Palette {
  division_points: DivisionPoints,
  division_colors: DivisionColors,
}

impl Palette {
  pub fn new(division_points: DivisionPoints, division_colors: DivisionColors) -> Palette {
    Palette {
      division_points,
      division_colors,
    }
  }

  pub fn get_nearest_division_point(&self, position: f64) -> usize {
    let mut nearest_division_point = 1;
    while position > self.division_points[nearest_division_point] {
      nearest_division_point = nearest_division_point + 1;
    }
    return nearest_division_point;
  }

  /**
   * Resturns the Color that corresponds to the given Position
   * @param position Value between 0 and 1
   */
  pub fn get_color(&self, position: f64) -> Color {
    let nearest_division_index = self.get_nearest_division_point(position);
    let left_point = self.division_points[nearest_division_index - 1];
    let right_point = self.division_points[nearest_division_index];

    let ratio = (position - left_point) / (right_point - left_point);

    return Color::color_between(
      &self.division_colors[nearest_division_index - 1],
      &self.division_colors[nearest_division_index],
      ratio,
    );
  }

  pub fn create_standard_palette(theme: Theme) -> Palette {
    match theme {
      Theme::GrayScale => Palette::new(
        vec![0.0, 0.1],
        vec![
          Color::new(1.0, 1.0, 1.0),
          Color::new(0.0, 0.0, 0.0),
        ],
      ),
      Theme::CyclicGrayScale => Palette::new(
        vec![0.0, 0.1],
        vec![
          Color::new(1.0, 1.0, 1.0),
          Color::new(0.0, 0.0, 0.0),
        ],
      ),
      Theme::RedCyan => Palette::new(
        vec![0.0, 0.1],
        vec![
          Color::new(1.0, 1.0, 1.0),
          Color::new(0.0, 0.0, 0.0),
        ],
      ),
      Theme::BlueGold => Palette::new(
        vec![0.0, 0.1],
        vec![
          Color::new(1.0, 1.0, 1.0),
          Color::new(0.0, 0.0, 0.0),
        ],
      ),
      Theme::EarthAndSky => Palette::new(
        vec![0.0, 0.15, 0.33, 0.67, 0.85, 1.0],
        vec![
          Color::new(1.0, 1.0, 1.0),
          Color::new(1.0, 0.8, 0.0),
          Color::new(0.53, 0.12, 0.075),
          Color::new(0.0, 0.0, 0.6),
          Color::new(0.0, 0.4, 1.0),
          Color::new(1.0, 1.0, 1.0),
        ],
      ),
      Theme::HotAndCold => Palette::new(
        vec![0.0, 0.1],
        vec![
          Color::new(1.0, 1.0, 1.0),
          Color::new(0.0, 0.0, 0.0),
        ],
      ),
      Theme::Fire => Palette::new(
        vec![0.0, 0.17, 0.83, 1.0],
        vec![
          Color::new(0.0, 0.0, 0.0),
          Color::new(1.0, 0.0, 0.0),
          Color::new(1.0, 1.0, 0.0),
          Color::new(1.0, 1.0, 1.0),
        ],
      ),
      Theme::TreeColors => Palette::new(
        vec![0.0, 0.1],
        vec![
          Color::new(1.0, 1.0, 1.0),
          Color::new(0.0, 0.0, 0.0),
        ],
      ),
      Theme::SeaShore => Palette::new(
        vec![0.0, 0.1],
        vec![
          Color::new(1.0, 1.0, 1.0),
          Color::new(0.0, 0.0, 0.0),
        ],
      ),
    }
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn it_works() {
    let palette = Palette::create_standard_palette(Theme::EarthAndSky);
    let color = palette.get_color(0.1);

    assert_eq!(color.get_r(), 255);
    assert_eq!(color.get_g(), 221);
    assert_eq!(color.get_b(), 85);
  }

  #[test]
  fn it_works_two() {
    let palette = Palette::create_standard_palette(Theme::EarthAndSky);
    let color = palette.get_color(0.2);

    assert_eq!(color.get_r(), 222);
    assert_eq!(color.get_g(), 156);
    assert_eq!(color.get_b(), 5);
  }
}