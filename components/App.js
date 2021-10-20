import { useState } from "../react.js";

export default function ({ count }) {
    const [value, setValue] = useState(10);

    return `
        <h2>App Component</h2>
        <p>Count: ${count}</p>
        <p>Props: ${value}</p>
    `;
}

function User() {
    return `
        <p>User</p>
    `;
}
