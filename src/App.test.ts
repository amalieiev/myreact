import { fireEvent, queries } from "@testing-library/dom";
import "@testing-library/jest-dom";

import { App } from "./App";
import { render } from "./core";

function typeToInput(input, text) {
    text.split("").reduce((memo, value, index) => {
        memo += value;
        fireEvent.keyUp(input, { target: { value: memo } });
        return memo;
    }, "");

    fireEvent.change(input, { target: { value: text } });
}

describe("App component", () => {
    it("should render App", async () => {
        const container = document.createElement("div");

        render(App, {}, container);

        expect(queries.getByText(container, /Type Text/)).toBeTruthy();

        const input = queries.getByLabelText(container, /Type Text/);

        typeToInput(input, "Hello typeToInput utility");

        expect(await queries.findByText(container, /Hello/)).toBeTruthy();
    });
});
