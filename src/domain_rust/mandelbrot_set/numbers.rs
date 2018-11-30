#[derive(Clone, Debug)]
pub struct Complex {
    a: f64,
    b: f64,
}

impl Complex {
    pub fn new(a: f64, b: f64) -> Complex {
        Complex {
            a,
            b,
        }
    }

    pub fn square(&self) -> Complex {
        let a = (self.a * self.a) - (self.b * self.b);
        let b = 2.0 * self.a * self.b;
        return Complex::new(a, b);
    }

    pub fn add(&self, other: Complex) -> Complex {
        Complex::new(self.a + other.a, self.b + other.b)
    }

    pub fn has_escaped(&self) -> bool {
        return (self.a + self.b).abs() > 16.0;
    }

    pub fn get_a (&self) -> f64 {
        self.a
    }

    pub fn get_b (&self) -> f64 {
        self.b
    }
}
