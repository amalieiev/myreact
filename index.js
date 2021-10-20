import { render } from "./react.js";

import App from "./components/App.js";

let count = 0;
function renderComponent() {
    render(App, { count }, document.getElementById("root"));
}

renderComponent();

document.getElementById("increment").addEventListener("click", () => {
    count++;
    renderComponent();
});
