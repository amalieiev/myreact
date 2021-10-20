import { Subject } from "./core/Subject.js";
import { TodoList } from "./components/TodoList.js";

const todoList = new TodoList(
    {
        todos: new Subject([
            { id: 1, title: "купить хлеб", active: true },
            { id: 2, title: "купить пиво", active: true },
        ]),
    },
    document.getElementById("root")
);

todoList.render();
