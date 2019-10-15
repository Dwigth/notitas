declare namespace salvattore {
    function appendElements(grid: HTMLElement, elements: Array<HTMLElement>): void;
    function prependElements(grid: HTMLElement, elements: Array<HTMLElement>): void;
    function registerGrid(grid: HTMLElement): void;
    function recreateColumns(grid: HTMLElement): void;
    function rescanMediaQueries(): void;
}
export = salvattore;