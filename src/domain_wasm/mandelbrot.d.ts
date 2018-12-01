/* tslint:disable */
export class MandelbrotSet {
free(): void;

 constructor(arg0: number, arg1: number);

 min_corner_a(): string;

 min_corner_b(): string;

 max_corner_a(): string;

 max_corner_b(): string;

 zoom_canvas(arg0: number, arg1: number, arg2: number, arg3: number): void;

 render(arg0: any): void;

}
export class Color {
free(): void;

static  new(arg0: number, arg1: number, arg2: number): Color;

static  color_between(arg0: Color, arg1: Color, arg2: number): Color;

 get_r(): number;

 get_g(): number;

 get_b(): number;

 get_alpha(): number;

}
