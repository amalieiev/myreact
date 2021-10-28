import {
    createSubject,
    render,
    useParent,
    useRendered,
    useSubject,
} from "./core/React.js";

function Counter({ count }) {
    const value = useSubject(10);
    const inputvalue = useSubject("");

    console.log("render Counter");

    useRendered((el) => {
        render(InputForm, { inputvalue }, el.querySelector(".input"));

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
        <div class="input"></div>
    `;
}

function InputForm({ inputvalue }) {
    const el = useParent();

    const onChange = (event) => {
        inputvalue.next(event.target.value);
        el.querySelector("p").innerHTML = inputvalue.value;
    };

    useRendered((el) => {
        el.querySelector("input").addEventListener("keyup", onChange);

        return () => {
            el.querySelector("input").removeEventListener("keyup", onChange);
        };
    });

    return `
        <input type="text" value="${inputvalue.value}">
        <p>${inputvalue.value}</p>
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
