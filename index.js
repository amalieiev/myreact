import { useState, render, useEffect } from "./core/React.js";

function Counter({ count }) {
    const [value, setValue] = useState(1);
    const [name, setName] = useState("Artem");

    useEffect(() => {
        document.getElementById("add").addEventListener("click", () => {
            setValue(value + 1);
        });
    }, []);

    return `
        <h3>Counter</h3>
        <p>State: ${value}</p>
        <p>Name: ${name}</p>
        <p>Props <strong>count</strong>: ${count}</p>
        <button id="add">+</button>
        <button id="remove">-</button>
    `;
}

let count = 0;

document.getElementById("increment").addEventListener("click", () => {
    count++;
    render(Counter, { count }, document.getElementById("root"));
});

render(Counter, { count }, document.getElementById("root"));
