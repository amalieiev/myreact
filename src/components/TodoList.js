import { TodoItem } from "./TodoItem.js";

export class TodoList {
    constructor(props, el) {
        this.el = el;
        this.props = props;

        this.props.todos.subscribe(() => {
            this.renderTodos();
        });
    }

    render() {
        this.el.innerHTML = `
            <h2>Список Дел</h2>
            <input id="new-title">
            <button id="add">Добавить</button>
            <div id="todos"></div>
        `;

        this.renderTodos();

        this.el.querySelector("button#add").addEventListener("click", this.addTodo.bind(this));
        this.el.querySelector("input").addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                this.addTodo();
            }
        });
    }

    addTodo() {
        this.props.todos.next([
            ...this.props.todos.value,
            {
                id: Date.now(),
                title: this.el.querySelector("#new-title").value,
                active: true,
            },
        ]);
    }

    renderTodos() {
        this.el.querySelector("#todos").innerHTML = "";
        this.props.todos.value.forEach((todo) => {
            const todoItem = new TodoItem(todo);
            todoItem.render();
            this.el.querySelector("#todos").appendChild(todoItem.el);
        });
    }
}
