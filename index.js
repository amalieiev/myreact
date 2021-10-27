import {
    createSubject,
    render,
    useRendered,
    useSubject,
} from "./core/React.js";

function Counter({ count }) {
    const value = useSubject(10);

    console.log("render Counter");

    useRendered((el) => {
        el.querySelector("#add").addEventListener("click", () => {
            value.next(value.value + 1);
        });

        el.querySelector("#remove").addEventListener("click", () => {
            value.next(value.value - 1);
        });

        const handler = (newValue) => {
            console.log(newValue);
            render(Counter, { count }, el);
        };

        value.subscribe(handler);

        return () => {
            console.log("unsubscribe");
            value.unsubscribe(handler);
        };
    });

    return `
        <h3>Counter</h3>
        <p>State: ${value.value}</p>
        <p>Props <strong>count</strong>: ${count}</p>
        <button id="add">+</button>
        <button id="remove">-</button>
    `;
}

let count = 0;

document.getElementById("increment").addEventListener("click", () => {
    count++;
    render(Counter, { count }, document.getElementById("root"));
    render(Counter, { count }, document.getElementById("root-2"));
});

render(Counter, { count }, document.getElementById("root"));
render(Counter, { count }, document.getElementById("root-2"));
