let globalId = 0;
const componentState = new Map();

export function render(component, props, parent) {
    const content = component(props);
    parent.innerHTML = content;
    globalId = 0;
}

export function useState(initialState) {
    return [initialState, () => {}];
}
