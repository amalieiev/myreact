let globalParent: HTMLElement;
let globalId: number = 0;
const callbacks = new Map<HTMLElement, void | (() => void)>();
const rollbacks = new Map<HTMLElement, void | (() => void)>();
const states = new Map<HTMLElement, Array<Subject<any>>>();

export type FC = (props: Record<string, any>) => string;

export type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
};

export class Subject<T> {
    public value: T;

    private callbacks: Array<() => void> = [];

    public constructor(initialValue: T) {
        this.value = initialValue;
    }

    public subscribe(callback: () => void): void {
        this.callbacks.push(callback);
    }

    public unsubscribe(callback: () => void): void {
        this.callbacks = this.callbacks.filter((item) => item !== callback);
    }

    public next(value: T): void {
        this.value = value;
        this.callbacks.forEach((callback) => {
            callback();
        });
    }
}

export function createSubject<T>(initialValue: T): Subject<T> {
    return new Subject<T>(initialValue);
}

export function render(component: FC, props: any, parent: HTMLElement): void {
    console.log(parent);

    const state = states.get(parent);
    const rollback = rollbacks.get(parent);

    states.set(parent, state ? state : []);

    globalParent = parent;

    if (rollback) {
        rollback();
    }

    const HTML = component(props);

    console.log(HTML);

    parent.innerHTML = HTML;

    const callback = callbacks.get(parent);

    if (callback) {
        rollbacks.set(parent, callback());
    }

    globalId = 0;
}

export function useSubject<T>(initialValue: T): Subject<T> {
    return ((id: number, parent: HTMLElement): Subject<T> => {
        const state: Array<Subject<T>> = states.get(parent) as Array<Subject<T>>;

        if (state[id] === undefined) {
            state[id] = createSubject<T>(initialValue);
        }

        globalId++;

        return state[id];
    })(globalId, globalParent);
}

export function useParent(): HTMLElement {
    return ((parent: HTMLElement): HTMLElement => {
        return parent;
    })(globalParent);
}

export function useRendered(callback: () => void | (() => void)): void {
    return ((parent: HTMLElement): void => {
        callbacks.set(parent, callback);
    })(globalParent);
}
