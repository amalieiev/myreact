export class TodoItem {
    constructor(props, el) {
        this.el = el || document.createElement("div");
        this.props = props;
    }

    render() {
        this.el.innerHTML = `
            <label>
                <input type="checkbox">
                ${this.props.title}
            </label>
            <button>Удалить</button>
        `;
    }
}
