all:
	cargo +nightly build --target wasm32-unknown-unknown --release
	wasm-bindgen target/wasm32-unknown-unknown/release/mandelbrot.wasm --out-dir ./src/domain_wasm/

test:
	cargo +nightly test