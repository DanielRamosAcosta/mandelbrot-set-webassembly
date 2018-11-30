/* tslint:disable */
import * as wasm from './mandelbrot_bg';

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

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

const stack = [];

function addBorrowedObject(obj) {
    stack.push(obj);
    return ((stack.length - 1) << 1) | 1;
}

const __widl_f_put_image_data_CanvasRenderingContext2D_target = typeof CanvasRenderingContext2D === 'undefined' ? null : CanvasRenderingContext2D.prototype.putImageData || function() {
    throw new Error(`wasm-bindgen: CanvasRenderingContext2D.putImageData does not exist`);
};

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

let slab_next = slab.length;

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];

        return val.obj;

    }
}

export function __widl_f_put_image_data_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, exnptr) {
    try {
        __widl_f_put_image_data_CanvasRenderingContext2D_target.call(getObject(arg0), getObject(arg1), arg2, arg3);
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

let cachegetUint8ClampedMemory = null;
function getUint8ClampedMemory() {
    if (cachegetUint8ClampedMemory === null || cachegetUint8ClampedMemory.buffer !== wasm.memory.buffer) {
        cachegetUint8ClampedMemory = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachegetUint8ClampedMemory;
}

function getClampedArrayU8FromWasm(ptr, len) {
    return getUint8ClampedMemory().subarray(ptr / 1, ptr / 1 + len);
}

export function __widl_f_new_with_u8_clamped_array_and_sh_ImageData(arg0, arg1, arg2, arg3, exnptr) {
    let varg0 = getClampedArrayU8FromWasm(arg0, arg1);
    try {
        return addHeapObject(new ImageData(varg0, arg2, arg3));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

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
    * @returns {string}
    */
    min_corner_a() {
        const retptr = globalArgumentPtr();
        wasm.mandelbrotset_min_corner_a(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
    /**
    * @returns {string}
    */
    min_corner_b() {
        const retptr = globalArgumentPtr();
        wasm.mandelbrotset_min_corner_b(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
    /**
    * @returns {string}
    */
    max_corner_a() {
        const retptr = globalArgumentPtr();
        wasm.mandelbrotset_max_corner_a(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
    /**
    * @returns {string}
    */
    max_corner_b() {
        const retptr = globalArgumentPtr();
        wasm.mandelbrotset_max_corner_b(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

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
    * @param {any} arg0
    * @returns {void}
    */
    render(arg0) {
        try {
            return wasm.mandelbrotset_render(this.ptr, addBorrowedObject(arg0));

        } finally {
            stack.pop();

        }

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
    /**
    * @returns {number}
    */
    get_alpha() {
        return wasm.color_get_alpha(this.ptr);
    }
}

function dropRef(idx) {

    idx = idx >> 1;
    if (idx < 4) return;
    let obj = slab[idx];

    obj.cnt -= 1;
    if (obj.cnt > 0) return;

    // If we hit 0 then free up our space in the slab
    slab[idx] = slab_next;
    slab_next = idx;
}

export function __wbindgen_object_drop_ref(i) {
    dropRef(i);
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropRef(idx);
    return ret;
}

export function __wbindgen_rethrow(idx) { throw takeObject(idx); }

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

