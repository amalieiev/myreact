// src/__tests__/example.js
// query utilities:
import {
    getByLabelText,
    getByText,
    getByTestId,
    queryByTestId,
    fireEvent,
    queries,
    waitFor,
    queryByText,
} from "@testing-library/dom";
// adds special assertions like toHaveTextContent
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import { App } from "./App";
import { render } from "./core";

test("testing App component", async () => {
    const container = document.createElement("div");

    render(App, {}, container);

    expect(getByText(container, /Type Text/)).toBeTruthy();

    const input = getByLabelText(container, /Type Text/);

    // userEvent.type(input, "Hello World");

    fireEvent.keyUp(input, { target: { value: "H" } });
    fireEvent.keyUp(input, { target: { value: "He" } });
    fireEvent.keyUp(input, { target: { value: "Hel" } });
    fireEvent.keyUp(input, { target: { value: "Hell" } });
    fireEvent.keyUp(input, { target: { value: "Hello" } });

    // setTimeout(() => {
    //     container.querySelector("p").innerHTML = "Hello World";
    // }, 100);

    expect(container).toMatchSnapshot();

    await waitFor(() => expect(queryByText(container, /Hello/)).toBeTruthy());
});
