import { fireEvent, getByText } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { createSubject } from "../core";
import { TodoItem } from "./TodoItem";

describe("TodoItem component", () => {
    it("should render App", async () => {
        const container = document.createElement("div");
        const title = createSubject("Купить Хлеб");

        new TodoItem({ title }, container).render();

        fireEvent.click(getByText(container, "Удалить"));

        expect(getByText(container, /clicked/)).toBeTruthy();

        title.next("Купить Молоко");

        expect(getByText(container, /Купить Молоко/)).toBeTruthy();
    });

    it("should render App native", async () => {
        const container = document.createElement("div");
        const title = createSubject("Купить Хлеб");

        new TodoItem({ title }, container).render();

        container.querySelector("button").click();

        expect(container).toHaveTextContent(/clicked/);

        title.next("Купить Молоко");

        expect(container).toHaveTextContent("Купить Молоко");

        console.log(container.innerHTML);
    });
});
