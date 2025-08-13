export const ROOT_STYLE = `
    .onoper-root {
        font-family: Arial, sans-serif;
        padding: 1rem;
    }

    .onoper-children {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem 3rem;
    }
`

export function RootComponent(children: string): string {
    return (`
        <div class='onoper-root'>
            <main class='onoper-children'>
                ${children}
            </main>
        </div>
    `);
}