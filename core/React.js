let globalId = 0;
let globalParent;
const componentState = new Map();

export function render(component, props, parent) {
    const state = componentState.get(parent);

    componentState.set(parent, {
        cache: state ? state.cache : [],
        component,
        props,
    });

    globalParent = parent;

    const HTML = component(props);

    parent.innerHTML = HTML;

    globalId = 0;
}

export function useState(initialValue) {
    return ((id, parent) => {
        const { cache } = componentState.get(parent);

        if (cache[id] === undefined) {
            cache[id] = {
                value: initialValue,
            };
        }

        const setState = (value) => {
            const { cache, component, props } = componentState.get(parent);

            cache[id].value = value;

            render(component, props, parent);
        };

        globalId++;

        return [cache[id].value, setState];
    })(globalId, globalParent);
}

export function useEffect(callback, dependencies) {
    return ((id, parent) => {
        const { component, cache, props } = componentState.get(parent);

        if (cache[id] === undefined) {
            cache[id] = {
                dependencies: dependencies,
            };
        }

        const dependenciesChanged =
            dependencies === undefined ||
            dependencies.some((dependency, index) => {
                return cache[id].dependencies[index] !== dependency;
            });

        if (dependenciesChanged) {
            callback();
            render(component, props, parent);
        }
    })(globalId, globalParent);
}
