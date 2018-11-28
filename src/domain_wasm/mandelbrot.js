/* tslint:disable */
import * as wasm from './mandelbrot_bg';

function freeMandelbrotSet(ptr) {

    wasm.__wbg_mandelbrotset_free(ptr);
}
/**
*/
export class MandelbrotSet {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeMandelbrotSet(ptr);
    }

    /**
    * @param {number} arg0
    * @param {number} arg1
    * @returns {}
    */
    constructor(arg0, arg1) {
        this.ptr = wasm.mandelbrotset_new(arg0, arg1);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @param {number} arg2
    * @param {number} arg3
    * @returns {void}
    */
    zoom_canvas(arg0, arg1, arg2, arg3) {
        return wasm.mandelbrotset_zoom_canvas(this.ptr, arg0, arg1, arg2, arg3);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @returns {number}
    */
    get_color_r(arg0, arg1) {
        return wasm.mandelbrotset_get_color_r(this.ptr, arg0, arg1);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @returns {number}
    */
    get_color_g(arg0, arg1) {
        return wasm.mandelbrotset_get_color_g(this.ptr, arg0, arg1);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @returns {number}
    */
    get_color_b(arg0, arg1) {
        return wasm.mandelbrotset_get_color_b(this.ptr, arg0, arg1);
    }
    /**
    * @returns {number}
    */
    render() {
        return wasm.mandelbrotset_render(this.ptr);
    }
}

function freeColor(ptr) {

    wasm.__wbg_color_free(ptr);
}
/**
*/
export class Color {

    static __wrap(ptr) {
        const obj = Object.create(Color.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeColor(ptr);
    }

    /**
    * @param {number} arg0
    * @param {number} arg1
    * @param {number} arg2
    * @returns {Color}
    */
    static new(arg0, arg1, arg2) {
        return Color.__wrap(wasm.color_new(arg0, arg1, arg2));
    }
    /**
    * @returns {number}
    */
    get_r() {
        return wasm.color_get_r(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_g() {
        return wasm.color_get_g(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_b() {
        return wasm.color_get_b(this.ptr);
    }
}

function freeRenderDataStorage(ptr) {

    wasm.__wbg_renderdatastorage_free(ptr);
}
/**
*/
export class RenderDataStorage {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeRenderDataStorage(ptr);
    }

    /**
    * @param {number} arg0
    * @param {number} arg1
    * @returns {}
    */
    constructor(arg0, arg1) {
        this.ptr = wasm.renderdatastorage_new(arg0, arg1);
    }
    /**
    * @returns {number}
    */
    get_width() {
        return wasm.renderdatastorage_get_width(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_height() {
        return wasm.renderdatastorage_get_height(this.ptr);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @returns {number}
    */
    get_color_r(arg0, arg1) {
        return wasm.renderdatastorage_get_color_r(this.ptr, arg0, arg1);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @returns {number}
    */
    get_color_g(arg0, arg1) {
        return wasm.renderdatastorage_get_color_g(this.ptr, arg0, arg1);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @returns {number}
    */
    get_color_b(arg0, arg1) {
        return wasm.renderdatastorage_get_color_b(this.ptr, arg0, arg1);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @param {number} arg2
    * @param {number} arg3
    * @param {number} arg4
    * @returns {void}
    */
    set_color(arg0, arg1, arg2, arg3, arg4) {
        return wasm.renderdatastorage_set_color(this.ptr, arg0, arg1, arg2, arg3, arg4);
    }
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

