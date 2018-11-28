all:
	cargo +nightly build --target wasm32-unknown-unknown
	wasm-bindgen target/wasm32-unknown-unknown/debug/mandelbrot.wasm --out-dir ./src/domain_wasm/