import init, { greet } from "../wasm/pkg/tarnish.js";

async function run() {
  await init();
  const result = greet("world");
  document.getElementById("output").textContent = result;
}

run();
