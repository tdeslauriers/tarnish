import init, { Router } from "../wasm/pkg/tarnish.js";

let router;

// Define your page components
const pages = {
  "/": {
    title: "Home",
    render: () => `
      <h1>Welcome to des Lauriers World</h1>
      <p>This is the home page.</p>
      <nav>
        <a href="#/about" class="nav-link">Go to About</a>
      </nav>
    `,
  },
  "/about": {
    title: "About",
    render: () => `
      <h1>About des Lauriers World</h1>
      <p>This is the about page. Learn more about this project here.</p>
      <nav>
        <a href="#/" class="nav-link">Go to Home</a>
      </nav>
    `,
  },
};

// Get route from URL hash
function getRouteFromHash() {
  const hash = window.location.hash;
  if (!hash || hash === "#") {
    return "/";
  }
  return hash.substring(1); // Remove the '#'
}

// Render the current route
function renderRoute() {
  console.log("renderRoute called");
  const currentRoute = getRouteFromHash();
  console.log("Current route:", currentRoute);

  // Update router state
  router.navigate(currentRoute);

  const page = pages[currentRoute] || pages["/"];

  // Update page title
  document.title = `${page.title} - des Lauriers World`;

  // Update content
  const appElement = document.getElementById("app");
  if (appElement) {
    appElement.innerHTML = page.render();
    console.log("Content rendered");
  } else {
    console.error("App element not found!");
  }
}

// Initialize the app
async function run() {
  try {
    console.log("Initializing WASM...");
    await init();
    console.log("WASM initialized");

    router = new Router();
    console.log("Router created");

    // Render initial route
    renderRoute();

    // Listen for hash changes
    window.addEventListener("hashchange", renderRoute);
    console.log("Hash change listener added");
  } catch (error) {
    console.error("Error initializing app:", error);
    document.getElementById("app").innerHTML = `
      <h1>Error Loading App</h1>
      <p>There was an error initializing the application. Check the console for details.</p>
      <pre>${error.message}</pre>
    `;
  }
}

run();
