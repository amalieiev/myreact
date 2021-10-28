import { FC, HTMLElementEvent, render, useParent, useRendered, useSubject } from "./core";

export const App: FC = () => {
    const el = useParent();
    const title = useSubject("");

    useRendered(() => {
        el.querySelector("input").addEventListener("keyup", (event: HTMLElementEvent<HTMLInputElement>) => {
            title.next(event.target.value);
            el.querySelector("p").innerHTML = `<p>${title.value}</p>`;
        });
    });

    return `
        <label for="username">
            <input type="text" value="${title.value}" />
            Type Text
        </label>
        <p data-testid="output">${title.value}</p>
    `;
};

render(App, {}, document.getElementById("root"));
