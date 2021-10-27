let globalParent;
let globalId = 0;
const callbacks = new Map();
const states = new Map();

export function render(component, props, parent) {
    const state = states.get(parent);
    states.set(parent, state ? state : []);

    globalParent = parent;

    const HTML = component(props);

    parent.innerHTML = HTML;

    const callback = callbacks.get(parent);

    if (callback) callback(parent);

    globalId = 0;
}

export function createSubject(initialValue) {
    return {
        value: initialValue,
        callbacks: [],
        subscribe(callback) {
            this.callbacks.push(callback);
        },
        next(value) {
            this.value = value;
            this.callbacks.forEach((callback) => callback(value));
        },
    };
}

export function useSubject(initialValue) {
    return ((id, parent) => {
        const state = states.get(parent);

        if (state[id] === undefined) {
            state[id] = createSubject(initialValue);
        }

        globalId++;

        return state[id];
    })(globalId, globalParent);
}

export function useRendered(callback) {
    return ((parent) => {
        callbacks.set(parent, callback);
    })(globalParent);
}
