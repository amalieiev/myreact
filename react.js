let globalId = 0;
let globalParent;
const componentState = new Map();

export function render(component, props, parent) {
    const state = componentState.get(parent) || { cache: [] };

    componentState.set(parent, { ...state, component, props });

    globalParent = parent;
    const content = component(props);
    parent.innerHTML = content;
    globalId = 0;
}

export function useState(initialState) {
    const id = globalId;
    const parent = globalParent;

    return (() => {
        const { cache, component, props } = componentState.get(parent);

        if (cache[id] == null) {
            cache[id] = { value: initialState };
        }

        const setState = (state) => {
            cache[id].value = state;
            render(component, props, parent);
        };

        return [cache[id].value, setState];
    })();
}
