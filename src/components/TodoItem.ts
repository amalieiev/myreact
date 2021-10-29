import { Subject } from "../core";

export type TodoItemProps = {
    title: Subject<string>;
};
export class TodoItem {
    public props: TodoItemProps;
    public el: HTMLElement;

    constructor(props: TodoItemProps, el: HTMLElement) {
        this.el = el;
        this.props = props;

        this.props.title.subscribe(() => {
            this.el.querySelector("span").innerHTML = this.props.title.value;
        });
    }

    render() {
        this.el.innerHTML = `
            <label>
                <input type="checkbox">
                <span>${this.props.title.value}</span>
            </label>
            <p></p>
            <button>Удалить</button>
        `;

        this.el.querySelector("button").addEventListener("click", () => {
            this.el.querySelector("p").innerHTML = "Button was clicked";
        });
    }
}
