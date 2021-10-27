let globalParent;
let globalId = 0;
const callbacks = new Map();
const rollbacks = new Map();
const states = new Map();

export function render(component, props, parent) {
    if (!parent) {
        console.log(globalParent);
        parent = globalParent;
    }

    const state = states.get(parent);
    const rollback = rollbacks.get(parent);

    states.set(parent, state ? state : []);

    globalParent = parent;

    if (rollback) {
        rollback();
    }

    const HTML = component(props);

    parent.innerHTML = HTML;

    const callback = callbacks.get(parent);

    if (callback) {
        const rollback = callback(parent);
        rollbacks.set(parent, rollback);
    }

    globalId = 0;
}

export function createSubject(initialValue) {
    return {
        value: initialValue,
        callbacks: [],
        subscribe(callback) {
            this.callbacks.push(callback);
        },
        unsubscribe(callback) {
            this.callbacks = this.callbacks.filter((item) => item !== callback);
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
