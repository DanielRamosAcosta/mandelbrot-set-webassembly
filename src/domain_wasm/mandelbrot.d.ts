/* tslint:disable */
export class MandelbrotSet {
free(): void;

 constructor(arg0: number, arg1: number);

 zoom_canvas(arg0: number, arg1: number, arg2: number, arg3: number): void;

 get_color_r(arg0: number, arg1: number): number;

 get_color_g(arg0: number, arg1: number): number;

 get_color_b(arg0: number, arg1: number): number;

 render(): number;

}
export class Color {
free(): void;

static  new(arg0: number, arg1: number, arg2: number): Color;

 get_r(): number;

 get_g(): number;

 get_b(): number;

}
export class RenderDataStorage {
free(): void;

 constructor(arg0: number, arg1: number);

 get_width(): number;

 get_height(): number;

 get_color_r(arg0: number, arg1: number): number;

 get_color_g(arg0: number, arg1: number): number;

 get_color_b(arg0: number, arg1: number): number;

 set_color(arg0: number, arg1: number, arg2: number, arg3: number, arg4: number): void;

}
