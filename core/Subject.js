export class Subject {
    constructor(value) {
        this.value = value;
        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    current() {
        return this.value;
    }

    next(value) {
        this.value = value;
        this.subscribers.forEach((callback) => {
            callback(value);
        });
    }
}
