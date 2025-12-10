use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Router {
    current_route: String,
}

#[wasm_bindgen]
impl Router {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Router {
        Router {
            current_route: String::from("/"),
        }
    }

    pub fn get_current_route(&self) -> String {
        self.current_route.clone()
    }

    pub fn navigate(&mut self, path: &str) -> String {
        self.current_route = path.to_string();
        self.current_route.clone()
    }
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("hello {}!", name)
}