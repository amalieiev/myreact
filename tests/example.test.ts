// src/__tests__/example.js
// query utilities:
import {
    getByLabelText,
    getByText,
    getByTestId,
    queryByTestId,
    queries,
    waitFor,
    queryByText,
} from "@testing-library/dom";
// adds special assertions like toHaveTextContent
import "@testing-library/jest-dom";

test("examples of some things", async () => {
    const container = document.createElement("div");
    container.innerHTML = "<span>Print Username</span>";

    setTimeout(() => {
        container.innerHTML = "<button>Success</button>";
    }, 400);

    expect(container).toMatchSnapshot();

    expect(getByText(container, /Print Username/)).toBeTruthy();

    await waitFor(() => expect(queryByText(container, /Success/)).toBeTruthy());

    expect(container).toMatchSnapshot();
});
